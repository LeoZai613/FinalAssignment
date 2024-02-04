// Dashboard.js
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import axios from 'axios';

const Dashboard = () => {
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

  return (
    <FlatList
      data={pokemonData}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            padding: 10,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
          <Image
            source={{uri: item.sprites.front_default}}
            style={{width: 100, height: 100}}
          />
          <Text>
            Type: {item.types.map(typeInfo => typeInfo.type.name).join(', ')}
          </Text>
          <Text>
            Attacks:{' '}
            {item.moves
              .slice(0, 4)
              .map(moveInfo => moveInfo.move.name)
              .join(', ')}
          </Text>
        </View>
      )}
    />
  );
};

export default Dashboard;
