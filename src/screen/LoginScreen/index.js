import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For simplicity, let's assume any non-empty email and password is valid
    if (email && password) {
      // Navigate to the DashboardScreen on successful login
      navigation.navigate('DashboardScreen', {
        email: email,
        // Other user-related data can be passed here
      });
    } else {
      // Handle login failure
      alert('Invalid credentials. Please try again.');
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

      {/* TouchableOpacity for login button */}
      <TouchableOpacity onPress={handleLogin}>
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
