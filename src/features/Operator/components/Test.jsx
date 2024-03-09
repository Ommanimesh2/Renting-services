import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" type="material" />
        <Text style={styles.headerText}>Back to drone orders</Text>
        <Icon name="edit" type="material" />
        <Text style={styles.headerText}>Edit Order</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order Id: BHC12345</Text>
        <Text style={styles.title}>Spray Drone</Text>
        {/* ... other order details */}
      </View>

      {/* ... other UI elements */}

      <Button title="Start Flying Drone" buttonStyle={styles.button} />

      {/* ... Timer and Stop Order button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
  },
  
   // Add styles for other elements as needed
});
