import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const userEmail = useSelector((state) => state.rental.userEmail);


  useEffect(()=>{
    setEmail(userEmail)

  },[userEmail])

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };


  const handleSubmit = () => {
     if (!currentPassword) {
      setError('Please enter your current password.');
    } else if (!validatePassword(newPassword)) {
      setError(
        'New password must be at least 8 characters long, with uppercase, lowercase, and special character.'
      );
    } else if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
    } else {
      setError('');
      // Submit logic here
      Alert.alert('Success', 'Password changed successfully!');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* <Text style={styles.title}>🔒 Change Password</Text> */}
          <Text style={{fontWeight: "normal", fontSize: 16}}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              editable={false}
              style={[styles.input, { color: '#999' }]}
            //   onChangeText={setEmail}
            //   style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={{fontWeight: "normal", fontSize: 16}}>Current Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#888"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Text>{showCurrentPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={{fontWeight: "normal", fontSize: 16}}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#888"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={{fontWeight: "normal", fontSize: 16}}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {error !== '' && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4facfe',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.secondary,
  },
  scroll: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    paddingLeft: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginHorizontal: "20%",
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 8,
    marginBottom: -10,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
