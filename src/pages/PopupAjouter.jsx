import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function PopupAjouter({ isVisible, onClose, token, clientID }) {
    console.log(token);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSoumettre = () => {
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
            setError('Tous les champs sont requis');
            setEmailError(''); 
        } else if (!isValidEmail(email)) {
            setEmailError('Adresse mail invalide');
            setError('');
        } else {
            setLoading(true);
            setError('');
            setEmailError('');

            const userData = {
                nom: lastName,
                prenom: firstName,
                email: email,
                id_client_gexpertise: clientID
             
            };

           
            axios.post('http://10.252.216.102:5000/api/utilisateurs/invitation', userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    setSuccessMessage('Utilisateur ajouté avec succès');
                    setLoading(false);
                    onClose(); 
                    Alert.alert('Succès', 'Utilisateur ajouté avec succès');
                })
                .catch(error => {
                    
                    console.log('Erreur lors de l\'ajout de l\'utilisateur:', error);
                    setError('Une erreur s\'est produite. Veuillez réessayer.');
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
                    <Text style={styles.title}>Ajouter un utilisateur</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Prénom:</Text>
                        <TextInput
                            placeholder="Prénom"
                            onChangeText={text => setFirstName(text)}
                            value={firstName}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nom:</Text>
                        <TextInput
                            placeholder="Nom"
                            onChangeText={text => setLastName(text)}
                            value={lastName}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Adresse email:</Text>
                        <TextInput
                            placeholder="Adresse email"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={styles.input}
                            keyboardType="email-address"
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    {loading ? <ActivityIndicator size="large" color="#BB0A21" /> : (
                        <TouchableOpacity onPress={handleSoumettre}>
                            <Text style={styles.submitButton}>Soumettre</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <FontAwesomeIcon icon={faXmark} size={27} style={{ color: 'black' }} />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        width: '80%', 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        height: 73,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#BB0A21',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successMessage: {
        color: 'green',
        marginBottom: 10,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default PopupAjouter;
