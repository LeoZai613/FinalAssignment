import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next'; // Import Facebook SDK components
import auth from '@react-native-firebase/auth'; // Import Firebase Auth

const backgroundImage =
  'https://wallpapers.com/images/hd/illuminated-poke-ball-pokemon-iphone-aidw21v1d13ujypw.jpg';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Clear any existing authentication state
    auth().signOut();
  }, []);

  const loginUser = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // Navigate to the dashboard or profile screen after successful login
      navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid email or password. Please try again.');
    }
  };

  // Function to handle Facebook login
  const handleFacebookLogin = async accessToken => {
    try {
      // Create a Firebase credential with the Facebook access token
      const credential = auth.FacebookAuthProvider.credential(accessToken);

      // Use the Firebase credential to sign in
      const firebaseUser = await auth().signInWithCredential(credential);

      // Navigate to the dashboard or profile screen after successful login
      navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Firebase login error:', error);
    }
  };

  // Function to handle "Forgot Password?" action
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen'); // Navigate to the ForgotPassword screen
  };

  return (
    <ImageBackground
      source={{uri: backgroundImage}}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('Facebook login error:', error);
            } else if (result.isCancelled) {
              console.log('Facebook login was cancelled');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                if (data) {
                  // Handle successful login with the access token
                  handleFacebookLogin(data.accessToken.toString());
                }
              });
            }
          }}
          onLogoutFinished={() => console.log('User logged out')}
        />
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
