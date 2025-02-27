import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

export default function SplashScreen ({ navigation }) {
  console.log("Entered screen")
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('Login'); // Navigate to Home after 3 seconds
      }, 1000);
      return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/appLogo.png')} style={styles.centerImage} />

        <View style={styles.bottomContainer}>
            <Image source={require('../assets/images/CNLogo.png')} style={styles.bottomImage} />
            <Text style={styles.bottomText}>Trusted. Connected. Made for you</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',  // Centers the first image
      alignItems: 'center',
      backgroundColor: Colors.primary,

    },
    centerImage: {
      width: 200,  // Adjust as needed
      height: 200,
      resizeMode: 'contain',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,  // Adjust the spacing from the bottom
      alignItems: 'center',
    },
    bottomImage: {
      width: 300,
      height: 45,
      resizeMode: 'contain',
    },
    bottomText: {
      marginTop: 0, // Spacing between image and text
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.secondary,
      marginBottom: 15
    },
  });