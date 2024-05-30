// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View,Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faList,faMap, faComments, faRobot,faBell } from '@fortawesome/free-solid-svg-icons';
// import GeminiChat from '../pages/ChatGeminiScreen';
// import NotificationScreen from '../pages/NotificationScreen';
// import ListeActif from 'C:/Users/rzaier/Desktop/projet/Front/src/pages/listeActif.jsx';
// import CarteActif from '../pages/carteActif';
// // import ListeActif from '../pages/listeActif';

// const Tab = createBottomTabNavigator();

// const ButtomBar = () => {
//   return (
 
   
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarActiveTintColor: 'red',
//           tabBarInactiveTintColor: 'black',
//           tabBarStyle: {
//             display: 'flex',
//           },
//           tabBarIcon: ({ color, size, focused }) => {
//             let icon;
//             switch (route.name) {
//               case 'Liste':
//                 icon = faList;
//                 break;
//               case 'CarteActif':
//                 icon = faMap;
//                 break;
//               case 'Chat':
//                 icon = faComments;
//                 break;
//               case 'Notification':
//                 icon = faRobot;
//                 break;
//               default:
//                 icon = faList;
//                 break;
//             }
//             return <FontAwesomeIcon icon={icon} color={color} size={size} />;
//           },
//         })}
//       >
//         <Tab.Screen
//           name="liste"
//           component={ListeActif}
//           options={{ headerShown: false }}
//         />
//                 <Tab.Screen
//           name="CarteActif"
//           component={CarteActif}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Chat"
//           component={GeminiChat}
//           options={{ headerShown: false }}
//         />
//         <Tab.Screen
//           name="Notifications"
//           component={NotificationScreen}
//           options={{ headerShown: true }}
//         />
//       </Tab.Navigator>
 
//   );
// };

// export default ButtomBar;
