import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CardLayout from '@/components/ui/CardLayout';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function TabTwoScreen() {
  const navigation = useNavigation()
  const [posts, setPosts] = useState([{
      title:"3bhk Villa For Sale test", 
      price:"$30000", 
      location:"Texas, USA", 
      amenities:["Gym", "Parking", "ClubHouse"],
      postedBy:"john Doe",
      createdAt: "10 mins ago",
      images: ["https://corporatenriappimages.s3.amazonaws.com/uploads/1741710437228-house.jpg"] 
    },{
      title:"3bhk Villa For Sale test", 
      price:"$30000", 
      location:"Texas, USA", 
      amenities:["Gym", "Parking", "ClubHouse"],
      postedBy:"john Doe",
      createdAt: "10 mins ago",
      images: ["https://corporatenriappimages.s3.amazonaws.com/uploads/1741710437228-house.jpg"] 
    }])
  return (
    <CardLayout posts={posts} navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
