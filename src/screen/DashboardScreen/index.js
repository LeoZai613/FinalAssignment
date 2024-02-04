import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DashboardScreen = ({navigation}) => {
  // Add any specific functionality or content for your dashboard screen

  const handleLogout = () => {
    // Implement logout logic here
    // For example, remove the login state from AsyncStorage and navigate to the LoginScreen
    // You can use the AsyncStorage or any other state management solution you prefer
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Dashboard!</Text>
      {/* Add any components, data, or functionality specific to the dashboard */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
