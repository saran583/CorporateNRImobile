import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
// import RNPickerSelect from 'react-native-picker-select';
import { Checkbox } from 'react-native-paper';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FlatList } from 'react-native';
import PhoneInput, {
  isValidPhoneNumber,
} from 'react-native-international-phone-number';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setUserId, setUserName } from '@/app/rentalSlice';
import { useDispatch } from 'react-redux';


const SignUpPage = ({navigation}) => {
  const { control, handleSubmit } = useForm();
  const [showOTP,setShowOTP] = useState(false)
  const [countryCode, setCountryCode] = useState('+1');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isNRI, setIsNRI] = useState(false);
  const [isFromDateVisible, setIsFromDateVisible] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [showError, setShowError] = useState("")

  


  const [form, setForm] = useState({
        dateOfBirth: new Date(),
        gender: "",
        country: "",
        state: ""
      });
  const [errors, setErrors] = useState({});
  

  const handleSubmitCheck = ()=>{
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if ( form[key].toString().trim() === "") {
        newErrors[key] = "This field is required";
      }
    });
    console.log()
    Object.keys(control._formValues).forEach((key) => {
      if ( control._formValues[key] === undefined || control._formValues[key].toString().trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    console.log("Form Submitted:", newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", form);
      onSubmit({...form, ...control._formValues})

    }
  }

  const SignUp = async (userDetails) =>{
    setLoading(true);
    const response = await fetch('https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "firstName": userDetails.firstName,
          "lastName": userDetails.lastName,
          "gender": userDetails.gender,
          "dob": userDetails.dateOfBirth,
          "companyName": userDetails.companyName,
          "email": userDetails.email,
          "mobileNumber": userDetails.mobileNumber,
          "preferredLocation": userDetails.country+"_"+userDetails.state,
          "password": userDetails.password,
          "isNRI": isNRI,
          "otp": userDetails.otp
        }),
      })

      const res = await response.json();
      console.log(res);
      if(res.message==="Email already registered"){
        setShowError("Email is already registered try logging in")
      }
      else{
      dispatch(setUserId(res.userId))
      dispatch(setUserName(res.name))

      
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
    });
  }
      
  }


  const onSubmit = async (data) => {
      
      
    if(!showOTP){
      const response = await fetch("https://icpskvho6d.execute-api.us-east-1.amazonaws.com/default/getOTP",{method:"POST", headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify({email:control._formValues.email})})
      const data = await response.json();
      console.log("changes",data)
      setShowOTP(true)
    }
    else {
      SignUp(data)
    }
    console.log("Data>>",data);
  };

  // const defaultStyles = getDefaultStyles();

  const genders = ['Male',"female","Others"]
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming"
  ];


  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    console.log("values",field, value)
    // if (field !=="petFriendly" && field !=="doYouSmoke"  && field !=="parking" && value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    // }
  };

  const resetError = (field)=>{
    // if(field === 'mobileNumber' && !isValidPhoneNumber(control._formValues["mobileNumber"], countryCode)){
    //   setErrors((prevErrors)=>({...prevErrors, [field]: "Please enter a valid mobile number"}))
    // }
    // else{
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    // }
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Modal visible={loading} transparent>
              <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                  <Text style={styles.text}>Loading, please wait...</Text>
                </View>
              </View>
            </Modal>

      <View style={styles.card}>
        <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.rowItem]}>
          <Text style={styles.label}>First Name</Text>
          <Controller
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.firstName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={(val)=>{onChange(val); resetError("firstName") }}
                placeholder="Enter first name"
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
        </View>

        <View style={[styles.inputContainer, styles.rowItem]}>
          <Text style={styles.label}>Last Name</Text>
          <Controller
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={(val)=>{onChange(val); resetError("lastName") }}
                placeholder="Enter last name"
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
        </View>

        </View>

        <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.rowItem]}>
              <Text style={styles.label}> Gender</Text>
              <TouchableOpacity style={[styles.input, errors.gender && styles.errorInput]} onPress={() => setShowGenderModal(true)}>
                <Text style={form.gender ? styles.textSelected : styles.textPlaceholder}>
                  {form.gender || "Select preference"}
                </Text>
              </TouchableOpacity>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
              </View>

              <Modal visible={showGenderModal} transparent animationType="slide">
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <FlatList
                            data={genders}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                  handleInputChange("gender", item)
                                  setShowGenderModal(false);
                                }}
                              >
                                <Text style={styles.itemText}>{item}</Text>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      </View>
                    </Modal>

        <View style={[styles.inputContainer, styles.rowItem]}>
          <Text style={styles.label}>Date of Birth</Text>
          <>
                  <TouchableOpacity
                  onPress={() => setIsFromDateVisible(true)}
                  style={styles.input}
                >
                  <Text>{form.dateOfBirth.toDateString()}</Text>
                </TouchableOpacity>
                
