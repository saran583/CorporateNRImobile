import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Animated } from "react-native";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import MessagesScreen from "./MessagesComponent";



// const MessagesPage = () => {

//     const navigation = useNavigation()
//     const [selection, setSelection] = useState("")

//   return (
    // <View style={{backgroundColor:"#fff", minHeight: "100%"}}>
    //     <TouchableOpacity onPress={()=>{navigation.navigate("Messages",{selection:"Received"})}} style={{paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1 }}>
    //   <Text style={{fontSize: 16}}>Interestes Received</Text>
    // </TouchableOpacity>
    // <TouchableOpacity onPress={()=>{navigation.navigate("Messages",{selection:"Sent"})}} style={{paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1, borderTopWidth:0 }}>
    //   <Text style={{fontSize: 16}}>Interestes Sent</Text>
    // </TouchableOpacity>
    
    // </View>

    const MessagesPage = () => {
      const [activeTab, setActiveTab] = useState(0);
      const translateX = new Animated.Value(activeTab === 0 ? 0 : 1);
    
      const handleTabPress = (index) => {
        setActiveTab(index);
        Animated.timing(translateX, {
          toValue: index,
          duration: 300,
          useNativeDriver: false,
        }).start();
      };
    
      return (
        <View style={styles.container}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => handleTabPress(0)}>
              <Text style={[styles.tabText, {width:"100%", textAlign: 'center', marginLeft:10},activeTab === 0 && styles.activeTabText]}>  Received  </Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => handleTabPress(1)}>
              <Text style={[styles.tabText, {width:"100%", textAlign: 'center', marginRight:10}, activeTab === 1 && styles.activeTabText]}>      Sent    </Text>
            </TouchableOpacity>
            
          
           
          </View>
    
          {/* Animated Indicator */}
          <Animated.View 
            style={[
              styles.indicator, 
              { transform: [{ translateX: translateX.interpolate({
                  inputRange: [0, 1], 
                  outputRange: ['0%', '100%'] 
              }) }] }
            ]} 
          />
    
          {/* Tab Content */}
          <View style={styles.contentWrapper}>
            <MessagesScreen selection={activeTab === 0 ?"Received":"Sent"} ></MessagesScreen>
            {/* {activeTab === 0 ? <InterestsSent /> : <InterestsReceived />} */}
          </View>
        </View>
    //   );
    // };
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 5,
    height: "100%"
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: '20%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    padding: 10

  },
  activeTabText: {
    color: Colors.secondary,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    padding: 10
  },
  indicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 25,
    zIndex: -1,
  },
  contentWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 1,
    // height: '100%'
  },
  contentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

const styles1 = StyleSheet.create({
  container: { padding: 15, backgroundColor:Colors.secondary, minHeight:"100%" },
  messageContainer: {
    maxWidth: "80%",
    minWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
  },
  received: { alignSelf: "flex-start", backgroundColor: "#e6f7ff" },
  sent: { alignSelf: "flex-end", backgroundColor: "#d9fdd3" },
  name: { fontWeight: "bold", marginBottom: 5 },
  contact: { fontSize: 15, color: "gray", marginBottom: 8 },
  postContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 5, borderRadius: 10, borderColor: "grey" },
  postImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  postTitle: { fontSize: 15, fontWeight: "bold" },
});

export default MessagesPage;
