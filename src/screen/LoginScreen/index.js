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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = async () => {
    // Implement your authentication logic here, for simplicity, always return true
    return true;
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@login_state', value);
    } catch (e) {
      // Handle saving error
    }
  };

  const loginUser = async () => {
    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
      await storeData('userToken');
      navigateToDashboard();
    } else {
      // Handle login failure
      alert('Invalid credentials. Please try again.');
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
