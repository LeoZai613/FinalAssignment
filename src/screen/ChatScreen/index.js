import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {
  getDatabase,
  ref,
  onValue,
  push,
  serverTimestamp,
} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOoiO2KNEIKtvgq2CbhplkDsq2-5DATpI',
  authDomain: 'leon-firebase-authentication.firebaseapp.com',
  projectId: 'leon-firebase-authentication',
  storageBucket: 'leon-firebase-authentication.appspot.com',
  messagingSenderId: '766866374770',
  appId: '1:766866374770:web:7cc32bb98709bfbfb082eb',
  measurementId: 'G-YR51QZ3QHL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch messages from Firebase
  const fetchMessages = () => {
    const messagesRef = ref(database, 'messages');
    onValue(
      messagesRef,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.values(data);
          setMessages(messageList.reverse()); // Reverse to show the latest message first
          setLoading(false);
        }
      },
      error => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      },
    );
  };

  // useEffect hook to fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageRef = ref(database, 'messages');
      push(messageRef, {
        text: newMessage.trim(),
        timestamp: serverTimestamp(),
      })
        .then(() => setNewMessage(''))
        .catch(error => console.error('Error sending message:', error));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{item.text}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          inverted // Show latest messages at the bottom
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type your message here..."
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
