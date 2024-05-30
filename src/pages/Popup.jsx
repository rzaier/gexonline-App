import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

function Popup({ isVisible, onClose }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSoumettre = () => {
        if (email.trim() === '') {
            setEmailError('Adresse mail requise');
        } else if (!isValidEmail(email)) {
            setEmailError('Adresse mail invalide');
        } else {
            setEmailError('');
            setLoading(true);

            const formData = new FormData();
            formData.append('email', email);

            axios.post('http://10.252.216.102:5000/api/utilisateurs/demande-reinitialisation-mot-de-passe', 
            { email: email } 
        )
        .then(response => {
            setSuccessMessage('Email envoyé avec succès. Veuillez vérifier votre boîte de réception.');
        })
        .catch(error => {
            // console.error('Erreur:', error); // Commentez ou supprimez cette ligne pour ne pas afficher l'erreur dans l'émulateur
            console.log('Erreur:', error); // Affichez l'erreur dans la console
        })
        .finally(() => {
            setLoading(false);
        });
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.parag}>Pour réinitialiser votre mot de passe, renseignez ci-dessous l'adresse mail associée à votre compte GexOnline</Text>
                    <TextInput
                        placeholder="Adresse mail*"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        style={styles.input}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
                    {loading ? <ActivityIndicator size="large" color="#BB0A21" /> : (
                        <TouchableOpacity onPress={handleSoumettre}>
                            <Text style={styles.submitButton}>Soumettre</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      size={27}
                      style={{color: 'black'}}
                    />
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
        marginTop: 0,
        color: "#660708",
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    successMessage: {
        marginTop: 10,
        color: "green",
        textAlign: "center",
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
        marginRight: 19,
    },
    closeButton: {
        marginTop: 10,
        fontSize: 18,
        color: "#252627",
        textAlign: "center",
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
export default Popup;
