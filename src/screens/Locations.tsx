import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useLocalStorage} from '../hooks/useLocalStorage';
import {ListItem} from '../components/ListItem';

export const Locations = () => {
  const {getStoredValues} = useLocalStorage();
  const [data, setdata] = useState([]);

  const respose = async () => {
    const resp = await getStoredValues();
    setdata(resp);
  };

  useEffect(() => {
    respose();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Lista de ubicaciones guardadas</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ListItem data={data} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
