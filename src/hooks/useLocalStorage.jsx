import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorage = register => {
  const [storedValues, setStoredValues] = useState();

  const getStoredValues = async () => {
    try {
      const values = await AsyncStorage.getItem('coords');
      const items = values != null ? JSON.parse(values) : null;
      setStoredValues(items);
      return items;
    } catch (error) {}
  };

  useEffect(() => {
    getStoredValues();
  }, [register]);

  const setStored = async register => {
    try {
      const valueToStore = register;
      setStoredValues(valueToStore);
      await AsyncStorage.setItem('coords', JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    storedValues,
    setStored,
    getStoredValues,
  };
};
