// LoginScreen.js
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../contexts/AppContext'; // Update the path

const LoginScreen = ({navigation}) => {
  const {login} = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const isAuthenticated = await login(email);

    if (isAuthenticated) {
      await storeData('userToken');
      navigateToDashboard();
    } else {
      // Handle login failure
      alert('Invalid credentials. Please try again.');
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@login_state', value);
    } catch (e) {
      // Handle saving error
    }
  };

  const navigateToDashboard = () => {
    navigation.navigate('DashboardScreen', {
      email: email,
      // Other user-related data can be passed here
    });
  };

  return (
    <View>
      {/* TextInput for email */}
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter Email"
      />
      {/* TextInput for password */}
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter Password"
        secureTextEntry
      />

      {/* TouchableOpacity for login button */}
      <TouchableOpacity onPress={loginUser}>
        <Text>Login</Text>
      </TouchableOpacity>

      {/* Button to navigate to Signup */}
      <Button
        title="Go to Signup"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
