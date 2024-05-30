import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  StatusBar,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faBarsStaggered} from '@fortawesome/free-solid-svg-icons/faBarsStaggered';
import {faMapLocationDot} from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import DropdownComponentClient from '../../Component/DropDown';
// import ActifCard from '../../Component/ActifCard';

const Maps = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {username} = route.params;
  const [user, setUser] = useState();
  const [actifs, setActifs] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  console.log('selectedClient map', selectedClient);
  const handleClientChange = client => {
    setSelectedClient(client);
  };
  const token =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQwNDAxODYuMDM4Mjg0LCJleHAiOjE3MTUyNDk3ODYuMDM4Mjg0LCJ1c2VybmFtZSI6InIuemFpZXJAZ2V4cGVydGlzZS5mciIsImVtYWlsIjoici56YWllckBnZXhwZXJ0aXNlLmZyIiwiY3RybCI6IiJ9.wktS5fY8tCVPlN9RUPMEkGklEre2jDZvoAOauGRahwmK2ptGqaWFHYKXQwi6n0ovcWsX24_gTiXqVJwIXywOQOVMviHBQGIUqTziei4oxMdQwo5ep8C7JioOfmvV_q4GVzqrtq6QDzIrVhLtis28By8DfM2U8RYEKltFo4DBcbgB5mJjiqHZxlnHllEGMcPOayDrhsiZG1FLBeFaz55PR1x1re78phryRDdz1Ob8IX2QqN7RwqjsNOSPmeJicmKvqYmHOKuDFl8qQJ4FsoFGIjixET5qvqOYk88GS2ET-Clq065O52t4Y4wIbNcbaGWLHkdFOAXVwzDcrXN1pqE2FmAKukU4ZbRWfbbgDvsd7KraGq9CBcgGZov5HWDoTRbHLCnlIoZlA89nRLx9k52AB0pNmNe0kAglaH3qS3sgIRaoha_XMy3EUVC0vvmrdhAlg_pKAU4dECsrPt4AtwgYvLZ7GXctNFF85QGe7oFtHYzgEwJQsG3_dqCj_XzYU4_n6vgTyW4Pq5GJt58LYO1qn45ZjQsn8G57B3ApJ1QpW58cBlUzKzQVk8_zoFBCIAPEtcW2P9Va8e2yxFS1lrTTh7__KatH2Gh4d7HS4aln692jPGBP8wlZJjDD536kNmeLfw1oeoZ8ZvsF5R2UlkTmPsHrUOx3axhWOaBVce-9Kx4';

  useEffect(() => {
    axios
      .get(
        'http://10.252.216.102:5000/api/utilisateurs/connected',

        {
          headers: {
            Authorization: token,
            Accept: 'multipart/form-data',
            'Content-type': 'multipart/form-data',
          },
        },
      )
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        Alert.alert('Erreur 2', error.message);
      });
  }, []);
  useEffect(() => {
    if (selectedClient) {
      axios
        .get(
          `http://10.252.216.102:5000/api/actifs/client/${selectedClient.id}`,
          {
            headers: {
              Authorization: token,
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
          source={require('../../images/maps_image.png')}
        />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{item.adresse_etat}</Text>
          <Text style={styles.txtEmailStyle}>{item.nom}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        {user && (
          <TouchableOpacity>
            <Image
              source={
                user.photo
                  ? {uri: 'http://10.252.216.102:5000' + user.photo}
                  :require('../../images/fa-user-circle.png')
                  
              }
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        )}
        <View style={styles.userInfo}>
          {user && (
            <Text style={styles.welcomeText}>
              Bienvenue {user.nom} {''} {user.prenom}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        {user && (
          <DropdownComponentClient
            onClientChange={handleClientChange}
            setSelectedClient={setSelectedClient}
            selectedClient={selectedClient}
          />
        )}
      </View>

      <StatusBar backgroundColor="#000" />
      {actifs && (
        <FlatList
          data={actifs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0}
        />
      )}

      <View style={styles.bt}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Carte</Text>
          <FontAwesomeIcon
            icon={faMapLocationDot}
            style={{color: '#ffffff'}}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: 'center', // Centrer horizontalement les cartes
  },
  bt: {
    position: 'absolute',
    top: 0,
    right: -250,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BB0A21',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'white',
  },
  actifContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actifImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  actifName: {
    fontSize: 16,
  },
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
});

export default Maps;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import SearchBar from '../../Component/SearchBar';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons/faBarsStaggered';

// import DropdownComponentClient from '../../Component/DropDown';
// import ActifCard from '../../Component/ActifCard'; // Importez le composant de carte

// const Maps = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { username } = route.params;

//   // Données de test pour les cartes
//   const cardData = [
//     { text: 'Texte 1' },
//     { text: 'Texte 2' },
//     { text: 'Texte 3' },
//     { text: 'Texte 4' },
//     { text: 'Texte 5' },

//   ];

//   const [user, setUser] = useState();
//   const token =
//     'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQwNDAxODYuMDM4Mjg0LCJleHAiOjE3MTUyNDk3ODYuMDM4Mjg0LCJ1c2VybmFtZSI6InIuemFpZXJAZ2V4cGVydGlzZS5mciIsImVtYWlsIjoici56YWllckBnZXhwZXJ0aXNlLmZyIiwiY3RybCI6IiJ9.wktS5fY8tCVPlN9RUPMEkGklEre2jDZvoAOauGRahwmK2ptGqaWFHYKXQwi6n0ovcWsX24_gTiXqVJwIXywOQOVMviHBQGIUqTziei4oxMdQwo5ep8C7JioOfmvV_q4GVzqrtq6QDzIrVhLtis28By8DfM2U8RYEKltFo4DBcbgB5mJjiqHZxlnHllEGMcPOayDrhsiZG1FLBeFaz55PR1x1re78phryRDdz1Ob8IX2QqN7RwqjsNOSPmeJicmKvqYmHOKuDFl8qQJ4FsoFGIjixET5qvqOYk88GS2ET-Clq065O52t4Y4wIbNcbaGWLHkdFOAXVwzDcrXN1pqE2FmAKukU4ZbRWfbbgDvsd7KraGq9CBcgGZov5HWDoTRbHLCnlIoZlA89nRLx9k52AB0pNmNe0kAglaH3qS3sgIRaoha_XMy3EUVC0vvmrdhAlg_pKAU4dECsrPt4AtwgYvLZ7GXctNFF85QGe7oFtHYzgEwJQsG3_dqCj_XzYU4_n6vgTyW4Pq5GJt58LYO1qn45ZjQsn8G57B3ApJ1QpW58cBlUzKzQVk8_zoFBCIAPEtcW2P9Va8e2yxFS1lrTTh7__KatH2Gh4d7HS4aln692jPGBP8wlZJjDD536kNmeLfw1oeoZ8ZvsF5R2UlkTmPsHrUOx3axhWOaBVce-9Kx4';

//   useEffect(() => {
//     axios
//       .get(
//         'http://10.252.216.102:5000/api/utilisateurs/connected',

//         {
//           headers: {
//             Authorization: token,
//             Accept: 'multipart/form-data',
//             'Content-type': 'multipart/form-data',
//           },
//         },
//       )
//       .then(response => {
//         setUser(response.data);
//       })
//       .catch(error => {
//         Alert.alert('Erreur 2', error.message);
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* En-tête */}
//       <View style={styles.header}>
//         {user && (
//           <TouchableOpacity>
//             <Image
//               source={
//                 user.photo
//                   ? { uri: 'http://10.252.216.102:5000' + user.photo }
//                   : require('../../images/fa-user-circle.png')
//               }
//               style={{ width: 20, height: 20 }}
//             />
//           </TouchableOpacity>
//         )}
//         <View style={styles.userInfo}>
//           {user && (
//             <Text style={styles.welcomeText}>
//               Bienvenue {user.nom} {''} {user.prenom}
//             </Text>
//           )}
//         </View>
//       </View>

//       <View style={styles.searchContainer} >
//         {user && <DropdownComponentClient />}
//       </View>

//       {/* Corps */}
//       <View style={styles.body}>
//         <ScrollView>
//           {/* Liste des cartes */}
//           <View style={styles.cardList}>
//             {cardData.map((item, index) => (
//               <ActifCard
//                 key={index}
//                 image={require('../../images/maps_image.png')} // Utilisez l'image statique ici
//                 text={item.text}
//               />
//             ))}
//           </View>
//         </ScrollView>
//         {/* Bouton */}
//         <View style={styles.bt}>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>LISTES</Text>
//             <FontAwesomeIcon
//               icon={faBarsStaggered}
//               style={{ color: '#ffffff' }}
//               size={30}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     borderBottomWidth: 0,
//     borderBottomColor: '#ccc',
//     backgroundColor: '#BB0A21',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   welcomeText: {
//     // marginLeft: 5,
//     color: 'white',
//     fontSize: 18,
//   },
//   searchContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     backgroundColor: '#BB0A21',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     // justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   bt: {
//     position: 'absolute',
//     top: 0,
//     right: -250,
//     left: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#BB0A21',
//     padding: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderRadius: 30,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight: 5,
//     color: 'white',
//   },
// });

// export default Maps;
