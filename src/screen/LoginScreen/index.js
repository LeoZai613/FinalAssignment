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
import {useAppContext} from '../../contexts/AppContext'; // Updated the path

const backgroundImage =
  'https://wallpapers.com/images/hd/illuminated-poke-ball-pokemon-iphone-aidw21v1d13ujypw.jpg';

const LoginScreen = ({navigation}) => {
  const {login} = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const isAuthenticated = await login(email, password);

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

        {/* TouchableOpacity for login button */}
        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Button to navigate to Signup */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={styles.buttonText}>Sign up</Text>
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
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
