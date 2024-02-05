import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Perform Signup logic here
    console.log('Signup pressed');
    console.log('Email:', email);
    console.log('Password:', password);

    // Store user data in AsyncStorage
    await storeUserData(email, password);

    // Navigate to the login screen
    navigation.navigate('Login');
  };

  const storeUserData = async (email, password) => {
    try {
      // Store user email and password in AsyncStorage
      await AsyncStorage.setItem('@user_email', email);
      await AsyncStorage.setItem('@user_password', password);
    } catch (e) {
      // Handle saving error
      console.error('Error storing user data:', e);
    }
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

      {/* TouchableOpacity for Signup button */}
      <TouchableOpacity onPress={handleSignup}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
