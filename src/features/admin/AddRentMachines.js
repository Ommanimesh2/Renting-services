import { StyleSheet,TextInput,Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../app/components/ScreenWrapper'
import Header from '../../app/components/Header'


const AddRentMachines = () => {
  const [Name, setName] = useState(null)
  const [MachineDetails, setMachineDetails] = useState(null)
  const [Price, setPrice] = useState(null)
  const [Contact, setContact] = useState(null)

  
  return (
    <ScreenWrapper>
       <View style={styles.Addjobwrapper}>
        <Text style={styles.jobheader}>
          <Header text="Add Machine on Rent" />{" "}
        </Text>
        <View style={styles.bodynewjob}>
          <Text style={styles.newjobinputtext}>Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={Name}
            style={styles.newjobinputt}
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

            value={Price}
            style={styles.newjobinputt}
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
                onChangeText={(text)=>setMachineDetails(text)}
                value={MachineDetails}
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
                onChangeText={(text)=>setContact(text)}
                style={styles.newjobinput}
                value={Contact}
                underlineColorAndroid="transparent"
                placeholder="Price"
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholderFontSize="20"
                autoCapitalize="none"
              />
          </View>
        </View>
        <Pressable
          style={styles.addjobbutton}
          onPress={  () => {
          }}
        >
          <Text style={styles.addjobtext}>Add Machines</Text>
        </Pressable>
      </View>
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