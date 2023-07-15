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

import {setURLimage} from '../admin/Slices/imageSlice';
import * as Progress from 'react-native-progress';
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
        {image !== null ? (
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}
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
    borderRadius: 10,
    width: 310,
    height: 56,
    backgroundColor: '#00AC00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 200,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
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
