import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faList,
  faEnvelope,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../colors';

const ProfileIcon = ({ route }) => {
  const { user, clientID } = route.params; // Récupérer les données de l'utilisateur passées en tant que paramètre
  const navigation = useNavigation();
console.log(clientID)
  const profileOptions = [
    { id: 1, title: 'Profil', icon: faUser},
    { id: 2, title: 'Liste des utilisateurs', icon: faList},
    { id: 3, title: 'Fil d’actualité', icon: faUser},
    { id: 4, title: 'Nous contacter', icon: faEnvelope },
    { id: 5, title: 'Mention Légales', icon: faUser },
    { id: 6, title: 'CGU', icon: faUser },
    { id: 7, title: 'Déconnexion', icon: faSignOutAlt },
  ];

  const handlePress = () => {
    navigation.navigate('ProfileDetails', { user });
   
  };
  const handleListe = () => {
    navigation.navigate('ListeUsers',{clientID});
    console.log('ckientttttt2222222',clientID);
  };

  // const handleOptionPress = (screen) => {
  //   if (screen) navigation.navigate(screen);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            user.photo
              ? { uri: 'http://10.252.216.102:5000' + user.photo }
              : require('../images/fa-user-circle.png')
          }
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.nom}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={profileOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              if (item.title === 'Profil') {
                handlePress();
              } else if (item.title === 'Liste des utilisateurs') {
                handleListe();
              }
              else {
                handleOptionPress(item.screen);
              }
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              size={20}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: 20,
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
  profileEmail: {
    fontSize: 18,
    color: '#000000', 
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#CFD2CF',
    elevation: 4, 
  },
  optionIcon: {
    marginRight: 10,
    width: 20,
    textAlign: 'center',
    color: '#000000',
  },
  optionText: {
    fontSize: 18,
    color: '#000000', 
  },
});

export default ProfileIcon;
