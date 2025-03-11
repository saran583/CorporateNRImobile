import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import SkeletonLoader from "./SkeletonLoader";

const PropertyDetails = ({route}) => {
  console.log(route)
  let post = route.params
  const [postDetail, setPostDetail] = useState({})
  const [loading, setLoading] = useState(true)

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

  const propertyDetails = {
    title: "Luxury 2BHK Apartmentsdfg",
    location: "Downtown, New York",
    category: "Rental",
    price: "$2500/month",
    bedrooms: 2,
    bathrooms: 2,
    size: "1200 Sq.ft",
    deposit: "$5000",
    availableFrom: "March 1, 2025",
    rentalDuration: "1 Year Lease",
    rentalType: "Fully Furnished",
    petAllowed: "Yes",
    smokingAllowed: "No",
    foodPreference: "Vegetarian Preferred",
    parking: "Available",
    groceries: "500m",
    busConnectivity: "100m",
    corporateHubs: "1km",
    preferredGender: "Any",
    amenities: ["Gym", "Swimming Pool", "24/7 Security", "Wi-Fi", "Power Backup"],
  };

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

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.location}>{post.location+","+postDetail.city}</Text>

        {/* Property Info */}
        {loading?<SkeletonLoader width={"100%"} height={500}></SkeletonLoader>:<View style={styles.infoContainer}>
          <InfoItem label="Category" value={post.listingCategory} />
          <InfoItem label="Price" value={post.listingCategory==="Sale"?post.price:post.price+"/monthly"} />
          {postDetail.listing_category==="Sale"&&<InfoItem label="Advance" value={postDetail.advance} />}
          <InfoItem label="Pincode" value={postDetail.pincode} />
          <InfoItem label="Bedrooms" value={postDetail.bedrooms} />
          <InfoItem label="Bathrooms" value={postDetail.bathrooms} />
          <InfoItem label="Size" value={postDetail.square_feet} />
          <InfoItem label="Deposit" value={postDetail.deposit} />
          <InfoItem label="Available From" value={postDetail.available_from} />
          {postDetail.listing_category==="Rent"&&<InfoItem label="Rental Duration" value={postDetail.rental_duration} />}
          {postDetail.listing_category==="Rent"&&<InfoItem label="Rental Type" value={postDetail.rental_type} />}
          <InfoItem label="Pet Allowed?" value={postDetail.pets_allowed==1?"Yes":"No"} />
          <InfoItem label="Smoking Allowed?" value={postDetail.smoking_allowed==1?"Yes":"No"} />
          {postDetail.listing_category==="Rent"&&<InfoItem label="Food Preference" value={postDetail.food_preference} />}
          <InfoItem label="Parking" value={postDetail.is_parking_available==1?"Yes":"No"} />
          <InfoItem label="Nearby Groceries" value={postDetail.nearby_groceries} />
          <InfoItem label="Bus Connectivity" value={postDetail.bus_connectivity} />
          {postDetail.listing_category==="Rent"&&<InfoItem label="Preferred Gender" value={postDetail.preferred_gender} />}
          <InfoItem label="Additional Details" value={postDetail.additional_detail+" "+postDetail.additional_detail+" "+postDetail.additional_detail+" "+postDetail.additional_detail+" "+postDetail.additional_detail} />
        </View>}

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {post.amenities.map((amenity, index) => (
            <Text key={index} style={styles.amenity}>{amenity}</Text>
          ))}
        </View>

      </View>
      <TouchableOpacity style={styles.submitButton}>
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
});

export default PropertyDetails;
