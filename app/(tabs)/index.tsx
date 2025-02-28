import renderCard from '@/components/ui/CardRenderer';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';


export default function HomeScreen() {
  const data = [
    { id: 1, text: 'Item 1', color: '#FF5733' },
    { id: 2, text: 'Item 2', color: '#33FF57' },
    { id: 3, text: 'Item 3', color: '#3357FF' },
    { id: 4, text: 'Item 4', color: '#F3FF33' },
    { id: 5, text: 'Item 5', color: '#FF33A1' },
  ];


  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = windowWidth; // Card width set to 70% of the screen width
  const navigation = useNavigation()

  const renderCards = ({ item }) => (
   // <View style={[styles.card, { backgroundColor: item.color }]}>
    //{ /* <Text style={styles.cardTitle}>{item.text}</Text> */ }
    //{ /* <CardLayout title="Villa for Sale" price="$35000" location="texas" features={["pool", "parking", "Gym", "SPA"]} /> */}
     
      renderCard(navigation, "3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"])
    
 //</View>
  );


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };


  return (
    <ScrollView style={styles.homeContainer}>
   <View style={styles.container}>
    <Text style={styles.title}>Top Stories</Text>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
       <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>

    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("explore")}>
    <Text style={styles.title}  >Latest Posts</Text>
    </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
      />
       {/* <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View> */}
    </View>

    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("explore copy")}>
    <Text style={styles.title}>Featured Posts</Text>
    </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
      />
       {/* <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View> */}
    </View>

    
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.95, // 95% of screen width
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: Dimensions.get('window').width * 0.85, // 70% of screen width
    height: 'auto',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeContainer:{
      backgroundColor: Colors.secondary,
      height: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 15
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0078D4",
  },
  inactiveDot: {
    backgroundColor: "#C4C4C4",
  },
});
