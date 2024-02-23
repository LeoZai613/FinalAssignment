import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Button,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  pokemonData: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POKEMON_DATA_REQUEST':
      return {...state, loading: true, error: null};
    case 'FETCH_POKEMON_DATA_SUCCESS':
      return {...state, loading: false, pokemonData: action.payload};
    case 'FETCH_POKEMON_DATA_FAILURE':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

function* fetchPokemonDataSaga() {
  try {
    const response = yield axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );
    yield put({
      type: 'FETCH_POKEMON_DATA_SUCCESS',
      payload: response.data.results,
    });
  } catch (error) {
    yield put({type: 'FETCH_POKEMON_DATA_FAILURE', payload: error.message});
  }
}

sagaMiddleware.run(fetchPokemonDataSaga);

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const {pokemonData, loading, error} = useSelector(state => state);

  useEffect(() => {
    dispatch({type: 'FETCH_POKEMON_DATA_REQUEST'});
  }, []);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/204/837/HD-wallpaper-gengar-ghost-pokemon.jpg',
      }}
      style={{flex: 1, padding: 20}}>
      <View>
        <Button title="Logout" onPress={handleLogout} />
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <FlatList
            data={pokemonData}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                  padding: 20,
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Pokemon-Classic',
                    marginBottom: 5,
                  }}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <Image
                  source={{uri: item.sprites.front_default}}
                  style={{width: 120, height: 120, marginBottom: 10}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Pokemon-Classic',
                  }}>
                  Type:{' '}
                  {item.types.map(typeInfo => typeInfo.type.name).join(', ')}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Pokemon-Classic',
                  }}>
                  Abilities:{' '}
                  {item.abilities
                    .map(abilityInfo => abilityInfo.ability.name)
                    .join(', ')}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Pokemon-Classic',
                  }}>
                  Moves:{' '}
                  {item.moves
                    .slice(0, 4)
                    .map(moveInfo => moveInfo.move.name)
                    .join(', ')}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Dashboard;
