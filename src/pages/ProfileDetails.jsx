import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../colors';
import ChangePassword from './Profile/ChangePassword';


const ProfileDetails = ({route}) => {
  const {user} = route.params; 
  const[nom , setNom]=useState()
  const navigation = useNavigation();
  const [ChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
  const handleChangePassword = () => {
    setChangePasswordPopupVisible(true);
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            user.photo
              ? {uri: 'http://10.252.216.102:5000' + user.photo}
              : require('C:/Users/rzaier/Desktop/projet/Front/src/images/fa-user-circle.png')
          }
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.nom}{' '}{user.prenom}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <TouchableOpacity
      onPress={() => {
        handleChangePassword(); 
        navigation.navigate('ChangePassword', { user }); 
      }}
>      
            <Text style={styles.PwbuttonText}>Changer mot de passe</Text>
          </TouchableOpacity>
          {ChangePasswordPopupVisible && <ChangePassword isVisible={ChangePasswordPopupVisible} onClose={() => setChangePasswordPopupVisible(false)} />}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Coordonnées</Text>

      <View style={styles.inlineInput}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
         
          onChangeText={(text)=>{console.log('nom' , text) ; setNom(text);}}
          defaultValue={user.nom}
         
        />
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
          value={user.prenom}
          editable={false} 
        />
      </View>
      <View style={styles.dropDownContainer}></View>


      <Text style={styles.sectionTitle}>Société</Text>
      <View style={styles.inlineInput}>
        <Text style={styles.label}>Société</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
          value={user.entreprise}
        />
        <Text style={styles.label}>intitulé poste</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
          value={user.intitule_poste}
        />
      </View>
      <View style={styles.inlineInput}>
        <Text style={styles.label}>Fixe</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
          value={user.tel_fixe}
        />
        <Text style={styles.label}>Téléphone</Text>
        <TextInput
          style={[styles.input, styles.inlineInputItem]}
          value={user.tel_mobile}
        />
      </View>
      <View style={styles.dropDownContainer}></View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Sauvegarder les modifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'white',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', 
  },
  label: {
    fontSize: 16,

    color: '#333',
  },
  profileEmail: {
    fontSize: 18,
    color: '#000000', 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  inlineInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inlineInputItem: {
    flex: 1,
    marginRight: 10,
  },
  dropDownContainer: {
    flex: 1,
    borderColor: '#white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropDownInput: {
    height: 40,
    paddingHorizontal: 10,
    color: '#333', 
  },
  button: {
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  Pwbutton: {
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  PwbuttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ProfileDetails;
