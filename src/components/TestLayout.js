import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import ThemedButton from './ThemedButton';
import ItemCell from './ItemCell';

const myButtons = ['Home', 'About', 'Blogs', 'Careers', 'Contact Us'];
const dataList = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcAR_PUrrsp3GYmPyMD4DuqabPiyjT1UhL74cTHVL_dPRINVVEsIiYGJKRSJwpQ_O0J0&usqp=CAU',
    textDescription:
      "Pokémon was one of the first games I ever played as a child, and it instilled in me a deep passion for gaming that would eventually become a profound love for programming. Due to that, I decided I'd dedicate this first assignment to an app that would let me document them ^__^",
    // buttonText: 'Go Somewhere',
  },
  {
    image:
      'https://www.airandspaceforces.com/app/uploads/2022/06/f-22-900x563.jpeg',
    textDescription:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    buttonText: 'Click Me',
  },
  {
    image:
      'https://media.defense.gov/2021/Aug/13/2002830972/2000/2000/0/210809-D-IJ948-9001.JPG',
    textDescription:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,',
    buttonText: 'Do Something',
  },
];

const TestLayout = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <View
        style={{
          height: 70,
          backgroundColor: 'purple',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>My Favorite Pokemon</Text>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: 'lightgrey',
          flexDirection: 'row',
        }}>
        {myButtons.map(thisEl => {
          return <ThemedButton title={thisEl} />;
        })}
      </View>
      <View style={{flex: 1, backgroundColor: 'grey'}}>
        <ScrollView style={{flex: 1}}>
          {dataList.map(thisEl => {
            return <ItemCell {...thisEl} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TestLayout;

const styles = StyleSheet.create({});
