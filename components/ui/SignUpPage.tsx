import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
// import RNPickerSelect from 'react-native-picker-select';
import { Checkbox } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FlatList } from 'react-native';

const SignUpPage = () => {
  const { control, handleSubmit } = useForm();
  const [showOTP,setShowOTP] = useState(false)
  const [countryCode, setCountryCode] = useState('+1');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isNRI, setIsNRI] = useState(false);
  const [isFromDateVisible, setIsFromDateVisible] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);

  


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

  const onSubmit = (data) => {
      
      
    if(!showOTP){
      setShowOTP(true)
    }
    
    console.log(data);
  };

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
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
                <DateTimePickerModal
                  isVisible={isFromDateVisible}
                  mode="date"
                  onConfirm={(selectedDate) => {
                    setIsFromDateVisible(false);
                    handleInputChange("dateOfBirth", selectedDate)
                  }}
                  onCancel={() => setIsFromDateVisible(false)}
                />
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
    <View style={[styles.inputContainer1, errors.mobileNumber && styles.errorInput]}>
        <View style={styles.pickerContainer}>
          {/* <RNPickerSelect
            onValueChange={(value) => setCountryCode(value)}
            items={[
              { label: '+1', value: '+1' },
              { label: '+91', value: '+91' },
              { label: '+44', value: '+44' },
            ]}
            style={pickerSelectStyles}
            value={countryCode}
          /> */}
        </View>
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
          // style={styles.mobileInput}
          style={[styles.mobileInput, errors.mobileNumber && styles.errorInput]}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={value}
          onBlur={onBlur}
          onChangeText={(val)=>{onChange(val); resetError("mobileNumber") }}
        />
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
    marginBottom: 30,
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
    paddingHorizontal: 10,
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
