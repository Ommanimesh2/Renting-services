import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNewAccessTokenMutation} from '../app/api/apiSlice';
var jwt_decode = require('jwt-decode');
function generateOTP() {
  // Generate a random 6-digit OTP
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (exclusive)
  const otp = Math.floor(Math.random() * (max - min) + min);
  return otp.toString(); // Convert the number to a string to ensure it's exactly 6 digits
}

async function getAccessUsingRefresh(refreshToken) {
  console.log(refreshToken);
  return fetch('https://ommanimesh.pythonanywhere.com/jwt/refresh/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshToken),
  }).then(res => res.json());
}

async function checkIfValidAcess(accessToken) {
  return fetch('https://ommanimesh.pythonanywhere.com/jwt/verify/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accessToken),
  }).then(res => res.json());
}

async function getVerifiedKeys(keys) {
  console.log('Loading keys from storage');

  if (keys) {
    console.log(keys);
    console.log('checking access');

    if (!isTokenExpired(keys?.access)) {
      const bool = checkIfValidAcess(keys.access);
      console.log('bool is', bool);
      if (bool) {
        console.log('you have access');
        return keys;
      } else {
        console.log('Access denied');
      }
    } else {
      console.log('access expired');

      console.log('checking refresh expiry');

      if (!isTokenExpired(keys.refresh)) {
        console.log('fetching access using refresh');

        const response = await getAccessUsingRefresh(keys);
        console.log(response);
        await AsyncStorage.setItem('keys', JSON.stringify(response));

        console.log('UPDATED ONE');

        return response;
      } else {
        console.log('refresh expired, please login');

        return null;
      }
    }
  } else {
    console.log('access not available please login');

    return null;
  }
}

function isTokenExpired(token) {
  var decoded = jwt_decode(token);

  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}

const setCredentials = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('successfully saved');
  } catch (e) {
    console.log(e);
  }
};

const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('user');
    let user = await JSON.parse(credentials);
    // let cred = await getVerifiedKeys(JSON.parse(credentials));
    if (user) {
      console.log(user);
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};
const userLoggedIn = async () => {
  const user = await getCredentials();
  return user;
};
export {setCredentials, getCredentials, userLoggedIn, generateOTP};
