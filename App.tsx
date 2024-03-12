import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { getCredentials } from './src/helpers/credentials';
import Login from './src/features/Login';
import Signup from './src/features/Signup';
import AdminRoutes from './src/app/routes/AdminRoutes';
import UniqueProductScreen from './src/features/admin/UniqueProductScreen';
import UniqueOrder from './src/features/admin/UniqueOrder';
import MainLogin from './src/features/MainLogin';
import OTPInputPage from './src/features/OTP';
import PhoneNumberInput from './src/features/OTP/PhoneNumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UniqueQuery from './src/features/admin/UniqueQuery';
// import DroneRoutesAdmin from './src/app/routes/DroneRoutesAdmin';
import DroneRoutesAdmin from './src/app/routes/DroneRoutesAdmin';
import AddRentDrone from './src/features/DroneAdmin/components/AddRentDrone';
import AddMaintainer from './src/features/DroneAdmin/components/AddMaintainer';
import OperatorRoutes from './src/app/routes/OperatorRoutes';
import ServiceStart from './src/features/Operator/ServiceStart';
import TimeCount from './src/features/Operator/TimeCount';
import ServiceComplete from './src/features/Operator/ServiceComplete';
import DroneScreen from './src/features/DroneAdmin/DroneScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  const [isAuth, setIsAuth] = useState(false);
  const [userKeys, setUserKeys] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      const keys: any = await getCredentials();
      console.log('thes are keys', keys);
      setUserKeys(keys);
      if (!keys) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    }, 1000);
  }, [isAuth]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuth ? (
            <>
              {userKeys?.isDroneAdmin && (
                <Stack.Screen
                  name="adminDroneRoutes"
                  component={DroneRoutesAdmin}
                  options={{ headerShown: false }}
                />
              )}

              {userKeys?.isKVKAdmin && (
                <Stack.Screen
                  name="adminRoutes"
                  component={AdminRoutes}
                  options={{ headerShown: false }}
                />
              )}

              {userKeys?.isOperator && (
                <Stack.Screen
                  name="operatorRoutes"
                  component={OperatorRoutes}
                  options={{ headerShown: false }}
                />
              )}
              <Stack.Screen
                name="uniqueDrone"
                component={DroneScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueMachine"
                initialParams={{ itemId: 21 }}
                component={UniqueProductScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddDrones"
                component={AddRentDrone}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddMaintainer"
                component={AddMaintainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="serviceStart"
                component={ServiceStart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="otp"
                component={OTPInputPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="timeCount"
                component={TimeCount}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="serviceComplete"
                component={ServiceComplete}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="phone"
                component={PhoneNumberInput}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueOrder"
                initialParams={{ orderId: 21 }}
                component={UniqueOrder}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueQuery"
                initialParams={{ user_id: 21 }}
                component={UniqueQuery}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
             <Stack.Screen
                name="operatorRoutes"
                component={OperatorRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MainLogin"
                component={MainLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="otp"
                component={OTPInputPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="phone"
                component={PhoneNumberInput}
                options={{ headerShown: false }}
              />
             
              <Stack.Screen
                name="uniqueDrone"
                component={DroneScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="serviceStart"
                component={ServiceStart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="timeCount"
                component={TimeCount}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="serviceComplete"
                component={ServiceComplete}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddDrones"
                component={AddRentDrone}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="adminDroneRoutes"
                component={DroneRoutesAdmin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddMaintainer"
                component={AddMaintainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="adminRoutes"
                component={AdminRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueMachine"
                initialParams={{ itemId: 21 }}
                component={UniqueProductScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueOrder"
                initialParams={{ orderId: 21 }}
                component={UniqueOrder}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="uniqueQuery"
                initialParams={{ user_id: 21 }}
                component={UniqueQuery}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
