import renderCard from '@/components/ui/CardRenderer';
import CategoryTabs from '@/components/ui/FilterTab';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { filterPosts } from '@/components/Utils';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';


export default function HomeScreen() {

  
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = windowWidth; // Card width set to 70% of the screen width
  const navigation = useNavigation()
  const [topStories, setTopStories] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [topStoriesLoading, setTopStoriesLoading] = useState(true)
  const [latestLoading, setLatestLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("0");



  const onRefresh = () =>{
    setRefreshing(true);
    getFeaturedPosts(selectedCategory);
    getDashboardPosts(selectedCategory);
    getLatestPosts(selectedCategory);
    setCurrentIndex(0);
    flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
   
  }


  

  useEffect(()=>{
    getFeaturedPosts();
    getDashboardPosts();
    getLatestPosts()
  },[])


  
  
  const updateSelectedCategory = (newValue) =>{
    getFeaturedPosts(newValue);
    getDashboardPosts(newValue);
    getLatestPosts(newValue)
    setSelectedCategory(newValue)
  }
    

  const getFeaturedPosts = async(filter=selectedCategory)=>{
      console.log("entered get today posts api")
      let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getFeaturedPosts?"+filter)
      const postResponse = await response.json();
      
      console.log(postResponse)
  
      const filteredPosts = await filterPosts(postResponse)
      console.log(filteredPosts)
      setFeaturedPosts(filteredPosts);
      setFeaturedLoading(false);
    }

    const getDashboardPosts = async(filter=selectedCategory)=>{
      console.log("entered get today posts api")
      let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getDashboardPosts?"+filter)
      const postResponse = await response.json();
      
      console.log(postResponse)
  
      const filteredPosts = await filterPosts(postResponse)
      console.log(filteredPosts)
      setTopStories(filteredPosts);
      setTopStoriesLoading(false);

    }

    const getLatestPosts = async(filter=selectedCategory)=>{
      console.log("entered get today posts api")
      let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getLatestPosts?"+filter)
      const postResponse = await response.json();
      
      console.log(postResponse)
  
      const filteredPosts = await filterPosts(postResponse)
      console.log(filteredPosts)
      setLatestPosts(filteredPosts);
      setLatestLoading(false);
    }



  const renderCards = ({ item }) => (
      renderCard(navigation, item)
  );

  const renderLoadingComponent = () => (
    <View style={{width: windowWidth, height:150, paddingHorizontal: 10, paddingVertical: 20}} >
      <SkeletonLoader width={"80%"} height={25}></SkeletonLoader>
      <SkeletonLoader width={"60%"} height={25}></SkeletonLoader>
      <SkeletonLoader width={"40%"} height={25}></SkeletonLoader>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={{width: windowWidth, height:150, paddingHorizontal: 10, paddingVertical: 20}} >
      
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % topStories.length;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [topStories.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };


  return (
    <View style={{backgroundColor: Colors.secondary}}>
    <CategoryTabs selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}></CategoryTabs>
    <ScrollView style={styles.homeContainer} 
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
   <View style={styles.container}>
    <Text style={styles.title}>Top Stories</Text>
      <FlatList
        ref={flatListRef}
        data={topStories.length>0?topStories:[{}]}
        renderItem={topStories.length>0?renderCards: topStoriesLoading?renderLoadingComponent: renderEmptyComponent}
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
        {topStories.map((_, index) => (
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
        data={latestPosts.length>0?latestPosts:[{}]}
        renderItem={latestPosts.length>0?renderCards: latestLoading?renderLoadingComponent: renderEmptyComponent}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={true}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        // contentContainerStyle={{
        //   paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        // }}
        contentContainerStyle={{ marginLeft: -2 }}
        // viewabilityConfig={viewabilityConfig}
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
        data={featuredPosts.length>0?featuredPosts:[{}]}
        renderItem={featuredPosts.length>0?renderCards:featuredLoading?renderLoadingComponent:renderEmptyComponent}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{ marginLeft: -2 }} 
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.98, // 95% of screen width
    marginHorizontal: 5,
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
