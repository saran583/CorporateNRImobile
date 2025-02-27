import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const PropertyDetails = ({route}) => {
  console.log(route)
  const images = {
    0:require("../../assets/images/house.jpg"),1:require("../../assets/images/house2.jpg"),2:require("../../assets/images/house3.jpg"),3:require("../../assets/images/house4.jpg"),4:require("../../assets/images/house5.jpg")
  };

  const [mainImage, setMainImage] = useState(images[0]);

  const propertyDetails = {
    title: "Luxury 2BHK Apartment",
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
      <Image source={mainImage} style={styles.mainImage} />

      {/* Horizontal ScrollView for Thumbnails */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {Object.keys(images).map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setMainImage(images[index])}>
            <Image source={images[index]} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{propertyDetails.title}</Text>
        <Text style={styles.location}>{propertyDetails.location}</Text>

        {/* Property Info */}
        <View style={styles.infoContainer}>
          <InfoItem label="Category" value={propertyDetails.category} />
          <InfoItem label="Price" value={propertyDetails.price} />
          <InfoItem label="Bedrooms" value={propertyDetails.bedrooms} />
          <InfoItem label="Bathrooms" value={propertyDetails.bathrooms} />
          <InfoItem label="Size" value={propertyDetails.size} />
          <InfoItem label="Deposit" value={propertyDetails.deposit} />
          <InfoItem label="Available From" value={propertyDetails.availableFrom} />
          <InfoItem label="Rental Duration" value={propertyDetails.rentalDuration} />
          <InfoItem label="Rental Type" value={propertyDetails.rentalType} />
          <InfoItem label="Pet Allowed?" value={propertyDetails.petAllowed} />
          <InfoItem label="Smoking Allowed?" value={propertyDetails.smokingAllowed} />
          <InfoItem label="Food Preference" value={propertyDetails.foodPreference} />
          <InfoItem label="Parking" value={propertyDetails.parking} />
          <InfoItem label="Nearby Groceries" value={propertyDetails.groceries} />
          <InfoItem label="Bus Connectivity" value={propertyDetails.busConnectivity} />
          <InfoItem label="Corporate Hubs" value={propertyDetails.corporateHubs} />
          <InfoItem label="Preferred Gender" value={propertyDetails.preferredGender} />
        </View>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {propertyDetails.amenities.map((amenity, index) => (
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
