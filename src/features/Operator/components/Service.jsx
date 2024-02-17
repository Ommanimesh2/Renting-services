import React from "react"
import {StyleSheet, Text, View} from 'react-native';


const Service= () => {

return(
<View>
    <View style={{ alignItems:"center",marginTop:'15%'}}>
<Text style={{fontSize:18,color:'#2E2E2E',fontWeight:'bold',fontFamily:'Quicksand'} }>Service is Completed</Text>
<Text style={{color:'#0F623D',fontWeight:'semibold',fontFamily:'Quicksand',fontSize:13}}>Verify the process.</Text>
    </View>
<View style={{display:'flex',flexDirection:"row",justifyContent:'space-around',paddingTop:20,width:'95%',marginLeft:'2.5%'}}>
<View>
    <Text style={{color:'#2E2E2E',fontWeight:'bold',fontSize:16}}>Time Elapsed</Text>
    <Text style={{color:'#0F623D',fontWeight:'bold',fontSize:18}}>32.50 mins</Text>
</View>
<View style={{borderWidth:0.2,borderColor:'#000000'}}></View>
<View >
    <Text style={{color:'#2E2E2E',fontWeight:'bold',fontSize:16}}>Status</Text>
    <Text style={{color:'#0F623D',fontWeight:'semibold',fontFamily:'Quicksand',fontSize:13}}>Successfull</Text>
</View>
<View style={{borderWidth:0.2,borderColor:'#000000'}}></View>

<View >
    <Text style={{color:'#2E2E2E',fontWeight:'bold',fontSize:16}}>Price in Rs</Text>
    <Text style={{color:'#0F623D',fontWeight:'semibold',fontFamily:'Quicksand',fontSize:13}}>5800/-</Text>
</View>
</View>
</View>
);
};

export default Service