import { StyleSheet, Image, Platform, View, FlatList } from 'react-native';
import CardLayout from '@/components/ui/CardLayout';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { Colors } from '@/constants/Colors';
import { filterPosts } from '@/components/Utils';

export default function TabTwoScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  
  const getLatestPosts = async()=>{
    console.log("entered get today posts api")
    let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getLatestPosts")
    const postResponse = await response.json();
    
    console.log(postResponse)

    const filteredPosts = await filterPosts(postResponse)
    console.log(filteredPosts)
    setPosts(filteredPosts);
    setLoading(false);
  }

  useEffect(()=>{
    getLatestPosts();
  },[])
  return loading ==true ? <View style={{backgroundColor: Colors.secondary, height: "100%", paddingBottom:10}}>

  <FlatList
        data={[1, 2, 3, 4, 5]} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
            <View style={styles.skeletonItem} >
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
    <CardLayout posts={posts} onRefreshCalled={getLatestPosts} />
  
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
