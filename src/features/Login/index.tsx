import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {setLng, getLng} from '../../helpers/lang';
import React from 'react';
import {useRef, useState, useEffect} from 'react';
import {getCredentials, setCredentials} from '../../helpers/credentials';
import {useDispatch, useSelector} from 'react-redux';
import {useLoginMutation} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {RootState} from '../../app/store';
import strings from '../../helpers/LocalisedStrings';
const Login = ({navigation}: any) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailMsg, setemailMsg] = useState('');
  const [pwdMsg, setpwdMsg] = useState('');
  const [errMsg, seterrMsg] = useState('');
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLanguageChange = (lang: string) => {
    setLng(lang);
  };
  useEffect(() => {
    console.log(' language change');
  }, []);

  const CheckValidation = () => {
    // <= Added this function
    seterrMsg('');
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (!strongRegex.test(user) && user != '') {
      setemailMsg('invalid email');
      setCanSubmit(false);
    } else if (user == '') {
      setemailMsg('');
    } else if (pwd.length < 4 && pwd != '') {
      setpwdMsg('Password too short');
      setCanSubmit(false);
    } else if (pwd.length > 4 && strongRegex.test(user)) {
      setCanSubmit(true);
      setpwdMsg('');
      setemailMsg('');
    } else if (strongRegex.test(user) && pwd.length < 4) {
      setemailMsg('');
      setpwdMsg('Password too short');
      setCanSubmit(false);
    } else if (!strongRegex.test(user) && pwd.length > 4) {
      setpwdMsg('');
      setCanSubmit(false);

      setemailMsg('invalid email');
    } else {
      console.log('yaha');
      setCanSubmit(false);
    }
  };
  const checkEmail = user => {
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (!strongRegex.test(user)) {
      setemailMsg('invalid email');
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
      setemailMsg('');
    }
  };
  const checkPassword = password => {
    if (password.length < 8) {
      setpwdMsg('password too short');
      setCanSubmit(false);
    } else {
      setpwdMsg('');
    }
  };

  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
  };
  const [login, {isLoading, isError}] = useLoginMutation();
  useEffect(() => {
    selectedLng();
  });
  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    console.log('chala');
    setLoading(true);

    try {
      const userData: any = await login({email: user.trim(), password: pwd});
      console.log(userData);
      setLoading(false);
      if (userData.data?.user) {
        setCredentials(userData.data.user);
        setPwd('');
        setUser('');
        navigation.navigate('adminDroneRoutes');
      } else if (userData.data.message) {
        setPwd('');
        setUser('');
        seterrMsg('The email or password is incorrect');
      } else if (user === '' || pwd === '') {
        Alert.alert('Please enter credentials');
      }
    } catch (err) {
      Alert.alert('The email or password is incorrect');
    }
  };
  useEffect(() => {
    console.log(canSubmit);
  }, [canSubmit]);
  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.signheading}>{strings.LOGIN}</Text>
        <TextInput
          editable={!loading}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={strings.EMAIL}
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => {
            setUser(text);
            checkEmail(text);
          }}
          value={user}
        />
        {emailMsg != '' ? (
          <Text style={styles.error}>{emailMsg}</Text>
        ) : (
          <View></View>
        )}
        <TextInput
          editable={!loading}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={strings.PASSWORD}
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => {
            setPwd(text);
            checkPassword(text);
          }}
          value={pwd}
        />
        {pwdMsg != '' ? (
          <Text style={styles.error}>{pwdMsg}</Text>
        ) : (
          <View></View>
        )}

        <View>
          <Pressable
            style={styles.mainBtn}
            disabled={pwdMsg === '' && emailMsg === '' ? false : true}
            onPress={e => handleSubmit(e)}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                {strings.LOGIN}
              </Text>
            </View>
          </Pressable>
        </View>
        {loading && <ActivityIndicator />}
        {errMsg && <Text style={styles.errorMsg}>{errMsg}</Text>}
        <Text style={styles.last}>
          {strings.DONT_ACCOUNT}
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            Contact us at bhoomicam.iitr@gmail.com
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  signheading: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 107,
    marginBottom: 60,
  },
  input: {
    marginTop: 15,
    // marginTop:40,
    height: 50,
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },

  signbutton: {
    height: 56,
    margin: 15,
    backgroundColor: '#0F623D',
    borderRadius: 10,
    borderStyle: 'solid',
    //   borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  last: {
    marginTop: '4%',
    textAlign: 'center',
  },
  that: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  mainBtn: {
    width: 324,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginHorizontal: 16,
    marginTop: 65,
  },
  error: {
    color: 'red',
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    fontSize: 15,
    marginVertical: 10,
  },
});
