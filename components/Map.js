import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const customMapStyle = require('../assets/map.json');


  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerPosition({ latitude, longitude });
      } catch (error) {
        console.log('Error getting location:', error);
      }
    };

    getLocation();
  }, [markerPosition]);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} 
        initialRegion={initialRegion} 
        customMapStyle={customMapStyle} 
        >
          {markerPosition && <Marker coordinate={markerPosition} />}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width:395
  },
});

export default Map;
