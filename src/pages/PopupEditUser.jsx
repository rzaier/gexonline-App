import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Keyboard,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import Input from '../input';
import COLORS from '../colors';

function PopupEditUser({isVisible, onClose, user, token, fetchUsers}) {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    entreprise: user.entreprise,
    intitule_poste: user.intitule_poste,
    is_gex_memeber: user.is_gex_memeber,
    password: user.password,
    tel_fixe: user.tel_fixe,
    tel_mobile: user.tel_mobile,
    civilite: user.civilite,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Adresse mail requise.', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Adresse mail invalide', 'email');
      isValid = false;
    }

    if (isValid) {
      updateUser();
    }
  };

  const updateUser = async () => {
    console.log('inputs' , inputs)
    try {
      await axios.post(
        `http://10.252.216.102:5000/api/utilisateurs/update/utilisateur/$`,
        {
          nom: inputs.nom,
          prenom: inputs.prenom,
          email: inputs.email,
          // password: inputs.password,
          entreprise: inputs.entreprise,
          intitule_poste: inputs.intitule_poste,
          // is_gex_memeber: inputs.is_gex_memeber,
          tel_fixe: inputs.tel_fixe,
          tel_mobile: inputs.tel_mobile,
          civilite: inputs.civilite,
          type_fonction:"1",
          secteur_activite:"1"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      fetchUsers(); // Rafraîchir la liste des utilisateurs
      onClose(); // Fermer la popup
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'utilisateur:", error);
    
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView
         contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}
        >
        
        <Text style={styles.headerText}>Modifier l'utilisateur</Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'nom')}
            onFocus={() => handleError(null, 'nom')}
            label="Nom"
            placeholder="Entrez le nom"
            value={inputs.nom}
            error={errors.nom}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'prenom')}
            onFocus={() => handleError(null, 'prenom')}
            label="Prénom"
            placeholder="Entrez le prénom"
            value={inputs.prenom}
            error={errors.prenom}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Email"
            placeholder="Entrez l'adresse email"
            value={inputs.email}
            error={errors.email}
            editable={false}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'entreprise')}
            onFocus={() => handleError(null, 'entreprise')}
            label="Entreprise"
            placeholder="Entrez l'Entreprise"
            value={inputs.entreprise}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'intitule_poste')}
            onFocus={() => handleError(null, 'intitule_poste')}
            label="Intitule_poste"
            placeholder="Entrez l'intitule_poste'"
            value={inputs.intitule_poste}
          />
       
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'tel_mobile')}
            onFocus={() => handleError(null, 'tel_mobile')}
            label="tel_mobile"
            placeholder="Entrez le tel_mobile"
            value={inputs.tel_mobile}
          />
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, ' tel_fixe')}
            onFocus={() => handleError(null, 'tel_fixe')}
            label="tel_fixe"
            placeholder="Entrez le tel_fixe"
            value={inputs.tel_fixe}
          />
          <Input
            onChangeText={text => handleOnchange(text, ' civilite')}
            onFocus={() => handleError(null, 'civilite')}
            label="Civilite"
            placeholder="Entrez civilite"
            value={inputs.civilite}
          />
  
          <Button title="Enregistrer" onPress={validate}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 10,
    fontSize: 18,
    color: '#252627',
    textAlign: 'center',
  },
});

export default PopupEditUser;