<Modal transparent visible={isFromDateVisible} animationType="slide">
        <View style={styles.modalContainer}>
            <DateTimePicker
            value={form.dateOfBirth}
            maximumDate={new Date(2019,0,1)}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {handleInputChange("dateOfBirth", selectedDate || form.dateOfBirth); setIsFromDateVisible(false);}}
            />
        </View>
      </Modal>
                  </>
          {errors.dateOfBirth && <Text style={styles.error}>{errors.dateOfBirth}</Text>}
        </View>

        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company Name</Text>
          <Controller
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.companyName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={(val)=>{onChange(val); resetError("companyName") }}
                placeholder="Enter company name"
              />
            )}
            name="companyName"
          />
          {errors.companyName && <Text style={styles.error}>{errors.companyName}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={(val)=>{onChange(val); resetError("password") }}
                placeholder="Enter password"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student / Corporate Email Address</Text>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={(val)=>{onChange(val); resetError("email") }}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>
        

    <View style={{marginBottom: 10}}>
    <Text style={styles.label}>Mobile Number</Text>
    <View style={styles.inputContainer1}>
        {/* <View style={styles.pickerContainer}>
        //   <PhoneInput
        //   value={value}
        //   onChangePhoneNumber={(val)=>{onChange(val); resetError("mobileNumber") }}
        //   selectedCountry={countryCode}
        //   onChangeSelectedCountry={setCountryCode}
        // />
        // </View> */}
        <Controller
            control={control}
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PhoneInput
              phoneInputStyles={{
                container: {
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: errors.mobileNumber?'red':'#ddd',
                }}}
          value={value}
          onChangePhoneNumber={(val)=>{onChange(val); resetError("mobileNumber") }}
          selectedCountry={countryCode}
          onChangeSelectedCountry={setCountryCode}
          placeholder="Enter Mobile Number"
      
      onBlur={()=>{if(control._formValues["mobileNumber"] !=="" && !isValidPhoneNumber(control._formValues["mobileNumber"], countryCode)){setErrors((prevErrors)=>({...prevErrors, ["mobileNumber"]: "Please enter a valid mobile number"}))}}}
          // showOnly={['BR', 'PT', 'CA', 'US']}
          defaultCountry='US'
        />
        // <TextInput
        //   // style={styles.mobileInput}
        //   style={[styles.mobileInput, errors.mobileNumber && styles.errorInput]}
        //   placeholder="Mobile Number"
        //   keyboardType="phone-pad"
        //   value={value}
        //   onBlur={onBlur}
        //   onChangeText={(val)=>{onChange(val); resetError("mobileNumber") }}
        // />
      )}
      name="mobileNumber"
      />
      </View>
      {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber}</Text>}
      </View>


      <Text style={styles.label}>Preferred Location</Text>
      <View style={styles.rowContainer}>
      <View style={[styles.inputContainer, styles.rowItem]}>
          <TouchableOpacity style={[styles.input, errors.country && styles.errorInput]} onPress={() => setShowCountryModal(true)}>
            <Text style={form.country ? styles.textSelected : styles.textPlaceholder}>
              {form.country || "Select Country"}
            </Text>
          </TouchableOpacity>
          {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
       </View>

  <Modal visible={showCountryModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={['USA']}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      handleInputChange("country", item)
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <View style={[styles.inputContainer, styles.rowItem]}>
          <TouchableOpacity style={[styles.input, errors.state && styles.errorInput]} onPress={() => setShowStateModal(true)}>
            <Text style={form.state ? styles.textSelected : styles.textPlaceholder}>
              {form.state || "Select State"}
            </Text>
          </TouchableOpacity>
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
       </View>

  <Modal visible={showStateModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={states}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      handleInputChange("state", item)
                      setShowStateModal(false);
                    }}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        </View>

        <View style={styles.checkboxContainer}>
        <Checkbox
          status={isNRI ? 'checked' : 'unchecked'}
          onPress={() => setIsNRI(!isNRI)}
          color={Colors.primary}
        />
        <Text style={styles.checkboxLabel}>Are you a Non-Resident Indian (NRI)?</Text>
      </View>

        <View style={styles.checkboxContainer}>
        <Checkbox
          status={agreeTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreeTerms(!agreeTerms)}
          color={Colors.primary}
        />
        <Text style={styles.checkboxLabel}>Agree to Terms and Conditions</Text>
      </View>
      




        {showOTP&&<View style={styles.inputContainer}>
          <Text style={styles.label}>OTP</Text>
          <Text style={{fontSize: 13, color:"red"}}>* Kindly check for the OTP in the company/college Email</Text>
          <Controller
            control={control}
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.otp && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter OTP"
                keyboardType="phone-pad"
              />
            )}
            name="otp"
          />
          {errors.mobileNumber && <Text style={styles.error}>{errors.otp}</Text>}
          {showError}
        </View>}

        <TouchableOpacity style={styles.submitButton} onPress={()=>{handleSubmitCheck(); return handleSubmit(onSubmit)}}>
          <Text style={styles.submitText}> { showOTP?"Sign Up":"Verify Email"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: Colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input1: {
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 0,
    backgroundColor: "#f9f9f9",
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 10,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  rowItem: {
    flex: 0.48,
  },
  inputContainer1: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    // paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,

    // marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerContainer: {
    width: '40%',
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
  mobileInput: {
    width: '60%',
    fontSize: 16,
    // padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textPlaceholder: {
    color: "#aaa",
  },
  textSelected: {
    color: "#000",
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
});


const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 10,
    // paddingHorizontal: 12,
    color: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    color: '#333',
  },
  
};

export default SignUpPage;
