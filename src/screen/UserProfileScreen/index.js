import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import styles from './styles';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import LocationInfo from './LocationInfo';

const UserProfileScreen = props => {
  const [anytext, setanytext] = useState('');
  const [count, setCount] = useState(0);
  // console.log('user profile component f got rerendered');

  // console.log(props);

  console.log('USER PROFILE FUNCTIONAL COMPONENT GOT RERENDERED');

  let {firstName, lastName, cell, email, city, country} = props;

  const onLocationTestButtonPress = useCallback(() => {
    console.log('location test button got pressed');
  }, []);

  const calculation = useMemo(() => expensiveCalculation(count), []);

  const increment = () => {
    setCount(c => c + 1);
  };

  return (
    <View>
      <Text>User Profile</Text>
      <PersonalInfo />
      <ContactInfo />
      <LocationInfo onTestBtnTap={onLocationTestButtonPress} />

      <TextInput
        value={anytext}
        onChangeText={ct => {
          setanytext(ct);
        }}
        placeholder="Enter text"
      />

      <TouchableOpacity
        onPress={() => {}}
        style={[styles.myButton, styles.myAlternateStyle]}>
        <Text>Button</Text>
      </TouchableOpacity>
      <Text>{calculation}</Text>
      <Button title={'Increment'} onPress={increment} />
    </View>
  );
};

const expensiveCalculation = num => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

export default UserProfileScreen;
