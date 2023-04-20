import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import{ useRef, useState, useEffect} from 'react'
import { getCredentials, setCredentials } from '../../helpers/credentials'
import { useDispatch } from 'react-redux'

import { useLoginMutation } from '../../app/api/apiSlice'
const Login = ({navigation}: any) => {

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')


    const [login, { isLoading }] = useLoginMutation()
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        try {
            const userData: any = await login({ email:user, password:pwd })
            console.log(userData)
            setCredentials(userData.data.tokens)
        } catch (err) {
            console.log(err)
  
        }
    }

  return (
    <View>
    <Text style={styles.signheading}>Login</Text>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="username"
      placeholderTextColor="rgba(0, 0, 0, 0.7)"
      autoCapitalize="none"
      onChangeText={text => setUser(text)}
      value={user}
    />

    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="password"
      placeholderTextColor="rgba(0, 0, 0, 0.7)"

      autoCapitalize="none"
      onChangeText={text => setPwd(text)}

      value={pwd}
    />
    <Pressable onPress={()=>console.log(getCredentials())}>
      <Text>THis to get creds</Text>
    </Pressable>
    <View>
      <Pressable
        style={styles.signbutton}
        onPress={(e) => {
            handleSubmit(e)
            navigation.navigate("adminRoutes")
        }}
      >
        <Text >Login</Text>
      </Pressable>
    </View>
    <Text style={styles.last}>
      dont have an account?
      <Text onPress={()=>navigation.navigate("signup")}>Create One</Text>
    </Text>
  </View>
  
  )
}

export default Login


const styles = StyleSheet.create({
    signheading: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: 32,
      textAlign: "center",
      alignContent: "center",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: 167,
      marginBottom: 40,
    },
    input: {
      margin: 15,
      // marginTop:40,
      height: 66,
      borderColor: "#7a42f4",
      borderWidth: 1,
      backgroundColor: "#FFFFFF",

      borderRadius: 10,
      padding: 15,
    },
  
    signbutton: {
      height: 56,
      margin: 15,
      backgroundColor: "#00AC00",
      borderRadius: 10,
      borderStyle: "solid",
      //   borderWidth:2,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 2,
    },
    last: {
      marginTop: "4%",
      textAlign: "center",
    },
    that:{
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  });
  