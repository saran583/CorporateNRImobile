
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { formatTimestamp } from '../Utils';


const renderCard = (navigation, post, width=Dimensions.get('window').width * 0.90) => {

    
  return <TouchableOpacity key={post.index} onPress={()=>{ 
      navigation.navigate("DetailPage",post)}}>
    <View style={[styles.card, {width: width}]} >
    <View style={styles.content}>
    <View style={styles1.cardHeader}>
    <Icon name="home" size={45} color={Colors.primary}
          // style={styles1.avatar}
        />
        <View>
        <Text style={styles.title}  numberOfLines={1} ellipsizeMode="tail">{post?.title}</Text>
        <Text style={styles.status}>
        <Text style={{ color: 'green' }}>{post?.price}</Text>  |   <Text style={{ color: "blue"}}>{post?.location}</Text>
      </Text>
      </View>
      </View>
      
      {post.category !==3 ? <View style={styles1.features}>
       {post?.amenities?.slice(0,3).map((feature, index) => (
          <Text key={index} style={styles1.featureBadge} numberOfLines={1} ellipsizeMode="tail">{feature}</Text>
        ))}
        {post?.amenities?.length>3&&<Text key={4} style={styles1.featureBadge} numberOfLines={1} ellipsizeMode="tail">+{post?.amenities.length-3}</Text>}
      </View> : <Text style={{...styles1.featureBadge, backgroundColor: "#fff"}} > </Text>}
      <View style={styles1.footer}>
  
  {/* {post.location!=="search" && <> */}
  <Text style={styles1.time}>posted by: {post?.postedBy}</Text>
  <Text style={styles1.time}>{formatTimestamp(post?.createdAt)}</Text>
  {/* </>} */}
</View>
    </View>
    

    {/* Image Section */}
    <View>
    <Image
      source={{uri:post?.images[0]}} 
      style={styles.image}
    />
    <Text style={{padding:5,backgroundColor:Colors.primary, color:Colors.secondary, borderRadius:5, marginTop:8, textAlign: 'center'}}>Interest</Text>
    </View>
  </View>
  </TouchableOpacity>

  };





  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 1,
      margin: 5,
      marginVertical: 2
      // width:width
    },
    content: {
      flex: 3, // Allocate more space for text content
      paddingRight: 10, // Add spacing between text and image
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    rating: {
      color: '#555',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      color: '#666',
      marginBottom: 4,
    },
    status: {
      fontSize: 15,
      color: '#444',
      marginVertical: 5,
    },
    delivery: {
      fontSize: 12,
      color: '#888',
      marginTop: 4,
    },
    image: {
      flex: 1, // Allocate less space for the image
      height: '60%', // Image height is 75% of the card's height
      width: 75,
      overflow: 'hidden',
      resizeMode: 'cover',
      borderRadius: 8,
    },
  });


  const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      paddingHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#333',
    },
    card: {
      // width: width, // 70% of screen width
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      paddingBottom:5,
      marginVertical: 5,
      marginHorizontal: 10,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom: 10,
    },
    avatar: {
      width: 30,
      height: 30,
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
      marginVertical: 0,
    },
    features: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 5,
    },
    featureBadge: {
      backgroundColor: Colors.secondary,
      color: Colors.primary,
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
      marginTop: 0,
      marginBottom: 0
    },
    price: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#28a745',
    },
    time: {
      fontSize: 12,
      color: '#aaa',
    },
  });
  
  export default renderCard;