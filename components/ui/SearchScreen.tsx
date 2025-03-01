import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For Icons
import { Colors } from "@/constants/Colors";
import renderCard from "./CardRenderer";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import CategoryTabs from "./FilterTab";

const DATA = [
  { id: "1", name: "3bhk Villa for Sale ", type: "Rentals", price: 200000 },
  { id: "2", name: "Flat for Rent", type: "Rentals", price: 5000 },
  { id: "3", name: "Need Travel Companion", type: "Other", price: 80 },
  { id: "4", name: "Furniture Items for Sale", type: "Commerce", price: 150 },
  { id: "5", name: "Office Chairs and Tables", type: "Commerce", price: 300 },
  { id: "6", name: "Need Medical Support", type: "Other", price: 120 },
];

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation()

  // Update the displayed data based on search and filter
  const updateFilteredData = (query, type) => {
    let filtered = DATA;

    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter((item) => item.type === type);
    }

    setFilteredData(filtered);
  };

  // Handle Search Input
  const handleSearch = () => {
    console.log("search",searchQuery)
    updateFilteredData(searchQuery, selectedType);
  };

  // Handle Type Selection (Instant Filtering)
  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setDropdownVisible(false);
    updateFilteredData(searchQuery, type);
  };

  // Clear Filter
  const clearFilter = () => {
    setSelectedType(null);
    setDropdownVisible(false);
    updateFilteredData(searchQuery, null);
  };

  const renderCards = ({ item }) => (
    // <View style={[styles.card, { backgroundColor: item.color }]}>
     //{ /* <Text style={styles.cardTitle}>{item.text}</Text> */ }
     //{ /* <CardLayout title="Villa for Sale" price="$35000" location="texas" features={["pool", "parking", "Gym", "SPA"]} /> */}
      
       renderCard(navigation, item.name, item.price, "search", ["Gym", "Parking", "ClubHouse"],  Dimensions.get('window').width * 0.97)
     
  //</View>
   );

  return (
    <View style={styles.container}>
      {/* Search Bar & Filter Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
         <TouchableOpacity
          style={styles.filterButton}
          onPress={handleSearch}
        ><Text style={{color:'#fff'}}>Search</Text></TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <FontAwesome name="filter" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>
      

      {/* Dropdown Filter */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {["Rentals", "Commerce", "Others"].map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.dropdownOption}
              onPress={() => handleTypeSelection(type)}
            >
              <Text style={styles.dropdownText}>{type}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.dropdownOption} onPress={clearFilter}>
            <Text style={styles.dropdownText}>Show All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Selected Filter Indicator */}
      {selectedType && (
        <View style={styles.selectedFilter}>
          <Text style={styles.selectedFilterText}>Filter: {selectedType}</Text>
          <TouchableOpacity onPress={clearFilter}>
            <FontAwesome name="times-circle" size={18} color="red" />
          </TouchableOpacity>
        </View>
      )}

      {/* Cards List */}
      {/* <View> */}
        <View style={{backgroundColor: Colors.secondary, paddingBottom:10}}>
        <CategoryTabs></CategoryTabs>
        </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={(item) =>renderCards(item)}
      />
      {/* </View> */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 20, backgroundColor: "#f9f9f9" },
  searchContainer: { flexDirection: "row", marginBottom: 10, paddingHorizontal: 10, alignItems: "center" },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 150,
    zIndex: 10,
  },
  dropdownOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownText: { fontSize: 16, textAlign: "center" },
  selectedFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffdfdf",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedFilterText: { marginRight: 10, color: "red", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  cardText: { fontSize: 14, color: "#333" },
});
