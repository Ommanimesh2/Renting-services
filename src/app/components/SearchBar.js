import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import strings from '../../helpers/LocalisedStrings';

const SearchBar = props => {
  // const [ searchText, setSearchText] = useState('');

  const handleSearch = text => {
    props.text2(text);
    console.log('Search:', props.text1);
  };

  const handleClearSearch = () => {
    props.text2('');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        margin: 15,
        paddingHorizontal: 15,
      }}>
      <TextInput
        style={{flex: 1, height: 40}}
        placeholder={strings.SEARCH}
        value={props.text1}
        onChangeText={text => props.text2(text)}
      />
      {props.text1 !== '' && (
        <TouchableOpacity onPress={handleClearSearch} style={{marginLeft: 10}}>
          <Text style={{fontSize: 24}}>X</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSearch} style={{marginLeft: 10}}>
        <Image
          style={{height: 25, width: 25}}
          source={require('../assets/Searchicon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
