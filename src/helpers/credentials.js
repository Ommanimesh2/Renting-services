import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNewAccessTokenMutation } from '../app/api/apiSlice'
var jwt_decode = require('jwt-decode')

async function getAccessUsingRefresh (refreshToken) {
  return fetch('http://127.0.0.1:8000/jwt/refresh/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(refreshToken)
  }).then(res => res.json())
}

async function checkIfValidAcess (accessToken) {
  return fetch('http://127.0.0.1:8000/jwt/verify/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accessToken)
  }).then(res =>res.json())
}

async function getVerifiedKeys (keys) {
  console.log('Loading keys from storage')

  if (keys) {
    console.log(keys)
    console.log('checking access')

    if (!isTokenExpired(keys?.access)) {
      const bool = checkIfValidAcess(keys.access)
      console.log('bool is', bool)
      if(bool){
        console.log("you have access")
        return keys
        
      }else{
        console.log("Access denied")
      }

    } else {
      console.log('access expired')

      console.log('checking refresh expiry')

      if (!isTokenExpired(keys.refresh)) {
        console.log('fetching access using refresh')

        const response = await getAccessUsingRefresh(keys)
        console.log(response)
        await AsyncStorage.setItem('keys', JSON.stringify(response))

        console.log('UPDATED ONE')

        return response
      } else {
        console.log('refresh expired, please login')

        return null
      }
    }
  } else {
    console.log('access not available please login')

    return null
  }
}

function isTokenExpired (token) {
  var decoded = jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}

const setCredentials = async keys => {
  try {
    await AsyncStorage.setItem('keys', JSON.stringify(keys))
    console.log("successfully saved")
  } catch (e) {
    console.log(e)
  }
}

const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys')

    let cred = await getVerifiedKeys(JSON.parse(credentials))

    if (credentials != null && cred != null) {
      console.log("yehi hai")
      console.log(cred)
      return cred
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
  }
}

export {setCredentials, getCredentials}