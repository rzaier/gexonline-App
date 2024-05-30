import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  UIManager,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccordionList } from 'accordion-collapse-react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShareNodes, faDownload } from '@fortawesome/free-solid-svg-icons';
import COLORS from '../colors';
import PopupShare from './PopupShare';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VoirActif = ({ route, token }) => {
  const { actif } = route.params;
  const [livrables, setLivrables] = useState([]);
  const [selectedLivrable, setSelectedLivrable] = useState(null);
  const [shareIndex, setShareIndex] = useState(null);

  const handleShare = (index) => {
    setShareIndex(index);
  };

  const handleCloseShare = () => {
    setShareIndex(null);
  };

  useEffect(() => {
    axios
      .get(
        `http://10.252.216.102:5000/api/livrables/actif/${actif.id_actif_gexpertise}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Données des livrables:', response.data);
        setLivrables(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des livrables:',
          error
        );
      });
  }, [actif, token]);

  const handleDownload = async (fichier) => {
    const url = `http://10.252.216.102:5000/api/fichiers/download/${fichier.id_fichier_gexpertise}/${fichier.nom}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Impossible d\'ouvrir l\'URL: ', url);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de l\'URL: ', error);
    }
  };

  function renderHeader(livrable, _, isActive) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.accordTitle}>{livrable.nom}</Text>
        <Icon
          name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#bbb"
        />
      </View>
    );
  }

  function renderContent(livrable, _, isActive) {
    return (
      <View style={styles.accordBody}>
        {isActive && (
          <View>
            <View style={styles.fileContainer}>
              <Text style={styles.headerText}>Nom</Text>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Taille</Text>
              <Text></Text>
            </View>
            {livrable.fichiers.map((fichier, fichierIndex) => (
              <View key={fichierIndex} style={styles.fileContainer}>
                <Text style={styles.txt}>{fichier.nom}</Text>
                <Text>{fichier.date_mise_a_disposition.split('T')[0]}</Text>
                <Text>{fichier.taille}</Text>

                <View style={styles.iconContainer}>
                  
                  <TouchableOpacity
                    onPress={() => handleDownload(fichier)}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      size={15}
                      style={{ color: COLORS.red }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleShare(fichierIndex)}
                  >
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      size={15}
                      style={{ color: COLORS.red }}
                    />
                  </TouchableOpacity>
                </View>
                {shareIndex === fichierIndex && (
                  <PopupShare
                    isVisible={true}
                    onClose={handleCloseShare}
                    token={token}
                    id={livrable.id_livrable_gexpertise}
                  />
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  function handlePress(livrable) {
    setSelectedLivrable(livrable);
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.itemImage}
          source={require('../images/default_actif.png')}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.itemName}>Détail de l'actif</Text>
          <Text style={styles.itemDetail}>
            {actif.nom}, {actif.adresse_rue1}
          </Text>
          <Text style={styles.itemDetail}>
            {actif.adresse_rue2}, {actif.adresse_etat}
          </Text>
          <Text style={styles.itemDetail}>
            {actif.adresse_ville}, {actif.adresse_pays}
          </Text>
        </View>
      </View>

      <AccordionList
        list={livrables}
        header={renderHeader}
        body={renderContent}
        keyExtractor={(item, index) => index.toString()}
        expandedIcon={'chevron-up'}
        collapsedIcon={'chevron-down'}
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderColor: 'white',
    paddingVertical: 16,
  },
  itemImage: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  contentWrapper: {
    justifyContent: 'space-around',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  itemDetail: {
    color: '#696969',
  },
  accordHeader: {
    padding: 12,
    backgroundColor: COLORS.red,
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  accordTitle: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    marginTop: 2,
    paddingHorizontal: 10,
  },

  header: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    color: '#333',
  },
  livrablesContainer: {
    marginBottom: 10,
  },
  livrableFilesContainer: {
    marginTop: 20,
  },

  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txt: {
    width: 90,
  },

  noLivrableSelected: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  fileNameHeader: {
    fontWeight: 'bold',
  },
  fileDetailHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '12%', 
    paddingVertical: 10, 
  },
});

export default VoirActif;

