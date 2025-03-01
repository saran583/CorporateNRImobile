import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import InterestModal from "./InterestModal";

const messagesReceived = [
  {
    id: "1",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"
  },
  {
    id: "2",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "3",
    type: "received",
    name: "John DoeJohn DoeJohn DoeJohn Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "4",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "5",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "6",
    type: "received",
    name: "John DoeJohn DoeJohn DoeJohn Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "7",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
 
];

const messagesSent = [
  {
    id: "1",
    type: "sent",
    name: "You",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "2",
    type: "sent",
    name: "You",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
  {
    id: "3",
    type: "sent",
    name: "You",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
    message:"I am interested in your property, Can you give me call to discuss on the price and other detials"

  },
]



const MessagesScreen = ({selection}) => {

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [interestData, setInterestData] = useState({})
  // const selection= route.params.selection
    


    const MessageCard = ({ message }) => {
        const isReceived = message.type === "received";
      
        return (
          <View style={[styles.messageContainer, isReceived ? styles.received : styles.sent]}>
            
          {/* <Text style={{fontWeight:"bold", textAlign:"center", marginBottom: 5, fontSize: 17}}>I am Interested</Text> */}
          <TouchableOpacity onPress={()=>{setInterestData(message); setModalVisible(true)}}>
            <View style={styles.dataContainer}>
            <View style={[styles.box, styles.box1]}>
            <Image source={require("../../assets/images/favicon.png")} style={styles.profileImage} />
            </View>
            <View style={[styles.box, styles.box2]}>
            <View style={{flexDirection: 'row', width: "100%", overflow: "hidden", paddingRight: 5, justifyContent: "space-between"}}>
            <Text style={{...styles.name, width: "60%", overflow:"hidden"}} numberOfLines={1} ellipsizeMode="tail">{message.name}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">10 mins Ago...</Text>
            </View>
            <Text style={styles.contact} numberOfLines={3} ellipsizeMode="tail">{message.message}</Text>
            {/* <Text style={styles.contact}>{message.contact}</Text> */}
            </View>
            {/* <TouchableOpacity onPress={()=>{navigation.navigate("DetailPage")}}>
              <View style={[styles.box, styles.box3]}>
                  <Image source={require("../../assets/images/house.jpg")} style={styles.postImage} />
                  <Text style={styles.postTitle}  numberOfLines={1} ellipsizeMode="tail">{message.postTitle}</Text>
              </View>
            </TouchableOpacity> */}
            </View>
            </TouchableOpacity>
          {/* <Text style={{ textAlign:"center", marginBottom: 0, fontSize: 13}}>Sent 10 mins ago...</Text> */}
          </View>
        );
      };


  return (
    <>
    <InterestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        interestData={interestData}
      />
    {selection.length>0 && <FlatList
      data={selection==='Received'?messagesReceived:messagesSent}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageCard message={item} />}
      contentContainerStyle={styles.container}
    />}
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, paddingHorizontal:1, backgroundColor:Colors.secondary, minHeight:"100%" },
  messageContainer: {
    maxWidth: "100%",
    minWidth: "100%",
    padding: 10,
    paddingVertical:8,
    borderRadius: 5,
    marginBottom: 2,
    backgroundColor: "#f1f1f1"
  },
  received: { backgroundColor: "#fff" },
  sent: { alignSelf: "flex-end", backgroundColor: "#d9fdd3" },
  name: { fontWeight: "bold",  textAlign:"left" },
  contact: { fontSize: 15, color: "gray", marginBottom: 8 },
  postContainer: {  borderWidth: 1, padding: 5, borderRadius: 10, borderColor: "grey", },
  postImage: { width: 75, height: 50, borderRadius: 5},
  profileImage: { width: 50, height: 50, borderRadius: 100},
  postTitle: { fontSize: 15, fontWeight: "bold", textAlign: "center", width: Dimensions.get("window").width * 0.20 },


  dataContainer: {
    flexDirection: "row",
    width: "100%",
    height: 80, // Adjust height as needed
  },
  box: {
    justifyContent: "center",
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: "black",
  },
  box1: {
    flex: 1, // 10% of total 10+30+50 = 10%
    // backgroundColor: "red",
  },
  box2: {
    textAlign:"left",
    flex: 4.5, // 30% of total 10+30+50 = 30%
    // backgroundColor: "blue",
  },
  box3: {
    flex: 3, // 50% of total 10+30+50 = 50%
    // backgroundColor: "green",
    paddingTop:25
  },
});

export default MessagesScreen;
