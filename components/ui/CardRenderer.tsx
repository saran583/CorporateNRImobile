
import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const renderCard = (navigation, title, price, location, features, width=Dimensions.get('window').width * 0.85) => (
    // <View style={[styles.card, {width: width}]} 
    // // onPress={()=>{
    // //   const navigation = useNavigation;
    // //   navigation.navigate("RentalDetails", {
    // //     car: {
    // //       name: "Aston Martin 2024",
    // //       model: "DB12",
    // //       price: 330000,
    // //       location: "Texas, Washington",
    // //       description: "This two-seater car has a 4.0L V8 or 5.2L V12 petrol engine, and is available with automatic or manual transmission. It has a ground clearance of 120mm and a length of 4800 mm with a 2.83 m3 boot space.",
    // //       year: 2024
    // //     }
    // //   });
    // // }}
    // >
    //   <View style={styles.cardHeader}>
    //     <Image
    //       source={{ uri: 'https://via.placeholder.com/50' }}
    //       style={styles.avatar}
    //     />
    //     <Text style={styles.title}>{title}</Text>
    //   </View>
    //   <Text style={styles.description}>
    //     Enjoy the convenience of a clubhouse, kids play area, and maintenance staff
    //   </Text>
    //   <View style={{display: "flex", flexDirection:"row", width:"100%", justifyContent: "space-between"}}>
    //   <TouchableOpacity>
    //     <Text style={styles.location}>{location}</Text>
    //   </TouchableOpacity>
    //   <Text style={styles.price}>${price}</Text>
    //   </View>
    //   <View style={styles.features}>
    //     {features.map((feature, index) => (
    //       <Text key={index} style={styles.featureBadge}>{feature}</Text>
    //     ))}
    //   </View>
    //   <View style={styles.footer}>
    //   <Text style={styles.time}>Posted By: John Doe</Text>
    //     <Text style={styles.time}>15 minutes ago</Text>
    //   </View>
    // </View>
    <TouchableOpacity onPress={()=>{ 
      navigation.navigate("DetailPage",{name:"test",age:25})}}>
    <View style={[styles.card, {width: width}]} >
    {/* Content Section */}
    <View style={styles.content}>
    <View style={styles1.cardHeader}>
    <Icon name="home" size={45} color={Colors.primary}
          // style={styles1.avatar}
        />
        <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>
        <Text style={{ color: 'green' }}>$ {price}</Text>  |   <Text style={{ color: "blue"}}>Texas, USA</Text>
      </Text>
      </View>
      </View>
      
      <View style={styles1.features}>
       {features.map((feature, index) => (
          <Text key={index} style={styles1.featureBadge}>{feature}</Text>
        ))}
      </View>
      <View style={styles1.footer}>
  <Text style={styles1.time}>Posted By: John Doe</Text>
  <Text style={styles1.time}>15 minutes ago</Text>
</View>
    </View>
    

    {/* Image Section */}
    <View>
    <Image
      source={{uri:'data:image/jpeg;base64,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'}} // Replace with your image URI
      style={styles.image}
    />
    <Text style={{padding:5,backgroundColor:Colors.primary, color:Colors.secondary, borderRadius:5, marginTop:8, textAlign: 'center'}}>Interest</Text>
    </View>
  </View>
  </TouchableOpacity>

  );





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
      margin: 10,
      marginVertical: 5
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