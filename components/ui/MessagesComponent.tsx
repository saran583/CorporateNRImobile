import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import InterestModal from "./InterestModal";
import { useSelector } from "react-redux";
import { formatTimestamp } from "../Utils";


const MessagesScreen = ({selection}) => {

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [interestData, setInterestData] = useState({})
    const userId = useSelector((state) => state.rental.userId);
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [messagesSent, setMessagesSent] = useState([]);


    useEffect(()=>{
      getInterests()
    },[])


    useEffect(()=>{
      console.log("updated messages",messagesReceived)
    },[messagesReceived])

  const getInterests= async ()=>{
    const res= await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getInterests?"+userId)
    const responses = await res.json()
    console.log("interest responses",responses)
    let received = []
    let sent = []
    // if(responses){
      responses.map((interest)=>{
        console.log("outside interest", interest)
        if(interest.sender_id==userId){
          console.log("inside interest", interest)
          sent.push({
              id: interest.id,
              listingId: interest.listing_id,
              senderId: interest.sender_id,
              hostId: interest.host_id,
              type: "sent",
              name: interest.first_name+" "+interest.last_name,
              contact: interest.mobile_number,
              email: interest.email,
              postTitle: interest.listing_title,
              postImage: interest.image_url.split(",")[0],
              message: interest.message,
              createdAt: interest.created_at,
              seen:1
          })
        }
        if(interest.host_id==userId){
          received.push({
              id: interest.id,
              type: "received",
              listingId: interest.listing_id,
              senderId: interest.sender_id,
              hostId: interest.host_id,
              name: interest.first_name+" "+interest.last_name,
              contact: interest.mobile_number,
              email: interest.email,
              postTitle: interest.listing_title || interest.listing_category + " items for Sale",
              postImage: interest.image_url.split(",")[0],
              message: interest.message,
              createdAt: interest.created_at,
              seen: interest.seen
          })
        }
      })
      console.log("received",received)
      setMessagesReceived([...received]);
      setMessagesSent([...sent])
  }

  const updateInterest = async(message) =>{
    if(message.type === "received"){
      const updatedMessages = messagesReceived.map((oldMessage)=>{
        if(oldMessage.id == message.id){
          return {...message, seen:1}

        }
        return oldMessage
      });
      setMessagesReceived(updatedMessages)
      const res= await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/updateInterest",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId: message.listingId,
          senderId: message.senderId,
          hostId: message.hostId
        })
      })
      const responses = await res.json()
      console.log(responses)

    }
  }

 
    


    const MessageCard = ({ message }) => {
        const isReceived = message.type === "received";
        return (
          <View style={[styles.messageContainer, isReceived ? styles.received : styles.sent]}>
            
          {/* <Text style={{fontWeight:"bold", textAlign:"center", marginBottom: 5, fontSize: 17}}>I am Interested</Text> */}
          <TouchableOpacity onPress={()=>{setInterestData(message); setModalVisible(true); updateInterest(message)}}>
            <View style={styles.dataContainer}>
            <View style={[styles.box, styles.box1]}>
            <Image source={{uri: message.postImage}} style={styles.profileImage} />
            </View>
            <View style={[styles.box, styles.box2]}>
            <View style={{flexDirection: 'row', width: "100%", overflow: "hidden", paddingRight: 5, justifyContent: "space-between"}}>
            <Text style={{...styles.name, width: "60%", overflow:"hidden", fontWeight: message.seen ==0 ? "bold": "normal"}} numberOfLines={1} ellipsizeMode="tail">{message.name}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">{formatTimestamp(message.createdAt)}</Text>
            </View>
            <View style={{flexDirection: 'row', width: "100%", overflow: "hidden", paddingRight: 5, justifyContent: "space-between"}}>
            <Text style={styles.contact} numberOfLines={3} ellipsizeMode="tail">{message.message}</Text>
            {message.seen ==0 && <Text style={{fontWeight:"bold"}}>New Message</Text>}
            </View>
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
