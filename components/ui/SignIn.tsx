import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({navigation}) => {
 const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [apiError, setApiError] = useState('');
 
   // Function to validate inputs
   const validateInputs = () => {
     let isValid = true;
 
     if (!email) {
       setEmailError('Email is required.');
       isValid = false;
     } else if (!/\S+@\S+\.\S+/.test(email)) {
       setEmailError('Enter a valid email.');
       isValid = false;
     } else {
       setEmailError('');
     }
 
     if (!password) {
       setPasswordError('Password is required.');
       isValid = false;
     } else if (password.length < 6) {
       setPasswordError('Password must be at least 6 characters.');
       isValid = false;
     } else {
       setPasswordError('');
     }
 
     return isValid;
   };
 
   const companies = [
     'G',
     'Meta',
     'Microsoft',
     'Amazon'
   ];
 
   // Function to handle login API call
   const handleLogin = async () => {
     if (!validateInputs()) return;
 
     navigation.replace("Home");
 
     try {
       const response = await fetch('https://example.com/api/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
       });
 
       const data = await response.json();
 
       if (response.ok) {
         setApiError('');
         // Navigate to another screen on successful login
         navigation.navigate('Home');
       } else {
         setApiError(data.message || 'Invalid credentials.');
       }
     } catch (error) {
       setApiError('Something went wrong. Please try again.');
     }
   };
 

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Corporate NRI</Text>
        <Text style={styles.subtitle}>Trusted. Connected. Made for you</Text>
        <Text style={styles.description}>
          Your One-stop solution for NRIs worldwide. Rentals, Car, Travel and
          more!
        </Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
           keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

         {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
          {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.trustedText}>Trusted by Employees from</Text>
        <View style={styles.trustedLogos}>
          {["G", "Meta", "Microsoft", "Amazon"].map((item, index) => (
            <View key={index} style={styles.trustedBadge}>
              <Text style={styles.badgeText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5,
  },
  description: {
    color: "#bbb",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
  },
  errorText: {
    width: '100%',
    color: '#ff4d4d',
    fontSize: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: width * 0.9,
    alignSelf: "center",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },
  loginSubText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#001F3F",
    paddingVertical: 12,
    flex: 1,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#001F3F",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#001F3F",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  trustedText: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
  },
  trustedLogos: {
    flexDirection: "row",
    justifyContent: "center",
  },
  trustedBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default SignInScreen;
