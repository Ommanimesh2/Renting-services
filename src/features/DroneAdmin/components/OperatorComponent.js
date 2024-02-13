import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

import React from 'react';
import {useState} from 'react';
const OperatorComponent = ({operator}) => {
  console.log(operator, 'sadf');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    // Implement your delete logic here
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text1}>{operator.Name_Maintainer}</Text>
        <View style={{display: 'flex', flexDirection: 'row', columnGap: 15}}>
          <View style={styles.controls}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleDelete}>
                  <Text style={styles.modalOptionText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalOptionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            {operator.OrderIdsAssigned == null ? (
              <Text style={styles.textOrder}>0 orders</Text>
            ) : (
              <Text style={styles.textOrder}>
                {operator.OrderIdsAssigned?.length} orders
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{display: 'flex', justifyContent: 'center'}}
            onPress={() => setModalVisible(true)}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.text2}>{operator.Email_Maintainer}</Text>
        <Text style={styles.text2}>{operator.Contact_Maintainer}</Text>
      </View>
    </View>
  );
};

export default OperatorComponent;

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    marginVertical: '1%',
    borderBottomWidth: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: 14,
    fontWeight: 500,
  },
  text1: {
    fontSize: 14,
    fontWeight: 700,
  },
  controls: {
    backgroundColor: '#D2F1C7',
    borderColor: '#0F623D',
    borderWidth: 1,
    borderRadius: 31,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  textOrder: {
    color: '#0F623D',
    textAlignVertical: 'center',
    fontFamily: 'Quicksand',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  ellipsis: {
    fontSize: 24,
    color: '#000', // Adjust the color as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOption: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#333',
  },
  dot: {
    width: 1,
    height: 4,
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#000', // Adjust the color as needed
    borderRadius: 10,
  },
});
