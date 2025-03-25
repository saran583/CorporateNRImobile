import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Modal, Image, TouchableOpacity, Linking, StyleSheet, Dimensions, Platform, ToastAndroid, AlertIOS  } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const { width } = Dimensions.get("window");

const ImageModal = ({ onClose, images, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("product>>>>", product)
  

  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show("Link not valid", ToastAndroid.SHORT)
        } else {
          AlertIOS.alert("Link not valid");
        }
      console.log("Cannot open URL: " + url);
    }
  };

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Product Details */}
          <Text style={{...styles.name, textAlign:"left", width:"100%"}}>Name: {product.name}</Text>
          <Text style={{...styles.price, textAlign:"left", width:"100%"}}>Price: {product.price}</Text>
          <Text style={{...styles.status, textAlign:"left", width:"100%"}}>Availability: {product.availabilityStatus && product.availabilityStatus}</Text>
          <TouchableOpacity onPress={() => handlePress(product.storeLink)}>
            <Text style={styles.storeLink}>Store Link</Text>
          </TouchableOpacity>

          {/* Image Slider */}
          <View style={styles.carouselContainer}>
            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
              style={styles.arrowLeft}
            >
             <Icon name="chevron-left" size={50}  style={[styles.arrowText,styles.arrowLeft]} color={currentIndex==0?"lightgrey":Colors.primary}/>
            </TouchableOpacity>
            <Image source={{ uri: images[currentIndex] }} style={styles.image} resizeMode="contain" />
            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev))}
              style={styles.arrowRight}
            >
              {/* <Text style={styles.arrowText}>{">"}</Text> */}
              <Icon name="chevron-right" size={50}  style={[styles.arrowText,styles.arrowRight]} color={currentIndex==images.length-1?"lightgrey":Colors.primary}/>
            </TouchableOpacity>
          </View>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "90%", alignItems: "center" },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 16, color: "green", marginBottom: 5 },
  status: { fontSize: 16, color: "gray", marginBottom: 5 },
  storeLink: { fontSize: 16, color: "blue", textDecorationLine: "underline", marginBottom: 15 },
  carouselContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  image: { width: width * 0.8, height: 300, borderRadius: 10 },
  arrowLeft: { position: "absolute", left: -18, zIndex: 1 },
  arrowRight: { position: "absolute", right: -18, zIndex: 1 },
  arrowText: { fontSize: 50, fontWeight: "bold" },
  closeButton: { marginTop: 20, backgroundColor: "red", padding: 10, borderRadius: 5 },
  closeButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ImageModal;
