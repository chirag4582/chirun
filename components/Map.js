import React, { useState, useEffect } from 'react';
import { View, StyleSheet ,Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';





const Map = ({ runDuration, runStarted }) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const customMapStyle = require('../assets/map.json');
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState(0);


  useEffect(()=>{
    if(runStarted){
      setDistance(0)
    }
  },[runStarted])

  useEffect(() => {
    const startLocationUpdates = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const locationOptions = {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        };

        const locationListener = await Location.watchPositionAsync(
          locationOptions,
          (location) => {
            const { latitude, longitude } = location.coords;
            const newCoordinate = {
              latitude,
              longitude,
            };

            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            });

            setMarkerPosition(newCoordinate);
            setCoordinates((prev) => [...prev, newCoordinate]);
          }
        );

        return () => {
          locationListener.remove();
        };
      } catch (error) {
        console.log('Error getting location:', error);
      }
    };

    startLocationUpdates();
  }, []);

  useEffect(() => {
    const calculateDistance = () => {
      if (coordinates.length < 2) {
        setDistance(0);
        return;
      }

      const totalDistance = coordinates.reduce((acc, currentCoordinate, index) => {
        if (index === 0) {
          return acc;
        }

        const prevCoordinate = coordinates[index - 1];
        const prevLatLng = {
          latitude: prevCoordinate.latitude,
          longitude: prevCoordinate.longitude,
        };
        const currentLatLng = {
          latitude: currentCoordinate.latitude,
          longitude: currentCoordinate.longitude,
        };
        const distance = haversineDistance(prevLatLng, currentLatLng);
        return acc + distance;
      }, 0);

      setDistance(totalDistance);
    };

    calculateDistance();
  }, [coordinates]);

  const haversineDistance = (prevLatLng, currentLatLng) => {
    const toRadians = (angle) => (angle * Math.PI) / 180;

    const { latitude: lat1, longitude: lon1 } = prevLatLng;
    const { latitude: lat2, longitude: lon2 } = currentLatLng;

    const earthRadius = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };


  console.log(distance)
  return (
    <View style={styles.container}>
      {initialRegion && coordinates && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          customMapStyle={customMapStyle}
        >
          {!runStarted && markerPosition && <Marker coordinate={markerPosition} />}
          {runStarted && <Polyline coordinates={coordinates} />}
        </MapView>
      )}
      {runStarted && <Text style={styles.distanceText}>Distance: {(distance/1000).toFixed(2)} km</Text>}
      {runStarted && <Text style={styles.go}>Go!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: 350,
    marginTop: 30,
  },
  distanceText:{

  },
  go:{
    fontSize:20,
    alignItems:'center',
  }
});

export default Map;
