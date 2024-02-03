import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  DetailsScreen,
  LoginScreen,
  SignupScreen,
  UserProfileScreen,
  LifecyclePracScreen,
} from '../screen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const renderMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="LifecyclePrac" component={LifecyclePracScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{
            sessionName: 'some initial value of session name',
            BatchNumber: 0,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>{isLoggedIn ? renderMainStack() : null}</Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
