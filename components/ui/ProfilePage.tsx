import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    email: "johndoe@example.com",
    mobile: "+1234567890",
    isEmailVerified: true,
    aboutMe: "I am a passionate Developer"
  });

  const [editFields, setEditFields] = useState({}); // Track multiple editable fields
  const [profilePic, setProfilePic] = useState([])

  const [address, setAddress] = useState({
    street: "123 Main St",
    city: "New York",
    state: "NY",
    pincode: "10001",
    country: "USA",
  });
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  

  const [preferredLocation, setPreferredLocation] = useState({
    state: "New York",
    country: "USA",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};

    if (!profileData.email.trim()) {
      newErrors.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!profileData.mobile.trim()) {
      newErrors.mobile = "Mobile cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = (field) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    if (validateFields()) {
      setEditFields({});
    }
  };

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
        
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setProfilePic(result.assets);
        handleEditToggle("profiePic")
      } 
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profilePic[0]?.uri }}
          style={styles.profilePic}
          placeholder={{blurhash}}
        />
        <TouchableOpacity style={styles.changePicBtn}>
          <Text style={styles.changePicText} onPress={pickImage}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      <ProfileField
        label="About Me"
        value={profileData.aboutMe}
        editable
        isEditing={editFields.aboutMe}
        onEdit={() => handleEditToggle("aboutMe")}
        onChangeText={(text) => setProfileData({ ...profileData, aboutMe: text })}
      />

      <View style={[styles.row, styles.textLabels]}>
        <ProfileField label="First Name" value={profileData.firstName} />
        <ProfileField label="Last Name   " value={profileData.lastName} />
      </View>
      <View style={[styles.row,, styles.textLabels]}>
        <ProfileField label="Gender" value={profileData.gender} />
        <ProfileField label="Date of Birth" value={profileData.dob} />
      </View>

      <ProfileField
        label="Email"
        value={profileData.email}
        editable
        isEditing={editFields.email}
        onEdit={() => handleEditToggle("email")}
        onChangeText={(text) =>
          setProfileData({ ...profileData, email: text, isEmailVerified: false })
        }
        error={errors.email}
        extra={
          <Text style={profileData.isEmailVerified ? styles.verified : styles.verifyPending}>
            {profileData.isEmailVerified ? "✔ Verified" : "Verify Email"}
          </Text>
        }
      />

      <ProfileField
        label="Mobile"
        value={profileData.mobile}
        editable
        isEditing={editFields.mobile}
        onEdit={() => handleEditToggle("mobile")}
        onChangeText={(text) => setProfileData({ ...profileData, mobile: text })}
        error={errors.mobile}
      />

      <ProfileField
        label="Address"
        value={Object.values(address).join(", ")}
        editable
        isEditing={editFields.address}
        onEdit={() => handleEditToggle("address")}
      />
      {editFields.address &&
        Object.keys(address).map((key) => (
          <ProfileField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={address[key]}
            isEditing={true}
            onChangeText={(text) => setAddress({ ...address, [key]: text })}
          />
        ))}

      <ProfileField
        label="Preferred Location"
        value={Object.values(preferredLocation).join(", ")}
        editable
        isEditing={editFields.preferredLocation}
        onEdit={() => handleEditToggle("preferredLocation")}
      />
      {editFields.preferredLocation &&
        Object.keys(preferredLocation).map((key) => (
          <ProfileField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={preferredLocation[key]}
            isEditing={true}
            onChangeText={(text) => setPreferredLocation({ ...preferredLocation, [key]: text })}
          />
        ))}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      {Object.values(editFields).includes(true) && (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitText}>Update</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};


const ProfileField = ({ label, value, editable, isEditing, onEdit, onChangeText, error, extra }) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {editable && (
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editText}>{isEditing ? "" : "Edit ✎"}</Text>
        </TouchableOpacity>
      )}
    </View>
    {isEditing && (label !== "Address" && label !== "Preferred Location") ? (
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    ) : (
      <Text style={styles.label}>{value}</Text>
    )}
    {extra}
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);


const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor:Colors.secondary, minHeight: "100%" },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ccc" },
  changePicBtn: { marginTop: 10, padding: 5, backgroundColor: Colors.primary, borderRadius: 5 },
  changePicText: { color: "#fff" },
  textLabels: {width:"90%"},
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  label: { fontSize: 14, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  editText: { color: "blue", marginLeft: 10, fontSize: 16 },
  verified: { color: "green", fontWeight: "bold", marginLeft: 5 },
  verifyPending: { color: "goldenrod", fontWeight: "bold", marginLeft: 5 },
  error: { color: "red", fontSize: 12 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
  button: { padding: 10, backgroundColor: Colors.primary, borderRadius: 5 },
  buttonText: { color: "#fff" },
  submitBtn: { marginTop: 20, padding: 10, backgroundColor: Colors.primary, borderRadius: 5, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "bold" },
});

export default ProfileScreen;
