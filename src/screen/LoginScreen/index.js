import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    // Load saved email and password on component mount
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Retrieve user email and password from AsyncStorage
      const savedEmail = await AsyncStorage.getItem('@user_email');
      const savedPassword = await AsyncStorage.getItem('@user_password');

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    } catch (e) {
      // Handle loading error
      console.error('Error loading user data:', e);
    }
  };

  const loginUser = async () => {
    try {
      // Retrieve saved email and password from AsyncStorage
      const savedEmail = await AsyncStorage.getItem('@user_email');
      const savedPassword = await AsyncStorage.getItem('@user_password');

      // Check if the entered credentials match the saved ones
      if (email === savedEmail && password === savedPassword) {
        // Perform login logic here
        const isAuthenticated = await login(email, password);

        if (isAuthenticated) {
          await storeData('userToken');
          navigateToDashboard();
        } else {
          // Handle login failure
          alert('Invalid credentials. Please try again.');
        }
      } else {
        // Credentials do not match
        alert('Invalid credentials. Please try again.');
      }
    } catch (e) {
      // Handle error
      console.error('Error retrieving user data:', e);
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

  const logSavedData = async () => {
    try {
      // Log saved data to the console
      const savedEmail = await AsyncStorage.getItem('@user_email');
      const savedPassword = await AsyncStorage.getItem('@user_password');
      console.log('Saved Email:', savedEmail);
      console.log('Saved Password:', savedPassword);
    } catch (e) {
      // Handle error
      console.error('Error logging saved data:', e);
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

        {/* TouchableOpacity for login button */}
        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Button to log saved data */}
        <TouchableOpacity style={styles.logButton} onPress={logSavedData}>
          <Text style={styles.buttonText}>Log Saved Data</Text>
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
  logButton: {
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
