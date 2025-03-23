import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { 
  Modal, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing, 
  TextInput,
  Platform,
  ToastAndroid,
  AlertIOS
} from "react-native";
import { useSelector } from "react-redux";

const InterestModal = ({ onClose, postDetail }) => {
  const scaleAnim = new Animated.Value(0.8); 
  const userId = useSelector((state) => state.rental.userId);



   const [formData, setFormData] = useState({
          name: "",
          mobile: "",
          message: "",
          company: ""
      });
  
      const handleChange = (key, value) => {
          setFormData({ ...formData, [key]: value });
      };
  
      const handleSend = async () => {
          if (!formData.name || !formData.mobile ) {
              alert("Please fill in all fields!");
              return;
          }
          const response = await fetch('https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/sendInterest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({listingId:postDetail.listingId, hostId:postDetail.hostId, senderId:userId, message:formData.message, companyName: formData.company}),
          });
    
          const data = await response.json();
          console.log(data)
           if (Platform.OS === 'android') {
                    ToastAndroid.show("Interest Sent Successfully", ToastAndroid.SHORT)
                  } else {
                    AlertIOS.alert("Interest Sent Successfully");
                  }
          console.log({listingId:postDetail.listingId, hostId:postDetail.hostId, senderId:userId, message:formData.message, companyName: formData.company})
          // onSend(formData);
          setFormData({ name: "", mobile: "", message: "", company: "" }); // Reset fields
          onClose(); // Close modal after sending
      };

  useEffect(() => {
    // if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    // }
  }, []);


  const getUserDetails = async () => {
    const res = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getUser?"+userId);
    const userDetails = await res.json()
    console.log("userDetails", userDetails)
    setFormData({
        name: userDetails.first_name+" "+userDetails.last_name,
        mobile: userDetails.mobile_number,
        message: "",
        company: userDetails.companyName
    })
  }

  useEffect(()=>{
    getUserDetails()
  },[])



  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          {/* Header */}
          <Text style={styles.heading}>📩 Send Interest</Text>

          {/* User Details */}
          <View style={styles.detailsContainer}>
            <TextInput
                                    style={{...styles.input, backgroundColor: "rgba(211, 211, 211, 0.2)" }}
                                    placeholder="Name"
                                    value={formData.name}
                                    editable={false}
                                    onChangeText={(text) => handleChange("name", text)}
                                />
            
                                <TextInput
                                    style={{...styles.input, backgroundColor: "rgba(211, 211, 211, 0.2)" }}
                                    placeholder="Mobile"
                                    keyboardType="phone-pad"
                                    value={formData.mobile}
                                    editable={false}
                                    onChangeText={(text) => handleChange("mobile", text)}
                                />

                                <TextInput
                                    style={{...styles.input, backgroundColor: "rgba(211, 211, 211, 0.2)" }}
                                    placeholder="Company"
                                    value={formData.company}
                                    editable={false}
                                    onChangeText={(text) => handleChange("company", text)}
                                />
            
                                <TextInput
                                    style={{...styles.input, height:120}}
                                    placeholder="Message"
                                    multiline
                                    value={formData.message}
                                    onChangeText={(text) => handleChange("message", text)}
                                />
            
                               
            
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={handleSend}>
                                        <Text style={styles.buttonText}>Send</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for contrast
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff", // Solid background
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
  },
  detailsContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    textAlign: "right"
  },
  messageContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  message: {
    fontSize: 15,
    color: "#333",
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: "40%",
    marginHorizontal: "auto"
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  openButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  valueContainer: {
    flex: 1, // Ensure it takes available space
    minWidth: 0, // Prevent overflow issues
  },




  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
},
buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
},
button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
},
closeButton1: {
    backgroundColor: "red",
},
buttonText: {
    color: "white",
    fontWeight: "bold",
}
});

export default InterestModal;
