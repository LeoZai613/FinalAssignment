import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

// Get the screen's height to calculate the percentage-based spacing
const {height: screenHeight} = Dimensions.get('window');

const UserProfileScreen = () => {
  const [gender, setGender] = useState('');
  const [confirmedGender, setConfirmedGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation(); // Initialize navigation object

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setBirthday(date.toDateString());
    hideDatePicker();
  };

  const selectProfileImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source.uri);
      }
    });
  };

  const confirmGenderSelection = () => {
    setConfirmedGender(gender);
  };

  const navigateToDashboard = () => {
    navigation.navigate('DashboardScreen');
  };

  const navigateToChat = () => {
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <Text>User Profile</Text>

      {/* Gender Dropdown */}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <Button title="Confirm Gender" onPress={confirmGenderSelection} />

      {/* Display Confirmed Gender */}
      {confirmedGender ? <Text>Gender: {confirmedGender}</Text> : null}

      {/* Birthday Date Picker */}
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text>{birthday ? birthday : 'Select Birthday'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Image Picker */}
      <TouchableOpacity onPress={selectProfileImage} style={styles.imagePicker}>
        <Text>Select Profile Picture</Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      )}

      {/* Button to navigate to DashboardScreen */}
      <TouchableOpacity
        onPress={navigateToDashboard}
        style={styles.dashboardButton}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>

      {/* Button to navigate to ChatScreen */}
      <TouchableOpacity onPress={navigateToChat} style={styles.chatButton}>
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 44,
    marginBottom: screenHeight * 0.15, // 15% of the screen height
  },
  datePicker: {
    marginVertical: screenHeight * 0.15, // 15% of the screen height
  },
  imagePicker: {
    marginTop: screenHeight * 0.15, // 15% of the screen height
    marginVertical: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  dashboardButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  chatButton: {
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

export default UserProfileScreen;
