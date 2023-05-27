import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Map from '../components/Map';

const HomeScreen = () => {
  const Navigation = useNavigation();
  const [runStarted, setrunStarted] = useState(false);
  // const [runDuration, setRunDuration] = useState(0);

  useEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const toggleLocationUpdates = () => {
    setrunStarted((prev) => !prev);
  };

  const updateDistance = (distance) => {
    setRunDistance(distance*1000);
  };

  return (
    <View style={styles.container}>
      <Text>Wait till markers calibarates acuurately for best results</Text>
      <Button
        title={runStarted ? 'Stop Running?' : 'Start!!!'}
        onPress={toggleLocationUpdates}
      />
      <View style={styles.mapContainer}>
        <Map runStarted={runStarted} updateDistance={updateDistance} />
      </View>
      
      {/* <Text>Duration: {runDuration} milliseconds</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 0.5,
    width: 300,
    alignItems: 'center',
  },
});

export default HomeScreen;
