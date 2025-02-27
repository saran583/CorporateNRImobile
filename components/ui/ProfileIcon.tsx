import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProfileIcon = ({ name, size = 50, backgroundColor = "#0078D4", textColor = "#FFFFFF" }) => {
  const navigation = useNavigation();
  // Extract initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.slice(0, 2).join(""); // Limit to two initials
  };

  const initials = getInitials(name);

  return (
    <TouchableOpacity onPress={()=>{ navigation.navigate("Profile")}}>
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor, fontSize: size / 2.5 }]}>
        {initials}
      </Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    marginRight: 10
  },
  text: {
    fontWeight: "bold",
  },
});

export default ProfileIcon;
