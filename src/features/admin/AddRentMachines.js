import { StyleSheet,TextInput,Pressable, Text, View,Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import ScreenWrapper from '../../app/components/ScreenWrapper'
import { ScrollView } from 'react-native'
import Header from '../../app/components/Header'
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import * as ImagePicker from 'react-native-image-picker';
import { usePostRentMachinesMutation } from '../../app/api/apiSlice';

const AddRentMachines = () => {
  var launchImageLibrary = require('react-native-image-picker');
  const [name, setName] = useState("")
  const [machineDetails, setMachineDetails] = useState("")
  const [price, setPrice] = useState("")
  const [contact, setContact] = useState("")
  const [RentMachine, {isLoading}] = usePostRentMachinesMutation();
  const[rentimage,setRentImage] = useState("")
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
const [bookedstatus , setBookedStatus] = useState(false)
const options = {
  title: 'pick an image',
  customButton:[{name:'prakhar', title:'choose photo'}],
storageOptions: {
  skipBackup: true,
  path: "images",
}

}
const pickImage=()=>{
 ImagePicker.launchCamera({
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
  },
  (response) => {
    console.log(response.assets);
  },
)
}

const handleClick = async (name, machineDetails , price ,date, contact , bookedstatus,rentimage ) => {
  try {
    const newDate=new Date(rentimage)
    const year = newDate.getFullYear();
const month = newDate.getMonth() + 1; 
const day = newDate.getDate();
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
console.log(formattedDate); 
    console.log('Name:', name);
    console.log('Price:', price);
    console.log('MachineDetails:', machineDetails);
    console.log('Contact:', contact);
    console.log('BookedStatus:', bookedstatus);
    console.log('Date:', formattedDate); 

    const resp = await RentMachine({
      Name: name,
      MachineDetails: date,
      BookedStatus: contact,
      Price: price,
      Contact: machineDetails,
      rentimage: bookedstatus,
      date: formattedDate,
    });

    console.log(resp);
    setContact('')
    setPrice('')
    setMachineDetails('')
    setBookedStatus('')
    setName('')
  } catch (error) {
    console.log('Error:', error);
    if (error.response && error.response.data) {
      console.log('Data:', error.response.data);
    }
  }
};

  return (
    <ScreenWrapper>
       <ScrollView showsVerticalScrollIndicator={false} >

       <View style={styles.Addjobwrapper}>
        <Text style={styles.jobheader}>
          <Header text="Add Machine on Rent" />{" "}
        </Text>
        <View style={styles.bodynewjob}>
          <Text style={styles.newjobinputtext}>Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Name of owner"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            placeholderFontSize="20"
            autoCapitalize="none"
          />
          
          <Text style={styles.newjobinputtext}>
          Price
          </Text>
          <TextInput
            onChangeText={text => setPrice(text)}
            value={price}
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            placeholderFontSize="20"
            autoCapitalize="none"
          />
          <Text style={styles.newjobinputtext}>Location</Text>
          <TextInput
            editable={false}
            style={styles.newjobinput}
            underlineColorAndroid="transparent"
            placeholder="Location"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            placeholderFontSize="20"
            autoCapitalize="none"
          />
            <View style={styles.flexcolumn}>
              <Text style={styles.newjobinputtext}>Machine Details</Text>
              <TextInput
                onChangeText={text=>setMachineDetails(text)}
                value={machineDetails}
                style={styles.newjobinput}
                underlineColorAndroid="transparent"
                placeholder="Add Details"
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholderFontSize="20"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.flexcolumn}>
              <Text style={styles.newjobinputtext}>Phone Number</Text>
              <TextInput
                onChangeText={val=>setContact(val)}
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
          <Text style={styles.newjobinputtext}>Booked Status</Text>
          <Picker
  selectedValue={bookedstatus}
  style={{ height: 50, width: 150 }}
  onValueChange={(itemValue) => setBookedStatus(itemValue)}>
  <Picker.Item label="True" value="True" />
  <Picker.Item label="False" value="False" />
</Picker>
        </View>
        <Text style={styles.newjobinputtext}>Choose Date</Text>
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
        modal
        mode='date'
         open={open}
        date={date}
        onDateChange={setDate}
        onConfirm={ (date)=> {
          setDate(date)
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
               <Pressable 
          style={styles.addjobbutton}
          onPress= {pickImage}
        
        >
              <Text style={styles.addjobtext}>Add photo</Text>
        </Pressable>
        <Pressable
          style={styles.addjobbutton}
          onPress={() => {
            handleClick(name, contact , price, machineDetails, bookedstatus, rentimage,date);
          }}
        >
          <Text style={styles.addjobtext}>Add Machines</Text>
        </Pressable>
       
      </View>
       </ScrollView>
    </ScreenWrapper>
  )
}

export default AddRentMachines

const styles = StyleSheet.create({
  newjobinput:{
  marginLeft: 16,
  // marginTop:40,
  height: 56,
  borderColor: '#7a42f4',
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
borderColor: '#D8DADC',
borderRadius: 10,
padding:15,
marginBottom:10,
},
flexcolumn:{
display:'flex',
flexDirection:'column',
},
jobheader:{
marginLeft:-50,
},
newjobinputt:{
  // marginLeft: 16,
  height: 56,
  width:120,
  borderColor: '#7a42f4',
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
borderColor: '#D8DADC',
borderRadius: 10,
padding:15,
marginBottom:10,
},
bodynewjob:{
marginTop:-50,
},
newjobinputtext:{
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 500,
  margin:15,
  marginBottom:5,   
},
flexinputs:{
  display: 'flex',
  flexDirection:'row',
height:'10%',
justifyContent:'space-between',
marginLeft:10,
marginRight:40,
marginBottom:40,
},
addjobbutton:{
  height:56,
margin:15,  
marginTop:20,
  backgroundColor: '#00AC00',
borderRadius: 10,
borderStyle:'solid',
justifyContent: 'center',
alignItems: 'center',
marginBottom:2,
},
addjobtext:{
  color: '#FFFFFF',
  fontSize:16,
  fontWeight:600,
}

})
