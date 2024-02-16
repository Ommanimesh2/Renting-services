import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Header from '../../../app/components/Header';
import {CheckBox} from 'react-native-elements';
import UploadScreen from '../../UploadScreen/UploadScreen';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import strings from '../../../helpers/LocalisedStrings';
import * as Progress from 'react-native-progress';
import {usePostRentDronesMutation} from '../../../app/api/apiSlice';

const AddRentDrone = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  // const [image, setImage] = useState(null);
  const [image, setImage] = useState({uri: '', type: ''});
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [name, setName] = useState('');
  const [droneDetails, setDroneDetails] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [newform, setNewForm] = useState(new FormData());
  const {currUser, loading} = useSelector(state => state.user);
  const parseUri = uri => {
    // Extract the file name from the URI
    const fileName = uri.split('/').pop();

    // Extract the file extension from the file name
    const fileExtension = fileName.split('.').pop();

    // Determine the type based on the file extension
    let fileType;
    switch (fileExtension.toLowerCase()) {
      case 'jpg':
        fileType = 'image/jpg';
      case 'jpeg':
        fileType = 'image/jpeg';
      case 'png':
        fileType = 'image/png';
      case 'gif':
        fileType = 'image/gif';
      case 'bmp':
        fileType = 'image/bmp';
      case 'tiff ':
        fileType = 'image/tiff ';
      case 'tif':
        fileType = 'image/tif';
      case 'webp':
        fileType = 'image/webp';
      case 'svg':
        fileType = 'image/svg';
        break;
      // Add more cases for other file types as needed
      default:
        fileType = 'Unknown';
    }

    // Return an object with the type and name
    return {
      type: fileType,
      name: fileName,
    };
  };

  const selectImage = async () => {
    const options = {
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const response = await ImagePicker.launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else if (response?.assets !== undefined && response?.assets !== null) {
        setImage({
          uri: response?.assets[0].uri,
          type: response?.assets[0].type,
        });
        console.log(response);
        Alert.alert('Photo uploaded!', 'The photo was uploaded successfully');
      } else {
        console.log('object error');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setUploading(false);
    }
  };
  console.log(new Date('2024-02-16').toISOString().split('T')[0]);
  const droneId = 4;
  const [postRentDrone] = usePostRentDronesMutation();
  const handleclick = async () => {
    try {
      const formData = new FormData();

      if (image?.uri !== '') {
        formData.append('rentimage', {
          uri: image.uri,
          type: parseUri(image.uri).type,
          name: parseUri(image.uri).name,
        });
      }

      formData.append('drone', '5');
      formData.append('Name', 'kfuyg');
      formData.append('DroneDetails', 'lpkou');
      formData.append('Price', 500);
      formData.append('UnitforPrice', 'Acre');
      formData.append('Contact', 6260718848);
      formData.append(
        'date',
        new Date('2024-02-16').toISOString().split('T')[0],
      );
      console.log(formData);

      const response = await postRentDrone(formData, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });

      console.log(response, 'dfg-error');

      if (response.error) {
        Alert.alert('Error');
      } else {
        Alert.alert('ORDER_SUCCESSFUL');
        // navigation.navigate('ViewRentDrones');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView>
      <View>
        <Header text="Add Drone" />
        <View
          style={{
            display: 'flex',
            width: '90%',
            height: 40,
            marginTop: 20,
            marginLeft: '5%',
            borderBottomWidth: 1,
            borderBottomColor: '#CFD8DC',
            // border solid ;
            padding: 8,
          }}>
          <Text
            style={{
              color: '#424242',
              paddingLeft: '0%',
              fontFamily: 'Roboto',
              fontSize: 17,
              fontWeight: 700,
            }}>
            Drone's Details
          </Text>
        </View>
        <View>
          <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
              <Text style={styles.buttonText}>{strings.PICK_AN_IMAGE}</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={300} />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '2%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Drone Name - Model
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Enter Drone's Name"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/tabler_file-description.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '2%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Drone Description
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Enter Drone's Description"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Time Slot
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Time Slots"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Shop Address
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              placeholder="Enter your official address"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Choose if providing chemicals
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        {isEnabled ? (
          <>
            <View style={styles.DetailsContainer}>
              <Image
                source={require('../assets/carbon_drone.png')}
                style={{height: 35, width: 35, margin: 10}}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '5%',
                }}>
                <Text
                  style={{
                    color: '#424242',
                    paddingLeft: '0%',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontWeight: 600,
                  }}>
                  Chemical Name
                </Text>
                <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter chemica Name"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.DetailsContainer}>
              <Image
                source={require('../assets/carbon_drone.png')}
                style={{height: 35, width: 35, margin: 10}}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '5%',
                }}>
                <Text
                  style={{
                    color: '#424242',
                    paddingLeft: '0%',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontWeight: 600,
                  }}>
                  Price of chemical /unit
                </Text>
                <TextInput
                  style={styles.newjobinput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter price of chemical"
                  placeholderTextColor="#B9B9B9"
                  placeholderFontSize="20"
                  autoCapitalize="none"
                />
              </View>
            </View>
            <Button title="Add Pesticide" />
          </>
        ) : (
          ''
        )}

        <View style={styles.DetailsContainer}>
          <Image
            source={require('../assets/carbon_drone.png')}
            style={{height: 35, width: 35, margin: 10}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5%',
            }}>
            <Text
              style={{
                color: '#424242',
                paddingLeft: '0%',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Price of Drone Spray/acre
            </Text>
            <TextInput
              style={styles.newjobinput}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder="Enter price"
              placeholderTextColor="#B9B9B9"
              placeholderFontSize="20"
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addjobbutton}
        onPress={() => {
          handleclick();
        }}>
        <Text style={styles.addjobtext}>Add Drones</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRentDrone;

const styles = StyleSheet.create({
  DetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
  },
  addjobbutton: {
    width: '90%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginLeft: '5%',
    marginTop: 65,
    marginBottom: 60,
  },
  addjobtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectButton: {
    width: 324,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginHorizontal: 16,
    marginTop: 30,
  },
  uploadButton: {
    width: 324,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
    marginHorizontal: 16,
    marginTop: 65,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
