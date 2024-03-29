import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import ScreenWrapper from '../../app/components/ScreenWrapper';
import {ScrollView} from 'react-native';
import strings from '../../helpers/LocalisedStrings';
import Header from '../../app/components/Header';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import {
  usePostRentMachinesMutation,
  useGetAdminKvkQuery,
} from '../../app/api/apiSlice';
import UploadScreen from '../UploadScreen/UploadScreen';
import {useSelector} from 'react-redux';
import {getCredentials, userLoggedIn} from '../../helpers/credentials';
const AddRentMachines = ({navigation}) => {
  var launchImageLibrary = require('react-native-image-picker');
  const {currUser, loading} = useSelector(state => state.user);
  const {image} = useSelector(state => state.image);
  const [name, setName] = useState('');
  const [machineDetails, setMachineDetails] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [RentMachine, {isLoading}] = usePostRentMachinesMutation();
  const [rentimage, setRentImage] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [bookedstatus, setBookedStatus] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([]);

  const {data, isSuccess, error} = useGetAdminKvkQuery(loggedInUser?.id, {
    enabled: !!loggedInUser,
  });
  let content = <Text>fetching Kvk name..</Text>;
  if (isSuccess) {
    content = <Text>{data[0]?.Name_KVK}</Text>;
  }

  console.log(data);
  useEffect(() => {
    const giveUser = async () => {
      try {
        const use = await getCredentials();
        setLoggedInUser(use);
        console.log(use);
      } catch (error) {}
    };
    giveUser();
  }, []);

  // console.log(giveUser(), 'giveUser');
  const options = {
    title: 'pick an image',
    customButton: [{name: 'prakhar', title: 'choose photo'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pickImage = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log(response.assets);
      },
    );
  };

  const handleClick = async (
    name,
    machineDetails,
    price,
    date,
    contact,
    bookedstatus,
    rentimage,
  ) => {
    try {
      const newDate = new Date(rentimage);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      console.log(formattedDate);
      console.log('Name:', name);
      console.log('Price:', price);
      console.log('MachineDetails:', machineDetails);
      console.log('Contact:', contact);
      console.log('BookedStatus:', bookedstatus);
      console.log('Date:', formattedDate);
      console.log('imageurl:', image);

      const resp = await RentMachine({
        Name: name,
        MachineDetails: date,
        BookedStatus: contact,
        Price: price,
        Contact: machineDetails,
        rentimage: image,
        date: formattedDate,
        KVK: data[0]?.id,
      });

      console.log(resp);
      Alert.alert('Machine Uploaded', 'Machine added successfully');
      setContact('');
      setPrice('');
      setMachineDetails('');
      setBookedStatus('');
      setName('');
      navigation.navigate('ViewRentMachines');
    } catch (error) {
      console.log('Error:', error);
      if (error.response && error.response.data) {
        console.log('Data:', error.response.data);
      }
    }
  };

  return (
    <>
      <Header text="Add Machine on rent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenWrapper>
          <View style={styles.Addjobwrapper}>
            <View style={styles.bodynewjob}>
            <Text >Your KVK Name:</Text>
              {content}

              <Text style={styles.newjobinputtext}>{strings.NAME}</Text>
              <TextInput
                onChangeText={text => setName(text)}
                value={name}
                style={styles.newjobinput}
                underlineColorAndroid="transparent"
                placeholder={strings.NAME}
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholderFontSize="20"
                autoCapitalize="none"
              />

              <Text style={styles.newjobinputtext}>{strings.PRICE}</Text>
              <TextInput
                onChangeText={text => setPrice(text)}
                value={price}
                style={styles.newjobinput}
                underlineColorAndroid="transparent"
                placeholder={strings.PRICE}
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholderFontSize="20"
                autoCapitalize="none"
              />
              <View style={styles.flexcolumn}>
                <Text style={styles.newjobinputtext}>
                  {strings.MACHINE_DETAILS}
                </Text>
                <TextInput
                  onChangeText={text => setMachineDetails(text)}
                  value={machineDetails}
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder={strings.MACHINE_DETAILS}
                  placeholderTextColor="rgba(0, 0, 0, 0.7)"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.flexcolumn}>
                <Text style={styles.newjobinputtext}>
                  {strings.PHONE_NUMBER}
                </Text>
                <TextInput
                  onChangeText={val => setContact(val)}
                  style={styles.newjobinput}
                  value={contact}
                  underlineColorAndroid="transparent"
                  placeholder="Contact"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(0, 0, 0, 0.7)"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
              </View>
              <Text style={{marginTop:20,}}>{strings.BOOKED_STATUS}</Text>
              <Picker
                selectedValue={bookedstatus}
                style={{height: 50, width: 150}}
                onValueChange={itemValue => setBookedStatus(itemValue)}>
                <Picker.Item label="True" value="True" />
                <Picker.Item label="False" value="False" />
              </Picker>
            </View>
            <Text style={styles.newjobinputtext}>{strings.CHOOSE_DATE}</Text>
            <TouchableOpacity
              style={styles.addjobbutton}
              onPress={() => setOpen(true)}>
              <Text style={styles.buttonText}>{strings.CHOOSE_DATE}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onDateChange={setDate}
              onConfirm={date => {
                setDate(date);
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <Text style={styles.newjobinputtext}>{strings.PICK_AN_IMAGE}</Text>
            <UploadScreen />
            <TouchableOpacity
              style={styles.addjobbutton}
              onPress={() => {
                name.length>2 && machineDetails.length>2   ?

                handleClick(
                  name,
                  contact,
                  price,
                  machineDetails,
                  bookedstatus,
                  rentimage,
                  date,
                )
                :
                Alert.alert("Error Uploading Machine")
              }}>
              <Text style={styles.addjobtext}>{strings.ADD_MACHINES}</Text>
            </TouchableOpacity>
          </View>
        </ScreenWrapper>
      </ScrollView>
    </>
  );
};

export default AddRentMachines;

const styles = StyleSheet.create({
  Addjobwrapper: {
    marginTop: 70,
  },
  newjobinput: {
    marginTop: 15,
    // marginTop:40,
    height: 50,
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  flexcolumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    borderRadius: 5,
    width: 350,
    height: 50,
    marginVertical: 15,
    backgroundColor: '#0F623D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobheader: {
    marginLeft: -50,
  },
  newjobinputt: {
    // marginLeft: 16,
    height: 56,
    width: 120,
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D8DADC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  bodynewjob: {
    marginTop: -50,
  },
  newjobinputtext: {
    marginVertical: 10,
    display: 'none',
  },
  flexinputs: {
    display: 'flex',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 40,
    marginBottom: 40,
  },
  addjobbutton: {
    width: "90%",
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginLeft: "5%",
    marginTop: 65,
  },
  addjobtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
  },
});
