import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const newsData = [
  {
    id: '1',
    date: 'Date',
    image: require('../../assets/images/.png'),
    text: 'Text1',
    subText: 'SousText',
  },
  {
    id: '2',
    date: 'Date',
    image: require('../../assets/images/.png'),
    text: 'Text2',
    subText: 'SousTexte',
  },
  {
    id: '3',
    date: 'Date',
    image: require('../../assets/images/.png'),
    text: 'Text3',
    subText: 'SousText',
  },
  {
    id: '4',
    date: 'Date',
    image: require('../../assets/images/.png'),
    text: 'Text4',
    subText: 'SousTexte',
  },
];

const ActualitePage = ({navigation}) => {
  const renderItem = ({item}) => (
    <View
      style={styles.newsItemContainer}
      >
      <Image source={item.image} style={styles.image} />
      <View style={styles.newsItemDetails}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.subText}>{item.subText}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ActualiteDetails')}>
        <Text style={styles.LienText}>En savoir plus</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={newsData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFF2F2',
  },
  newsItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    flex: 1,
    width: 100,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  newsItemDetails: {
    flex: 1,
    padding: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  LienText: {
    fontSize: 16,
    color: '#B72121',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default ActualitePage;
