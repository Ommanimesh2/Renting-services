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
      <View>
        <View style={styles.logo}>
          <Image source={logo} />
        </View>
        <Text style={styles.header}>
          Welcome farmers, renting farming machines is just a tap away!
        </Text>
        <View>
          <Pressable
            style={styles.mainBtn}
            onPress={() => navigation.navigate('login')}>
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
      </View>
    </ScreenWrapper>
  );
};

export default MainLogin;

const styles = StyleSheet.create({
  logo: {
    paddingHorizontal: 80,
    paddingTop: 130,
  },
  header: {
    paddingHorizontal: 60,
    textAlign: 'center',
    paddingTop: 30,
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 100,
  },
  mainBtn: {
    width: 328,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginHorizontal: 16,
    marginVertical: 15,
  },
});
