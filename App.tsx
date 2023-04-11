import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { store } from './src/app/store'
import { Provider } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { getCredentials } from './src/helpers/credentials'
import Login from './src/features/Login'
import Signup from './src/features/Signup'
import AdminRoutes from './src/app/routes/AdminRoutes'
import UserRoutes from './src/app/routes/UserRoutes'
const App = () => {
  const Stack=createNativeStackNavigator()
  const [isAuth, setIsAuth]= useState(false)

  useEffect(()=>{
    setTimeout(async () => {
      
      const keys:any= await getCredentials()
      console.log(" thes are keys" ,keys)
      if(keys?.access==null){
        setIsAuth(false)
      } else{
        setIsAuth(true)
      }
    }, 1000);
  },[isAuth])
 
  return (
 <Provider store={store}>
   <NavigationContainer>
    
      <Stack.Navigator>
  
  {
    isAuth ? <>
        <Stack.Screen name="adminRoutes" component={AdminRoutes} options={{headerShown: false}}/>
        <Stack.Screen name="userRoutes" component={UserRoutes} options={{headerShown: false}}/>
              </>:<>
        
        <Stack.Screen name="signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
              </>
      }
      </Stack.Navigator>
   </NavigationContainer>
 </Provider>

  )
}

export default App

const styles = StyleSheet.create({})