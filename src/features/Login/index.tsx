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
import {setCurrUser} from '../admin/Slices/userSlice';
import {useLoginMutation} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {RootState} from '../../app/store';
import strings from '../../helpers/LocalisedStrings';
const Login = ({navigation}: any) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailMsg, setemailMsg] = useState('');
  const [pwdMsg, setpwdMsg] = useState('');
  const dispatch = useDispatch();
  const {currUser, loading} = useSelector((state: RootState) => state.user);
  const handleLanguageChange = (lang: string) => {
    setLng(lang);
  };

  const CheckValidation = () => {
    // <= Added this function
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    if (!strongRegex.test(user) && user != '') {
      setemailMsg('invalid email');
      return false;
    } else if (pwd.length < 8 && pwd != '') {
      setpwdMsg('Password too short');
      return false;
    }
  };
  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
  };
  const [login, {isLoading}] = useLoginMutation();
  useEffect(() => {}, [user, pwd]);
  useEffect(() => {
    selectedLng();
  });
  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    try {
      const userData: any = await login({email: user, password: pwd});
      console.log(userData);
      dispatch(setCurrUser(userData.data.user));
      setCredentials(userData.data.user);

      setPwd('');
      setUser('');
      if (user === '' || pwd === '') {
        Alert.alert('Please enter credentials');
      } else {
        navigation.navigate('adminRoutes');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.signheading}>Login</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="email"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          onChangeText={text => {
            setUser(text);
          }}
          value={user}
        />
        {emailMsg ? (
          <Text style={styles.error}>{emailMsg}</Text>
        ) : (
          <View></View>
        )}

        {/* <View>
          <Text>Select the language</Text>
          <Button title="hindi" onPress={() => handleLanguageChange('hi')} />
          <Button title="English" onPress={() => handleLanguageChange('en')} />
        </View> */}
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="password"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => {
            setPwd(text);
          }}
          value={pwd}
        />
        {pwdMsg ? <Text style={styles.error}>{pwdMsg}</Text> : <View></View>}

        <View>
          <Pressable
            style={styles.mainBtn}
            onPress={() => {
              if (CheckValidation()) {
                handleSubmit(e);
              } else {
                Alert.alert('Please check credentials again');
              }
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                Login
              </Text>
            </View>
          </Pressable>
        </View>
        <Text style={styles.last}>
          dont have an account?
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('signup')}>
            Create One
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
    backgroundColor: '#00AC00',
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
    width: 328,
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
});
