import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons/faUserPen';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import COLORS from '../colors';
import axios from 'axios';
import PopupAjouter from './PopupAjouter';
import PopupEditUser from './PopupEditUser'; 


const ListeUsers = ({route, token}) => {
  const {clientID} = route.params;
  const [users, setUsers] = useState([]);
  const [PopupAjouterVisible, setPopupAjouterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupEditUserVisible, setPopupEditUserVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // console.log(token);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://10.252.216.102:5000/api/utilisateurs/client/admin/${clientID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setUsers(response.data);
    } catch (error) {
      console.log('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const addUser = () => {
    setPopupAjouterVisible(true);
  };
  const editUser = (user) => {
    setCurrentUser(user);
    setPopupEditUserVisible(true);
  };

  const deleteUser = item => {
    setLoading(true);

    axios
      .delete(
        `http://10.252.216.102:5000/api/utilisateurs/clients/${clientID}/utilisateur/${item.id_utilisateur_gexonline}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        Alert.alert('Succès', 'Utilisateur supprimé avec succès');
        fetchUsers(); // Mettre à jour la liste des utilisateurs après la suppression
      })
      .catch(error => {
        console.log("Erreur lors de la suppression de l'utilisateur:", error);
        Alert.alert(
          'Erreur',
          "Une erreur s'est produite lors de la suppression de l'utilisateur",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const renderItem = ({item}) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>
        {item.prenom} {item.nom}
      </Text>
      <View style={styles.iconContainer}>

      <TouchableOpacity  onPress={() => editUser(item)}>
          <FontAwesomeIcon icon={faUserPen} style={{ color:COLORS.blue}} size={27} />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteUser(item)}>
        <FontAwesomeIcon icon={faTrashCan}           style={{ color: COLORS.red }}
          size={20}/>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={addUser}>
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableOpacity>
      {PopupAjouterVisible && (
        <PopupAjouter
          isVisible={PopupAjouterVisible}
          onClose={() => setPopupAjouterVisible(false)}
          token={token}
          clientID={clientID}
        />
      )}
       {popupEditUserVisible && currentUser && (
        <PopupEditUser
          isVisible={popupEditUserVisible}
          onClose={() => setPopupEditUserVisible(false)}
          user={currentUser}
          token={token}
          fetchUsers={fetchUsers}
        />
      )}

<FlatList
  data={users}
  renderItem={renderItem}
  keyExtractor={item => item.id_utilisateur_gexonline.toString()} 
  style={styles.list}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    marginBottom: 20,
        // width: "90%",
        padding: 10,
        borderRadius: 10,
   
  },
  addButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '15%', 
    paddingVertical: 0, 
  },
});

export default ListeUsers;
