import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import moment from "moment";
import PhoneInput, { isValidPhoneNumber } from "react-native-international-phone-number";


const ProfileScreen = ({navigation}) => {
  const userId = useSelector((state) => state.rental.userId);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
    isEmailVerified: true,
    aboutMe: "",
    profilePic:""
  });

  const [editFields, setEditFields] = useState({}); // Track multiple editable fields
  const [profilePic, setProfilePic] = useState([])
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [error, setError] = useState("")
  const [countryCode, setCountryCode] = useState('+1');

  useEffect(()=>{
    console.log("profile data",profileData)

  },[profileData])


  const getProfileData = async ()=>{
    const response = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/getUser?"+userId)
    const profileData = await response.json()
    console.log(profileData)
    const [preferredcountry, preferredstate] = profileData.preferred_location.split("_")
    const [street, city, state, pincode, country] = profileData.address? profileData.address.split("_"): ["","","","",""]
    setAddress({
      street: street,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
    })
    setPreferredLocation({ state: preferredstate,
      country: preferredcountry})
    setProfileData({
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      gender: profileData.gender,
      dob: moment(profileData.date_of_birth).format("YYYY-MM-DD"),
      email: profileData.email,
      mobile: profileData.mobile_number,
      isEmailVerified: true,
      aboutMe: profileData.about_me,
      profilePic: profileData.profile_pic
    })
  }

  
  useEffect(()=>{
    getProfileData()
  },[])

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
    if(!profileData.isEmailVerified){
      const newErrors = {}
      newErrors.email = "Verify the Email to update";
      setErrors(newErrors)
      return ""
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

  const handleSave = async () => {
    if (validateFields()) {
      setEditFields({});
      
      const updatedResponse = await fetch("https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/updateProfile",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id: userId,
          "about_me":profileData.aboutMe,
          email: profileData.email,
          mobile_number: profileData.mobile,
          address: Object.values(address).join("_"),
          preferred_location: preferredLocation.country+"_"+preferredLocation.state,
          isProfilePicChanged: profilePic.length>0?true:false,
          profilePic: profilePic.length>0?{base64:"data:image/jpeg;base64,"+profilePic[0].base64, fileName:profilePic[0].fileName}:profilePic,
          imageUrl: profileData.profilePic
        })
      })
      const res = await updatedResponse.json()
      console.log(res)
    }

  };

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1,1],
        base64: true,
        quality: 1,
        
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setProfilePic(result.assets);
        handleEditToggle("profiePic")
      } 
    };

    const getOTP = async () =>{
      setError("")
      console.log("getOTP")
      const response = await fetch("https://icpskvho6d.execute-api.us-east-1.amazonaws.com/default/getOTP",{method:"POST", headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify({email:profileData.email})})
      const data = await response.json();
      console.log("getOTP",data)
      setShowOtp(true)
    }

    const verifyEmail = async () =>{
      console.log( {
        email: profileData.email,
        otp: otp
      })
      const response = await fetch('https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileData.email,
          otp: otp
        })
      })
      const res = await response.json()
      if(res.message == "OTP verified successfully"){
        setProfileData({...profileData, isEmailVerified:true })
      }
      console.log("res",res)
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profilePic.length==0?profileData.profilePic:profilePic[0]?.uri }}
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
          <TouchableOpacity onPress={()=>{if(!profileData.isEmailVerified){ getOTP()}}}>
          <Text style={profileData.isEmailVerified ? styles.verified : styles.verifyPending}>
            {profileData.isEmailVerified ? "✔ Verified" : "Verify Email"}
          </Text>
          </TouchableOpacity>
        }
      />
      {showOtp&& <View style={{flexDirection:"row"}}><TextInput placeholder="Enter OTP" style={{width: "75%",backgroundColor:"#fff", borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,}} value={otp} onChangeText={(text)=>{setOtp(text)}}></TextInput>
           <TouchableOpacity style={styles.submitButton} onPress={verifyEmail}>
                  <Text style={styles.submitButtonText}>Verify</Text>
                </TouchableOpacity>
      </View>}

      <ProfileField
        label="Mobile"
        value={profileData.mobile}
        editable
        isEditing={editFields.mobile}
        onEdit={() => handleEditToggle("mobile")}
        onChangeText={(text) =>{ console.log("inside profile", text),setProfileData({ ...profileData, mobile: text })}}
        error={errors.mobile}
        mobileDetails={{mobile:profileData.mobile, countryCode: countryCode, setCountryCode: setCountryCode, setErrors: setErrors}}
      />

      <ProfileField
        label="Address"
        value={Object.values(address).join(" ").length==4?"-":Object.values(address).join(" ")}
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
            isEditing={ key === "country"? false: true}
            onChangeText={(text) => { setAddress({ ...address, [key]: text }) }}
          />
        ))}

      <ProfileField
        label="Preferred Location"
        value={Object.values(preferredLocation).join(" ")}
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
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("ChangePassword")}}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("GetHistory")}}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>

      {Object.values(editFields).includes(true) && (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitText}>Update</Text>
        </TouchableOpacity>
      )}


      <TouchableOpacity style={{...styles.button,marginTop:25, marginHorizontal:"20%", backgroundColor:"#E2062B"}} onPress={()=>{ navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });}}>
          <Text style={{...styles.buttonText,width:"auto", margin:"auto"}}>LogOut</Text>
        </TouchableOpacity>

      {/* Submit Button */}
      
    </ScrollView>
  );
};


const ProfileField = ({ label, value, editable, isEditing, onEdit, onChangeText, error, mobileDetails, extra }) => {
  if(label === "Mobile"){console.log("sd",{ label, value, editable, isEditing, onEdit, onChangeText, error, mobileDetails, extra })}
  return <View style={styles.section}>
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {editable && (
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editText}>{isEditing ? "" : "Edit ✎"}</Text>
        </TouchableOpacity>
      )}
    </View>
    { ( label === "Mobile") && (
      <PhoneInput
          phoneInputStyles={{
            container: isEditing? {
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: error?'red':'#ddd',
            }:{
              display: "none",
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: error?'red':'#ddd',}}}
          value={value}
          onChangePhoneNumber={(val)=>{onChangeText(val)}}
          selectedCountry={mobileDetails.countryCode}
          onChangeSelectedCountry={mobileDetails.setCountryCode}
          placeholder="Enter Mobile Number"
          onBlur={()=>{if(value !=="" && !isValidPhoneNumber(value, mobileDetails.countryCode)){mobileDetails.setErrors((prevErrors)=>({...prevErrors, ["mobile"]: "Please enter a valid mobile number"}))}}}
          // showOnly={['BR', 'PT', 'CA', 'US']}
          defaultCountry='US'
        />

    )}
    {isEditing && (label !== "Address" && label !== "Preferred Location" && label !== "Mobile") ? (
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    ) :
    (label !== "Mobile") ? (
      <Text style={styles.label}>{value}</Text>
    ): !isEditing && (
      <Text style={styles.label}>{value}</Text>
    )}
    {extra}
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
};



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

  submitButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    height: 39,
    borderRadius: 8,
    alignItems: "center",
    // width: "10%",
    marginHorizontal: "auto"
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal:5
  },
});

export default ProfileScreen;
