import React, {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useLocalStorage} from './useLocalStorage';

export const useLocation = () => {
  const [coords, setCoords] = useState({
    latitude: '',
    longitude: '',
    cp: '',
  });
  const {setStored} = useLocalStorage(coords);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const requestLocationPermission = async () => {
    setIsLoading(true);
    try {
      const auth = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'locatio App needs access to your location',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (auth === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async location => {
        const {latitude, longitude} = location.coords;
        const cp = await getPostalCodeByCoords(latitude, longitude);
        setCoords({latitude, longitude, cp});
        const data = {
          latitude,
          longitude,
          cp,
        };
        setStored(data);
      },
      error => setErrorMessage(error.message),
    );
  };

  const getPostalCodeByCoords = async (latitude, longitude) => {
    try {
      const URL = `https://api.copomex.com/query/info_cp_geocoding_reverse?lat=${latitude}&lng=${longitude}&token=730cd0b3-5611-4a86-b8e7-ec23d807bfe4`;
      const res = await fetch(URL);
      const {response} = await res.json();
      return response.cp;
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return {
    coords,
    isLoading,
    requestLocationPermission,
    getLocation,
    errorMessage,
  };
};
