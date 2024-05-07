import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export const ListItem = ({data}) => {
  return (
    <SafeAreaView>
      <Text style={styles.fonts}>Latitude : {data.latitude}</Text>
      <Text style={styles.fonts}>Longitude: {data.longitude}</Text>
      <Text style={styles.fonts}>Postal Code: {data.cp}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fonts: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
