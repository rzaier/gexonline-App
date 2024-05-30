import React from 'react';
import {
  View,
  Text,
  Modal,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Button';
import Input from '../input';

function Popupcontact({ isVisible, onClose }) {
  const navigation = useNavigation();
  console.log(navigation);
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    object: '',
    message: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('adresse mail requise.', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('adresse mail invalide', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Prénom et nom requis', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Téléphone requis', 'phone');
      isValid = false;
    }

    if (!inputs.object) {
      handleError('Objet requis.', 'object');
      isValid = false;
    }
    if (!inputs.message) {
      handleError('Message requis.', 'message');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleCloseModal = () => {
    navigation.goBack();
  };
  return (
    <Modal style={{ backgroundColor: '#D3D4D9', flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: "#0B090A", fontSize: 25, fontWeight: 'bold' }}>
          Nous contacter
        </Text>
        {/* <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text> */}
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'object')}
            onFocus={() => handleError(null, 'object')}
            iconName="lock-outline"
            label="Objet de la demande de contact"
            placeholder="Enter your object "
            error={errors.object}

          />
          <Input
            onChangeText={text => handleOnchange(text, 'message')}
            onFocus={() => handleError(null, 'message')}
            iconName="lock-outline"
            label="Message"
            placeholder="Enter your message"
            error={errors.message}
            message
          />
          <Button title="Envoyer" onPress={validate} />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </Modal >
  );
};
const styles = StyleSheet.create({

  closeButton: {
    marginTop: 10,
    fontSize: 18,
    color: "#252627",
    textAlign: "center",
  },

});
export default Popupcontact;
