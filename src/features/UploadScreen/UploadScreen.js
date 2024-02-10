import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {useDispatch} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import strings from '../../helpers/LocalisedStrings';

import * as Progress from 'react-native-progress';
import {setURLimage} from '../admin/Slices/imageSlice';
export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const {currUser, loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(currUser, 'From the upload thibng');
  }, [currUser]);
  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const response = await ImagePicker.launchImageLibrary(options);
      console.log(response.assets[0].uri);
      console.log('yeh');
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        8;
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source);
        setImage(source);
        const {uri} = source;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        try {
          const ref = storage().ref(filename);
          await ref.putFile(uploadUri);
          const downloadUrl = await ref.getDownloadURL();
          console.log(downloadUrl);
          dispatch(setURLimage(downloadUrl));
        } catch (error) {
          console.log(error);
        }

        // set progress state

        setUploading(false);
        Alert.alert('Photo uploaded!', 'The photo was uploaded successfully');
        setImage(null);
      }
    } catch (error) {}
  };
  return (
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
  );
}

const styles = StyleSheet.create({
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
