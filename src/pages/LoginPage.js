import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import logoGexpertise from '../images/logo-gexpertise.png';
import Popup from './Popup';
import Popupcontact from './popupcontact';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';

function LoginPage({setToken , login}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();
    // const[token, setToken]=useState();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordPopupVisible, setForgotPasswordPopupVisible] = useState(false);
    const [contactUsPopupVisible, setContactUsPopupVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (text.trim() !== '') {
            setEmailError('');
        }else {
            setEmailError('Adresse mail requise.');
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.trim() !== '') {
            setPasswordError('');
        } else {
            setPasswordError('Mot de passe requis.'); 
        }
    };
    

    const handleLogin = () => {
        if (email.trim() === '') {
            setEmailError('Adresse mail requise.');
            return;
        } else if (!isValidEmail(email)) {
            setEmailError('Adresse mail invalide.');
            return;
        }
        if (password.trim() === '') {
            setPasswordError('Mot de passe requis.');
            return;
        }
        const formData = new FormData();
        formData.append("username", email)
        formData.append("password", password)

        axios.post('http://10.252.216.102:5000/api/utilisateurs/login_check', 
        formData ,
        {headers: {Accept: 'multipart/form-data','Content-type': 'multipart/form-data',},})
            .then(response => {
                // Alert.alert('Sucess')
                // setToken()
                console.log('token', response.token)
                setToken(response.data.token)
                navigation.navigate('ListeActif', { username: email });
              
            })
            .catch(error => {
                Alert.alert('Erreur', error.message);
            });
    };

    const handleForgotPassword = () => {
        setForgotPasswordPopupVisible(true);
    };

    const handleContactUs = () => {
        setContactUsPopupVisible(true);
    };

    return (
        <View style={styles.container}>
            <Image source={logoGexpertise} style={{ width: 300, height: 180 }} />
            <Text style={{ fontSize: 23, color: "#0B090A", marginTop: -7 }}>Welcome!</Text>
            <TextInput
                placeholder="Adresse mail*"
                onChangeText={handleEmailChange}
                value={email}
                style={styles.input}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <View style={styles.passwordInput}>
                <TextInput
                    placeholder="Mot de passe*"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    style={styles.passwordField}
                />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          style={{ color: 'black' }}
          size={23}
        />
      </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }]}>
                <CheckBox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    style={styles.checkbox}
                    tintColors={{ true: '#BB0A21', false: '#6D6D6D' }}
                />
                <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
            </TouchableOpacity>
            {forgotPasswordPopupVisible && <Popup isVisible={forgotPasswordPopupVisible} onClose={() => setForgotPasswordPopupVisible(false)} />}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContactUs}>
                <Text style={styles.forgotPasswordText}>Nous contacter</Text>
            </TouchableOpacity>

            {contactUsPopupVisible && <Popupcontact isVisible={contactUsPopupVisible} onClose={() => setContactUsPopupVisible(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3D4D9",
        
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        backgroundColor: "#E8E8E8",
        width: "90%",
        color: "#6D6D6D",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: "#6D6D6D",
    },
    button: {
        backgroundColor: "#BB0A21",
        width: "90%",
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    forgotPasswordText: {
        color: "#660708",
        fontWeight: "500",
        marginTop: 10,
    },
    passwordInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
        width: "90%",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    passwordField: {
        flex: 1,
        color: "#6D6D6D",
    },
    eyeIcon: {
        padding: 10,
    },
    errorText: {
        color: "#660708",
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
});

export default LoginPage;
