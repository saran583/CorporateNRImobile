import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // Using built-in icon libraries

const categories = [
    { id: "1", name: "All", icon: "debian", type: "MaterialCommunityIcons" },
    { id: "2", name: "Houses", icon: "home-city", type: "MaterialCommunityIcons" },
  { id: "3", name: "Utility", icon: "treasure-chest", type: "MaterialCommunityIcons" },
  { id: "4", name: "Others", icon: "people", type: "Ionicons" },
  
];

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const renderItem = ({ item }) => {
    const isActive = item.id === selectedCategory;

    return (
      <TouchableOpacity style={styles.tab} onPress={() => setSelectedCategory(item.id)}>
        {item.type === "Ionicons" && <Ionicons name={item.icon} size={24} color={isActive ? "black" : "gray"} />}
        {item.type === "FontAwesome5" && <FontAwesome5 name={item.icon} size={24} color={isActive ? "black" : "gray"} />}
        {item.type === "MaterialCommunityIcons" && (
          <MaterialCommunityIcons name={item.icon} size={24} color={isActive ? "black" : "gray"} />
        )}
        <Text style={[styles.label, isActive && styles.activeLabel]}>{item.name}</Text>
        {isActive && <View style={styles.underline} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10

  },
  flatListContainer: {
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  tab: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  activeLabel: {
    color: "black",
    fontWeight: "bold",
  },
  underline: {
    width: 50,
    height: 3,
    backgroundColor: "black",
    marginTop: 4,
    borderRadius: 10,
  },
});

export default CategoryTabs;
