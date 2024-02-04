import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Button} from 'react-native';
import ApiHelper from '../../helpers/ApiHelper';

const DashboardScreen = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await ApiHelper.get(
        'https://pokeapi.co/api/v2/pokemon?limit=151',
      );
      setPokemons(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  const renderPokemon = ({item}) => {
    const idPokemon = item.url
      .split('https://pokeapi.co/api/v2/pokemon/')[1]
      .split('/')[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;

    return (
      <View style={styles.pokemonContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Dashboard!</Text>
      {pokemons && pokemons.length > 0 ? (
        <FlatList
          data={pokemons}
          renderItem={renderPokemon}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text>Loading Pokémon...</Text>
      )}
      <Button
        title="Logout"
        onPress={() => {
          // Implement logout logic here
          // For example, remove the login state from AsyncStorage and navigate to the LoginScreen
          // You can use AsyncStorage or any other state management solution you prefer
          navigation.navigate('Login');
        }}
      />
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
  pokemonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default DashboardScreen;
