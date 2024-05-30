import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapLocationDot} from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { useNavigation } from '@react-navigation/native';

const liste = ({selectedClient, token}) => {
  const navigation = useNavigation();


  const handleVoirActifPress = (item) => {
    // console.log('item' , item)

    navigation.navigate('VoirActif',{ actif: item });
  };
  
  const [actifs, setActifs] = useState([]);
  console.log('selectedClient', selectedClient);
  useEffect(() => {
    if (selectedClient) {
      axios
        .get(
          `http://10.252.216.102:5000/api/actifs/client/${selectedClient.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log('Données des actifs :', response.data);
          console.log('response.data', response.data);
          setActifs(response.data);
        })
        .catch(error => {
          Alert.alert(
            'Erreur lors de la récupération des actifs',
            error.message,
          );
        });
    }
  }, [selectedClient]);
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image
          style={styles.itemImageStyle}
          source={require('../images/default_actif.png')}
        />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{item.adresse_etat}</Text>
          <Text style={styles.txtEmailStyle}>{item.nom},{item.adresse_rue1}</Text>
          <TouchableOpacity style={styles.voirActif}  onPress={() => handleVoirActifPress(item)}>
            <Text style={styles.voirActiftxt}>Voir Actif</Text>
          </TouchableOpacity>
        </View>
          
        </View>
    
    );
  };



  return (
    <View>
      {actifs && (
        <FlatList
          data={actifs}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
    backgroundColor: '#BB0A21',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#BB0A21',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 7,
    
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
     marginRight: 60,
      padding: 5,
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },

  voirActif: {
    backgroundColor: '#BB0A21',
     borderRadius: 22,

     marginRight: 200, 
    padding: 5,
  },
  voirActiftxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default liste;
