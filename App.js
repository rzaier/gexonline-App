import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './src/pages/LoginPage';
import Maps from './src/pages/Acceuil/maps';
import ListeActif from './src/pages/listeActif';
import ProfileIcon from './src/Component/ProfileIcon';
import ProfileDetails from './src/pages/ProfileDetails';
import VoirActif from './src/pages/VoirActif';
import ChangePassword from './src/pages/Profile/ChangePassword';
import SplashScreen from './src/pages/Profile/SplashScreen';
import ListeUsers from './src/pages/ListeUsers';
const Stack = createNativeStackNavigator();

function App() {
  const [token, setToken] = useState(null);
  console.log(token);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Cacher la barre de titre pour toutes les pages
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login">
          {props => <LoginPage {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="ListeActif">
          {props => <ListeActif {...props} token={token} />}
        </Stack.Screen>

        <Stack.Screen name="ProfileIcon" component={ProfileIcon} />

        <Stack.Screen name="ListeUsers">
          {props => <ListeUsers {...props} token={token} />}
        </Stack.Screen>

        <Stack.Screen name="ProfileDetails" >
        {props => <ProfileDetails {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword">
          {props => <ChangePassword {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="VoirActif">
          {props => <VoirActif {...props} token={token} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

