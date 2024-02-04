import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Button,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

const Dashboard = ({navigation}) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=151',
      );
      const promises = response.data.results.map(async pokemon => {
        const pokemonInfo = await axios.get(pokemon.url);
        return pokemonInfo.data;
      });
      const pokemonDetails = await Promise.all(promises);
      setPokemonData(pokemonDetails);
    };

    fetchPokemonData();
  }, []);

  const handleLogout = () => {
    // Assuming you have a navigation system in place and 'Home' is the route name for your home screen
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/204/837/HD-wallpaper-gengar-ghost-pokemon.jpg',
      }}
      style={{flex: 1}}>
      <View>
        <Button title="Logout" onPress={handleLogout} />
        <FlatList
          data={pokemonData}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                padding: 10,
                // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust alpha value for transparency
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Image
                source={{uri: item.sprites.front_default}}
                style={{width: 100, height: 100}}
              />
              <Text>
                Type:{' '}
                {item.types.map(typeInfo => typeInfo.type.name).join(', ')}
              </Text>
              <Text>
                Abilities:{' '}
                {item.abilities
                  .map(abilityInfo => abilityInfo.ability.name)
                  .join(', ')}
              </Text>
              <Text>
                Moves:{' '}
                {item.moves
                  .slice(0, 4)
                  .map(moveInfo => moveInfo.move.name)
                  .join(', ')}
              </Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Dashboard;
