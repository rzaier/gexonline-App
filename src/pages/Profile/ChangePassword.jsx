import React, { useState } from 'react';
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
import Button from '../../Button';
import Input from '../../input';
import axios from 'axios';

const ChangePassword = ({ token, user  }) => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    // Keyboard.dismiss();
    let isValid = true;

    // Validation des champs ici...

    if (isValid) {
      resetPassword();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const resetPassword = () => {
    const payload = {
      oldPassword: inputs.oldPassword,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    };

    axios
      .post(
        `http://10.252.216.102:5000/api/utilisateurs/change-password`,
        payload,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        const data = response.data;
        
        if (data.message === 'Mot de passe modifié') {
          Alert.alert(
            'Succès',
            'Votre mot de passe a été modifié avec succès.'
          );
          // setChangePasswordPopupVisible(false)
          navigation.goBack();
        } else {
          Alert.alert('Erreur', data.resultat);
        }
      })
      .catch(error => {
        console.error('Error console:', error);
      });
  };

  return (
    <Modal style={{ backgroundColor: '#D3D4D9', flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: '#0B090A', fontSize: 25, fontWeight: 'bold' }}>
          Changer Mot de Passe
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'oldPassword')}
            onFocus={() => handleError(null, 'oldPassword')}
            iconName="lock-outline"
            label="Ancien mot de passe"
            placeholder="Entrez l'ancien mot de passe"
            error={errors.oldPassword}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Nouveau mot de passe"
            placeholder="Entrez le nouveau mot de passe"
            error={errors.password}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'confirmPassword')}
            onFocus={() => handleError(null, 'confirmPassword')}
            iconName="lock-outline"
            label="Confirmer le mot de passe"
            placeholder="Confirmez le mot de passe"
            error={errors.confirmPassword}
          />
          <Button title="Envoyer" onPress={resetPassword} />
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 10,
    fontSize: 18,
    color: '#252627',
    textAlign: 'center',
  },
});

export default ChangePassword;
