import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {useEffect} from 'react';
import Header from '../../app/components/Header';
import {useGetMaintainersByAdminIdQuery} from '../../app/api/apiSlice';
import {useDispatch, useSelector} from 'react-redux';
import OperatorComponent from './components/OperatorComponent';
import ScreenWrapper from '../../app/components/ScreenWrapper';
const Maintainers = ({navigation}) => {
  const {currUser, loading} = useSelector(state => state.user);
  const {
    data: maintainers,
    isSuccess,
    isLoading,
    isError,
  } = useGetMaintainersByAdminIdQuery(currUser?.id);
  console.log(maintainers);
  return (
    <View>
      <Header text="Your Maintainers" />

      {isSuccess && maintainers?.length >= 1 ? (
        <>
          <ScrollView>
            {maintainers?.map(maintainer => {
              return <OperatorComponent operator={maintainer} />;
            })}
          </ScrollView>
          <View style={styles.HomeDronesContainer}>
            <Pressable
              style={styles.AddButton}
              onPress={() => {
                navigation.navigate('AddMaintainer');
              }}>
              <Text style={styles.buttontxt}>Add Maintainers</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View>
          <Image source={require('./assets/bxs_user-x.png')} />
          <Text style={styles.hometxt}>No Maintainers to show</Text>
        </View>
      )}
    </View>
  );
};

export default Maintainers;

const styles = StyleSheet.create({
  HomeDronesContainer: {},
  AddButton: {
    width: '100%',
    textAlign: 'center',
    borderRadius: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0F623D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 98, 61, 0.04)',
    color: '#0F623D',
    padding: 12,
  },
  buttontxt: {
    color: '#0F623D',
    textAlign: 'center',
    background: 'rgba(15, 98, 61, 0.04)',
    fontSize: 17,
    width: '60%',
    fontWeight: 600,
  },
  hometxt: {
    marginTop: 10,
    color: '#2E2E2E',
    fontFamily: 'Quicksand',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 19 /* 95% */,
  },
});
