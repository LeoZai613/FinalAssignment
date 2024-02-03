import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  DetailsScreen,
  SignupScreen,
  LoginScreen,
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
        {/* Removed extra space here */}
        <Stack.Screen name="LifecyclePrac" component={LifecyclePracScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{
            sessionName: 'some initial value of session name',
            BatchNumber: 0,
          }}
        />
      </Stack.Group>
    );
  };

  const renderAuthStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>
      {isLoggedIn ? renderMainStack() : renderAuthStack()}
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
