import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import logo from '../../app/assets/logo.png';
const MainLogin = ({navigation}) => {
  return (
    <ScreenWrapper>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.header}>
          Welcome farmers, renting farming machines is just a tap away!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 60,
            fontSize: 30,
            color: 'green',
          }}>
          ADMIN
        </Text>
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.mainBtn}
            onPress={() => navigation.navigate('login', {admin: 'kvk'})}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                Login as KVK Admin
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.mainBtn}
            onPress={() => navigation.navigate('login', {admin: 'drone'})}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                Login as Drone Admin
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.mainBtn}
            onPress={() => navigation.navigate('login', {admin: 'operator'})}>
            <View>
              <Text
                style={{
                  color: 'white',
                }}>
                Login as Drone Operator
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default MainLogin;

const styles = StyleSheet.create({
  logo: {
    paddingTop: 130,
  },
  header: {
    paddingHorizontal: 60,
    textAlign: 'center',
    paddingTop: 30,
    fontWeight: 600,
    fontSize: 14,
  },
  mainBtn: {
    width: 328,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 18,
    justifyContent: 'center',
  },
});
