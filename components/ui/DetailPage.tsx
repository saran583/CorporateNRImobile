import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import SkeletonLoader from "./SkeletonLoader";
import { getDetails } from "../Utils";
import ImageModal from "../ImageModal";
import InterestModal from "../InterestModal";

const PropertyDetails = ({route}) => {
  console.log(route)
  let post = route.params
  const [postDetail, setPostDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [modalData,setModalData] = useState({product:{}, images:[]})
  const [showModal, setShowModal] = useState(false)
  const [showInterestModal, setShowInterestModal] = useState(false)

  const getPost = async () =>{
    let response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getListings?"+post.id)
    const postResponse = await response.json();
    console.log("response",postResponse)
    setPostDetail(postResponse[0]);
    setLoading(false)
  }



  const [mainImage, setMainImage] = useState(post.images[0]);

  useEffect(()=>{
    getPost();
  },[])

  const onShowModal = ({product,images}) =>{
    setModalData({product:product, images:images})
    setShowModal(true)

  }

  const CardData =(postDetail,index)=>{
    let imageUrl = []
    post.images.map((image,i)=>{
      if(image.indexOf(encodeURIComponent(postDetail.name))>0){
        imageUrl.push(image)
      }
      return image
    })
    return  <TouchableOpacity key={index}  onPress={()=>{onShowModal({product:postDetail, images:imageUrl})}}>
    <View style={styles.card} key={index}>
    <View style={styles.textContainer}>
      <Text style={styles.utility_title}>Item Name: {postDetail.name}</Text>
      <Text style={styles.description}>Price: {postDetail.price}</Text>
      <Text style={styles.description}>Link: {postDetail.storeLink}</Text>
    </View>

    <Image source={{ uri: imageUrl[0] }} style={styles.image} resizeMode="contain" />
  </View>
  </TouchableOpacity>
  }

  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      <Image source={{uri: mainImage}} style={styles.mainImage} />

      {/* Horizontal ScrollView for Thumbnails */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {post.images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setMainImage(img)}>
            <Image source={{uri:img}} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showModal&& <ImageModal  onClose={()=>{setShowModal(false);}} images={modalData.images} product={modalData.product}></ImageModal>}
      {showInterestModal&&<InterestModal postDetail={{listingId: postDetail.id, hostId: postDetail.created_by}} onClose={()=>{setShowInterestModal(false)}} ></InterestModal>}

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.location}>{post.location+","+postDetail.city?postDetail.city:""}</Text>

        {/* Property Info */}
        {loading?<SkeletonLoader width={"100%"} height={500}></SkeletonLoader>:<View style={styles.infoContainer}>
          {Object.entries(getDetails(postDetail)).map(([key,value],index)=>{
            return <InfoItem key={index}  label={key} value={value} />
          })}
        </View>}

        {/* Amenities */}
        
        {postDetail.category_id && postDetail.category_id==1&&<>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {postDetail.amenities.split(",").map((amenity, index) => (
            <Text key={index} style={styles.amenity}>{amenity}</Text>
          ))}
        </View>
        </>}

        {!loading && postDetail.category_id==2 && postDetail.utility_items && 
        <>
        <Text style={styles.sectionTitle}>Utility Items</Text>
        {JSON.parse(postDetail.utility_items.replace(/\\"/g, '"')).map((post,index)=>{
          return CardData(post,index) 
        })}
        </>
        }

      </View>
      <TouchableOpacity style={styles.submitButton} onPress={()=>{setShowInterestModal(true)}}>
        <Text style={styles.submitButtonText}>Interested</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Reusable Component for Property Info
const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  mainImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  imageScroll: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    flexShrink: 1,
    textAlign: "right"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  amenity: {
    backgroundColor: "#E0F7FA",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
    color: "#00796B",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    height: 39,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    width: '50%',
    marginHorizontal: 'auto'
  },


  card: {
    flexDirection: "row", // Arrange content in a row (text left, image right)
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    alignItems: "center", // Align items vertically
  },
  textContainer: {
    flex: 1, // Takes remaining space
    paddingRight: 10, // Add spacing between text and image
  },
  utility_title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  image: {
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    borderRadius: 10,
  },
});

export default PropertyDetails;
