import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import logoGexpertise from '../../images/logo-gexpertise.png';
import COLORS from '../../colors';

const SplashScreen = ({navigation}) => {
  const handlecontinuer = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Image
        source={logoGexpertise}
        style={{width: 300, height: 180, marginBottom: 43}}
      />
      <Text style={styles.txt}>
        GexOnline est l'offre digitale du Groupe{' '}
        <Text style={styles.boldRed}>GEXPERTISE</Text> pour une information
        immobilière connectée proposant une interface simple et personnalisée.
        Retrouvez tous vos livrables en quelques clics.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlecontinuer}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D3D4D9',
  },
  txt: {
    fontSize: 18,
    color: '#414141',
    marginTop: -1,
    paddingLeft: 17,
    paddingRight: 17,
    marginBottom:52,
  },
  boldRed: {
    fontWeight: 'bold',
    color: COLORS.red,
  },
  button: {
    backgroundColor: '#BB0A21',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    marginTop:5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SplashScreen;
