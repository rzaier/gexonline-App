import React , {useEffect, useState}from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image , Alert} from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import {Dropdown} from 'react-native-element-dropdown';
import DropdownComponentClient from './DropDown';
import { useNavigation } from '@react-navigation/native';
const MenuHeader = ({token , setSelectedClient , selectedClient}) => {
  const [user, setUser] = useState();
  const [clientID, setClientID] = useState(null); // État pour stocker l'ID du client
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('ProfileIcon', { user, clientID }); // Passer les données de l'utilisateur comme paramètre
  };

 
  // const [clientTable, setClientTable] = useState([]);
  const handleClientChange = client => {
    setSelectedClient(client);
    setClientID(client.id); // Stocker l'ID du client:ClientID dans setClientID
   
  };
  useEffect(() => {
    if (token) {
    axios
      .get(
        'http://10.252.216.102:5000/api/utilisateurs/connected',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          Alert.alert('Erreur', error.message);
        });
      }
    }, [token]);


 

  return (
    <View >
      <View style={styles.header}>
      {user && (
          <TouchableOpacity  onPress={handleImagePress}>
            <Image
              source={
                user.photo
                  ? {uri: 'http://10.252.216.102:5000' + user.photo}
                  :
                  require('../images/fa-user-circle.png')
                  
              }
              style={{width: 40, height: 40,borderRadius: 20,}}
            />
          </TouchableOpacity>
        )}
      {/* </View> */}
      {/* <View > */}
          {user && (
            <Text style={styles.welcomeText}>
              Bienvenue {user.nom} {''} {user.prenom}
            </Text>
          )}
        </View>

        <View style={styles.searchContainer}>
        {user && (
          <DropdownComponentClient
            onClientChange={handleClientChange}
            setSelectedClient={setSelectedClient}
            // selectedClient={selectedClient}
            token={token}
            user={user}
          />
        )}
      </View>
          
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 15,
    borderBottomWidth: 0,
    backgroundColor: '#BB0A21',
  },

  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#BB0A21',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  welcomeText: {
    color: 'black',
    fontSize: 19,
    marginLeft: 150,
  },

    dropdown: {
        
      margin: 1,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      width: 250,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
});

export default MenuHeader;

