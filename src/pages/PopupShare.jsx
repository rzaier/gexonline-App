import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert,StyleSheet } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function PopupShare({ isVisible, onClose,token,id }) {
    // console.log('tokennnnnn',token);
    // console.log('id here',id);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const handleSubmit = async () => {
        if (email.trim() === '') {
            setEmailError('Adresse mail requise');
        } else if (!isValidEmail(email)) {
            setEmailError('Adresse mail invalide');
        } else {
            setEmailError('');
            try {
                const response = await axios.post(
                    `http://10.252.216.102:5000/api/livrables/${id}/formulaire/partager`,
                    { emails: [email] },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                            'Content-type': 'application/json',
                        },
                    }
                );

                console.log('Fichier partagé', response);
                onClose();
            } catch (error) {
                console.error('Erreur lors du partage', error);
                if (error.response && error.response.status === 500) {
                    Alert.alert('Erreur lors du partage', 'Une erreur interne du serveur s\'est produite. Veuillez réessayer plus tard.');
                } else {
                    Alert.alert('Erreur lors du partage', error.message);
                }
            }
        }
    };
       
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
   
      
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      size={27}
                      style={{color: 'black'}}
                    />
                    </TouchableOpacity>
                    <Text style={styles.parag}>Envoyez un lien de téléchargement des fichiers qui composent le livrable Plans des Intérieurs simplifiés à une ou plusieurs personnes</Text>
                    <TextInput
                        placeholder="+ Ajouter un email"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        style={styles.input}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.submitButton}>Partager</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalView: {
        margin: 0,
        backgroundColor: '#FFF9FB',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#BB0A21',
        color: 'white',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        borderRadius: 5,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    errorText: {
        marginTop: 5,
        color: "#660708",
    },
    input: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        color: "#6D6D6D",
        borderRadius: 10,
        paddingHorizontal:13,
        marginVertical: 10,
        width:350,
      
    },
    
    parag: {
        color: '#252627',
    },
});

export default PopupShare;
