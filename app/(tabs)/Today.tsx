import { StyleSheet, Image, Platform, FlatList, View, TouchableOpacity, Text } from 'react-native';
import CardLayout from '@/components/ui/CardLayout';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { filterPosts } from '@/components/Utils';
import CategoryTabs from '@/components/ui/FilterTab';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TabFourScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [showDatePicker,setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);



  
    const updateSelectedCategory = (newValue) =>{
      getTodayPosts(newValue, selectedDate)
      setSelectedCategory(newValue)
    }

  
  const getTodayPosts = async(filter=selectedCategory, date=selectedDate)=>{
    console.log("entered get today posts api", date)
    let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getTodayPosts",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date.toISOString(), filter: filter  }),
    })
    const postResponse = await response.json();
    
    console.log(postResponse)

    const filteredPosts = await filterPosts(postResponse)
    console.log(filteredPosts)
    setPosts(filteredPosts);
    setLoading(false);
  }

  useEffect(()=>{
    getTodayPosts(selectedCategory, new Date());
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
      
  </View>:<View style={{backgroundColor:Colors.secondary}}>
    <CategoryTabs selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}></CategoryTabs>
    <View style={{flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 20}}>
    <Text style={{marginVertical:"auto"}}>Filter by Date</Text>
    <TouchableOpacity onPress={()=>{setShowDatePicker(true)}}><Icon size={35} name="edit-calendar" ></Icon></TouchableOpacity>
    </View>
    <CardLayout posts={posts} onRefreshCalled={getTodayPosts}   />
    <Modal transparent visible={showDatePicker} animationType="slide">
            <View style={styles.modalContainer}>
                <DateTimePicker
                value={selectedDate}
                minimumDate={minDate}
                maximumDate={new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => { setShowDatePicker(false); getTodayPosts(selectedCategory, selectedDate) }}
                />
            </View>
          </Modal>
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  skeletonItem: { flexDirection: "row", padding: 10, marginRight: 10 },
  skeletonImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#ddd", marginRight:10 },
  skeletonTextContainer: { flex: 1, marginLeft: 10 },
  skeletonText: { width: "80%", height: 20, borderRadius: 4, backgroundColor: "#ddd" },
  skeletonTextShort: { width: "60%", height: 20, borderRadius: 4, marginTop: 5, backgroundColor: "#ddd" },
  skeletonTextSuperShort: { width: "45%", height: 20, borderRadius: 4, marginTop: 5, backgroundColor: "#ddd" },
});
