import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import ApiHelper from '../../helpers/ApiHelper';

const DashboardScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ApiHelper.get('/your-api-endpoint');
      // Assuming the response contains an array of items
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example, remove the login state from AsyncStorage and navigate to the LoginScreen
    // You can use AsyncStorage or any other state management solution you prefer
    navigation.navigate('Login');
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.carName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Welcome to the Dashboard!</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Assuming 'id' is a number
      />
      <Button title="Logout" onPress={handleLogout} />
      <Button
        title="Home"
        onPress={() => {
          // Navigate to the HomeScreen when the "Home" button is pressed
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'pink',
    margin: 5,
    height: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
