import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, CheckBox, Switch, Modal, FlatList, Alert  } from "react-native";

const OtherRentalForm = () => {
    const [form, setForm] = useState({
      title: "",
      details: "",
      keyDates: new Date(),
      additionalDetails: "",
      category: ""
    });
  
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [isFromDateVisible, setIsFromDateVisible] = useState(false);

    const [image, setImage] = useState(null);
    
    const categories = ["Travel Companion", "Cars", "Medical Support", "Community", "Vouchers or Offers", "Others"];
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ['images'],
  //     allowsMultipleSelection: true,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
      
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setPictures(result.assets);
  //   } 
  // };

  const pickImage = async () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery }
    ],{cancelable: true});
  };

  // Function to open the camera
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPictures([...pictures, result.assets[0]]);
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
          setPictures(result.assets);
        }
  };



  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    console.log("values",field, value)
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "additionalDetails" && form[key].toString().trim() === "") {
        console.log("error", key)
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", form);
    }
  };
  
    return (
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        value={form.title}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholder="Enter title"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <Text style={styles.label}>Category</Text>
      <TouchableOpacity style={[styles.input, errors.category && styles.errorInput]} onPress={() => setModalVisible(true)}>
        <Text style={form.category ? styles.textSelected : styles.textPlaceholder}>
          {form.category || "Select Category"}
        </Text>
      </TouchableOpacity>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      


      <Text style={styles.label}>Key Date</Text>
      <>
              <TouchableOpacity
              onPress={() => setIsFromDateVisible(true)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                backgroundColor: "#fff"
              }}
            >
              <Text>{form.keyDates.toDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isFromDateVisible}
              mode="date"
              onConfirm={(selectedDate) => {
                setIsFromDateVisible(false);
                handleInputChange("keyDates", selectedDate)
              }}
              onCancel={() => setIsFromDateVisible(false)}
            />
              </>


{/* <View style={styles.rowItem}> */}
      
      {/* </View> */}

      {/* Modal for Dropdown */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleInputChange("category", item)
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Details</Text>
      <TextInput
        style={[[styles.input, styles.textarea], errors.details && styles.errorInput]}
        value={form.details}
        onChangeText={(text) => handleInputChange("subject", text)}
        placeholder="Enter Details"
        multiline
      />
      {errors.details && <Text style={styles.errorText}>{errors.details}</Text>}

      <Text style={styles.label}>Additional Information</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={form.additionalDetails}
        onChangeText={(text) => handleInputChange("additionalDetails", text)}
        placeholder="Enter additional information"
        multiline
      />

      <View style={{flex:1, flexDirection: "row"}}>
        <Text style={{...styles.label, paddingTop:5, marginBottom: 0}}>Upload Pictures:</Text>
        <TouchableOpacity onPress={pickImage} style={{...styles.button,height: 34, marginTop:0, marginLeft: 'auto'}}>
          <Text style={styles.buttonText}>Choose Images</Text>
        </TouchableOpacity>
      </View>
        {/* Display Selected Images */}
        <FlatList
          horizontal
          data={pictures}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Image source={{ uri: item.uri }} placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000} style={styles.image} />}
        />


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: Colors.secondary,
      minHeight: "100%"
    },
    scrollContainer:{
        padding: 16
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#fff",
      backgroundColor: Colors.primary,
      padding: 16,
      paddingBottom: 10,
      paddingTop: 20
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#555",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
      backgroundColor: "#f9f9f9",
    },
    textarea: {
      height: 100,
      textAlignVertical: "top",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    rowItem: {
      flex: 0.48,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: "#555",
    },
    submitButton: {
      backgroundColor: Colors.primary,
      padding: 5,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
      height: 39,
      width: "40%",
      marginHorizontal: "auto"
      
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      },
      switchLabel: {
        fontSize: 16,
        color: "#555",
      },
    submitButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    screenText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    errorInput: {
        borderColor: "#ff0000",
      },
      errorText: {
        color: "#ff0000",
        marginBottom: 16,
        fontSize: 14,
      },
      textPlaceholder: {
        color: "#aaa",
      },
      textSelected: {
        color: "#000",
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
      },
      item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      },
      itemText: {
        fontSize: 16,
      },
      closeButton: {
        padding: 15,
        alignItems: "center",
      },
      closeButtonText: {
        color: "red",
        fontSize: 16,
      },
      button: {backgroundColor: Colors.primary, padding: 5, borderRadius: 5, marginTop: 10  },
  addButton: { backgroundColor: "green" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold", fontSize:16 },
  image: { width: 60, height: 60, marginHorizontal: 5 },
  images: {
    flex: 1,
    width: 60,
    height: 60,
    margin: "auto",
  },
  });
  

export default OtherRentalForm;
