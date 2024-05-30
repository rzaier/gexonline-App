import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleResetPassword = () => {
    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Envoyer la demande de réinitialisation au backend
    fetch('http://adresse-du-backend/api/reinitialisation-mot-de-passe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'email-utilisateur', new_password: newPassword }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message); 
      })
      .catch(error => {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      
      });
  };
  
  return (
    <View>
      <Text>Saisissez votre nouveau mot de passe :</Text>
      <TextInput
        secureTextEntry
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        secureTextEntry
        placeholder="Confirmez le nouveau mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Réinitialiser le mot de passe" onPress={handleResetPassword} />
    </View>
  );
}

export default ResetPassword;
