import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
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
      <Text style={styles.title}>Welcome to Corporate NRI</Text>
      <Text style={styles.subtitle}>Trusted. Connected. Made for you</Text>
      <View style={styles.subtext}>
        <Text style={{color: Colors.secondary, fontSize: 17}} >Your One-stop solution for NRIs worldwide.</Text>
        <Text style={{color: Colors.secondary, fontSize: 17}}>Rentals, Car, travel and more!</Text>
      </View>


      <View style={styles.form}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.loginSubtitle}>to view the rentals</Text>

        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.companiesGrid}>
        <Text style={{color: Colors.secondary, width: "100%", textAlign: "center", fontSize: 15}}>Trusted by Employees from</Text>
            {companies.map((company) => (
              <View
                key={company}
                style={styles.companyTag}
              >
                <Text style={styles.companyText}>{company}</Text>
              </View>
            ))}
          </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    padding: 20,
    // paddingTop: 25,
    height: '100%',
    paddingTop: '10%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 5,
    marginTop: 8
  },
  subtitle: {
    fontSize: 14,
    color:Colors.secondary,
    marginBottom: 20,
  },

  subtext: {
    color:Colors.secondary,
    marginTop: '40%',
  },
  form: {
    backgroundColor: Colors.secondary,
    width: '100%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    marginTop: "5%",
    zIndex:9
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4d4d',
  },
  errorText: {
    width: '100%',
    color: '#ff4d4d',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10
  },
  signupButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  companiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    position: 'absolute',
    bottom: 0,  // Adjust the spacing from the bottom
    alignItems: 'center',
    marginTop: 'auto',
    zIndex: 0
  },

  companyTag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  companyText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
