import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import renderCard from './CardRenderer';
import { useNavigation } from '@react-navigation/native';
import CategoryTabs from './FilterTab';
import { Colors } from '@/constants/Colors';

const CardLayout = () => {
  // console.log("navigation",navigation)
  const navigation = useNavigation()
  return (
    <View style={{backgroundColor: Colors.secondary, height: "100%", paddingBottom:10}}>
    <CategoryTabs></CategoryTabs>
    <ScrollView style={styles.container}>
      {/* <Text style={styles.sectionTitle}>Top Stories</Text> */}
      {renderCard(navigation,"3bhk Villa For Sale test", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width *0.97)}
      
      {/* <Text style={styles.sectionTitle}>Latest Posts</Text> */}
      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}
      
      {/* <Text style={styles.sectionTitle}>Featured Posts</Text> */}
      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}

      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}

      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}

      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}
      
      {renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}

{renderCard(navigation,"3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"], Dimensions.get('window').width * 0.97)}

    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f0f8ff',
    paddingTop:1
    // paddingHorizontal: 10,
    // paddingLeft: 5
    // justifyContent: 'space-around'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  location: {
    fontSize: 14,
    color: '#007BFF',
    marginVertical: 5,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  featureBadge: {
    backgroundColor: '#FFA500',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default CardLayout;
