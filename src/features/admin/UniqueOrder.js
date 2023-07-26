import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import strings from '../../helpers/LocalisedStrings';
import React from 'react';
import useEffect from 'react';
import {
  useGetRentMachineQuery,
  useDeleteRentMachineMutation,
  useGetOrderUserQuery,
  useGetFourImagesByOrderIdQuery,
} from '../../app/api/apiSlice';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import Loading from './Loading';
import {Button} from '@react-native-material/core';
import Header from '../../app/components/Header';
const UniqueOrder = ({route, navigation}) => {
  const {orderId, placed_at, payement_status, payement_mode} = route.params;
  console.log(orderId);
  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useGetOrderUserQuery(orderId);

  const {data: imageData} = useGetFourImagesByOrderIdQuery(orderId);

  let content, db;
  if (isSuccess) {
    content = user;
    console.log('images data is');
    console.log(imageData);
  } else if (error) {
    console.log(error);
    Alert.alert('check your network connection');
  } else if (isLoading) {
    content = <Loading />;
  }
  return (
    <>
      <Header text={`${strings.ORDER_ID} : ${orderId}`} />
      <ScreenWrapper>
        <ScrollView>
          {!isLoading ? (
            <View>
              <View style={styles.container}>
                <Text style={styles.head}>
                  {' '}
                  {strings.ORDER_ID} : {orderId}
                </Text>
                <Text style={styles.title}>{strings.ORDERED_BY}</Text>
                <Text style={styles.input}>{content?.username}</Text>
                <Text style={styles.title}>{strings.PHONE_NUMBER}</Text>
                <Text style={styles.input}>{content?.phone_no}</Text>
                <Text style={styles.title}>{strings.EMAIL}</Text>
                <Text style={styles.input}>{content?.email}</Text>
                <Text style={styles.title}>{strings.ADDRESS}</Text>
                <Text style={styles.input}>{content?.address}</Text>
                <Text style={styles.title}>{strings.PLACED_AT}</Text>
                <Text style={styles.input}>{placed_at}</Text>
                <Text style={styles.title}>{strings.PAYMENT_STATUS}</Text>
                <Text style={styles.input}>{payement_status}</Text>
                <Text style={styles.title}>{strings.PAYMENT_MODE}</Text>
                <Text style={styles.input}>{payement_mode}</Text>
              </View>

              <View>
                {imageData?.length != 0 ? (
                  <View>
                    <Text style={styles.imageText}>
                      The images have been uploaded
                    </Text>
                    {imageData[0]?.first_img && (
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{uri: imageData[0]?.first_img}}
                          style={styles.image}
                        />
                        <Image
                          source={{uri: imageData[0]?.second_img}}
                          style={styles.image}
                        />
                        <Image
                          source={{uri: imageData[0]?.third_img}}
                          style={styles.image}
                        />
                        <Image
                          source={{uri: imageData[0]?.fourth_img}}
                          style={styles.image}
                        />
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    <Text style={styles.imageText}>
                      Images have not yet been added for this order
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <Loading />
          )}
        </ScrollView>
      </ScreenWrapper>
    </>
  );
};

export default UniqueOrder;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  head: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 800,
  },
  imageText: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 15,
  },
  image: {
    height: 300,
    width: 300,
    marginVertical: 15,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginVertical: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
});
