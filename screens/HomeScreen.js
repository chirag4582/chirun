import { View, Text ,StyleSheet} from 'react-native'
import React ,{useEffect}from 'react'
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {

  const Navigation = useNavigation();

  useEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={StyleSheet.container} >
      <Text>HomeScreen</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen