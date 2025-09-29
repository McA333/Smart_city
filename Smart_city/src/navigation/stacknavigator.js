import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/homescreen';
import ParkingMapScreen from '../screen/parkingmapscreen';
import ParkingDetailScreen from '../screen/parkingdetails';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ParkingMap" component={ParkingMapScreen} options={{ title: 'Carte des parkings' }} />
        <Stack.Screen name="ParkingDetail" component={ParkingDetailScreen} options={{ title: 'Détails parking' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
