import React from 'react';
import { View } from 'react-native';
import BottomBar from '../Component/buttomBar';
import MenuHeader from '../Component/menuheader';
import Carte from '../Component/carte';
import { useNavigation } from '@react-navigation/native';

const CarteActif= () => {
  const navigation = useNavigation();
  return (
    <View>
      <MenuHeader/>
      <Carte/>
      <BottomBar />
    </View>
  );
};

export default CarteActif;