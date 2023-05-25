import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AnimatedLoader from 'react-native-animated-loader';

const Loader = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // setVisible((prevState) => !prevState);
      setVisible(true)
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    setInterval(()=>{
      navigation.navigate('home')
    },4000)
  },[visible])

  return (
    <View>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255, 255, 255, 0)"
        animationStyle={styles.lottie}
        speed={1}
        source={(require('../assets/success.json'))}
      >
      </AnimatedLoader>
      {/* <Text>Loading</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 75,
    height: 75,
    marginTop:250,
    marginLeft:115
  },
});

export default Loader;
