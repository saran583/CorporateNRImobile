import { StyleSheet, Image, Platform, FlatList, View, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CardLayout from '@/components/ui/CardLayout';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Colors } from '@/constants/Colors';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function TabFourScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  
  const getTodayPosts = async()=>{
    let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getTodayPosts")
    const postResponse = await response.json();
    
    console.log(postResponse)

    let res = postResponse.map((post)=>{
      // if(post.category_id==1){
        return {
          id: post.id,
          title: post.title,
          price: post.listing_category === "Sale"? post.sale_price : post.monthly_rent,
          location: post.location,
          postedBy: post.first_name+" "+post.last_name,
          amenities: post.amenities.split(","),
          createdAt: post.created_at,
          images: post.image_url.split(","),
          listingCategory: post.listing_category
        }
      // }
      // else if(post.category_id==2){

      // }
      // else if(post.category_id==3){}
    
    })
    console.log(res)
    setPosts(res);
    console.log("res", res)
    setLoading(false);
  }

  useEffect(()=>{
    getTodayPosts();
  },[])

  useEffect(()=>{
    console.log("Loading updated",loading)
  },[loading])

  useEffect(()=>{
    console.log("Loading updated",loading)
  },[posts])



  return loading ==true ? <View style={{backgroundColor: Colors.secondary, height: "100%", paddingBottom:10}}>
  
  <TouchableOpacity onPress={getTodayPosts}><View >call api</View></TouchableOpacity>
  <FlatList
        data={[1, 2, 3, 4, 5]} // Placeholder items
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
            <View style={styles.skeletonItem}>
              <View style={styles.skeletonTextContainer}>
              <SkeletonLoader width={"80%"} height={20} />

                <SkeletonLoader width={"60%"} height={20} />

                <SkeletonLoader width={"45%"} height={20} />
              </View>
              <SkeletonLoader width={80} height={80} />
            </View>
        )}
      />
  </View>:
    <CardLayout posts={posts} navigation={navigation} />
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

  skeletonItem: { flexDirection: "row", padding: 10, marginRight: 10 },
  skeletonImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#ddd", marginRight:10 },
  skeletonTextContainer: { flex: 1, marginLeft: 10 },
  skeletonText: { width: "80%", height: 20, borderRadius: 4, backgroundColor: "#ddd" },
  skeletonTextShort: { width: "60%", height: 20, borderRadius: 4, marginTop: 5, backgroundColor: "#ddd" },
  skeletonTextSuperShort: { width: "45%", height: 20, borderRadius: 4, marginTop: 5, backgroundColor: "#ddd" },
});
