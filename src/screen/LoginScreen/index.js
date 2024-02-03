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
    // Validate credentials (hardcoded for simplicity)
    const hardcodedEmail = 'test@example.com';
    const hardcodedPassword = 'password123';

    // Check if entered credentials match
    if (email === hardcodedEmail && password === hardcodedPassword) {
      // Navigate to the dashboard on successful login
      navigation.navigate('Dashboard');
    } else {
      // Handle login failure
      // You can display an error message or any other action
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
