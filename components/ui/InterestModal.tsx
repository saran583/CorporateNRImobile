import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { 
  Modal, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing 
} from "react-native";

const InterestModal = ({ visible, onClose, interestData }) => {
  const scaleAnim = new Animated.Value(0.8); // Animation for pop-up effect

  useEffect(() => {
    if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          {/* Header */}
          <Text style={styles.heading}>📩 {interestData.type ==="sent"? "Sent Interest":"Received Interest"}</Text>

          {/* User Details */}
          <View style={styles.detailsContainer}>
            <InfoRow label="👤 Name:" value={interestData.name} />
            <InfoRow label="📧 Email:" value={interestData.email} />
            <InfoRow label="📞 Contact:" value={interestData.contact} />
            <View style={styles.messageContainer}>
              <Text style={styles.label}>💬 Message:</Text>
              <Text style={styles.message}>{interestData.message}</Text>
            </View>
          </View>

          {/* Post Container */}
          <View style={styles.postContainer}>
            <Image source={require("../../assets/images/house2.jpg")} style={styles.postImage} />
            <Text style={styles.postTitle}>{interestData.postTitle}</Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Okay</Text>
          </TouchableOpacity>
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
});

export default InterestModal;
