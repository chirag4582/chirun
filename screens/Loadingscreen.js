import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigation } from '@react-navigation/native';

const Loadingscreen = ({navigation}) => {

    const Navigation = useNavigation();

    useEffect(() => {
      Navigation.setOptions({
        headerShown: false,
      });
    }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo/logo.png")} />
      <View style={styles.loader}>
              <Loader navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29CF31",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 130,
    height: 130,
  },
  loader:{
    paddingTop:150,
  }
});

export default Loadingscreen;
