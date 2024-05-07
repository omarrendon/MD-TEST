import React from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {colors} from '../theme/AppTheme';
import {useLocation} from '../hooks/useLocation';

export const Home = () => {
  const {isLoading, coords, requestLocationPermission, getLocation} =
    useLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          disabled={isLoading}
          mode="contained"
          onPress={
            Platform.OS === 'android' ? requestLocationPermission : getLocation
          }>
          LOCATION NOW
        </Button>
      </View>
      <View style={styles.coordsContainer}>
        <Text style={styles.fonts}>Latitude : {coords.latitude}</Text>
        <Text style={styles.fonts}>Longitude: {coords.longitude}</Text>
        <Text style={styles.fonts}>Postal Code: {coords.cp}</Text>
      </View>
      {isLoading && (
        <View>
          <ActivityIndicator
            animating={true}
            color={colors.primary}
            size={'large'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordsContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  fonts: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
