import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_XrngoUoBOuc1Sq9H1ptaq0t_VsYsbKunQ&usqp=CAU';

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
    <ImageBackground
      source={{uri: backgroundImage}}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* TextInput for email */}
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Email"
          style={styles.input}
        />

        {/* TextInput for password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />

        {/* TouchableOpacity for Signup button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'white', // text color
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignupScreen;
