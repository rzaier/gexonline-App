import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import axios from 'axios';

export default DropdownComponentClient= ({ onClientChange , setSelectedClient , selectedClient , token , user}) => {
  const [clients, setClients] = useState();
  const [clientTable, setClientTable] = useState([]);
  const [randomClient, setRandomClient] = useState(null); // État pour stocker le client aléatoire

  useEffect(() => {
    axios.get(
      'http://10.252.216.102:5000/api/clients/utilisateur',
      {
        headers: {
          Authorization:  `Bearer ${token}`,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      },
    )
    .then(response => {
      console.log('clients ok' , response)
      setClients(response.data);
    })
    .catch(error => {
      Alert.alert('Erreur lors de la récupération des clients dropdown', error.message);
    });
  }, []);

  useEffect(() => {
    let newClientTable = [];
    if (clients) {
      newClientTable = clients.map(client => ({
        name: client.nom,
        id: client.id_client_gexpertise,
      }));
      setClientTable(newClientTable);

      // Sélectionner un client aléatoire parmi la liste récupérée
      const randomIndex = Math.floor(Math.random() * newClientTable.length);
      setRandomClient(newClientTable[randomIndex]);
    }
  }, [clients]);

  const saveClientToDatabase = async (clientId, clientName) => {
    // Fonction pour sauvegarder le client dans la base de données
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      {clients && (
        <Dropdown 
          style={styles.dropdown}
          data={clientTable}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Sélectionnez un client"
          searchPlaceholder="Rechercher..."
          value={selectedClient || (randomClient && randomClient.id)} // Utiliser le client aléatoire comme valeur par défaut
          onChange={(item) => {
            setSelectedClient(item.id);
            saveClientToDatabase(item.id, item.name);
            onClientChange(item); // Passer le client sélectionné à Maps
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      width: 280,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
  });