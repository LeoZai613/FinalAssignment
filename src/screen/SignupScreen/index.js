import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform Signup logic here
    console.log('Signup pressed');
    console.log('Email:', email);
    console.log('Password:', password);

    // You may want to navigate to another screen upon successful Signup
    // For example, navigating to the login screen
    navigation.navigate('Login');
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
