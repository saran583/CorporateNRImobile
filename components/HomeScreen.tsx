import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import ProfileIcon from "./ui/ProfileIcon";

export default function HomeScreen ({ navigation }) {
  
    return (
        <Stack>
        <Stack.Screen name="(tabs)" 
        options={{
            title: "Corporate NRI", // Title for the AppBar
            headerStyle: {
              backgroundColor: '#021138'
            },
            headerShown:false,
            headerLeft:(props) =>{
               return <ProfileIcon name="John Doe" size={35} backgroundColor="#4CAF50" textColor="#FFFFFF" />
            },
            gestureEnabled: false,
            headerRight:()=>{
              return <View style={styles.headerIconsContainer}>
              {/* Notification Icon */}
              <TouchableOpacity style={styles.notificationContainer}onPress={() => {navigation.navigate("Search")}} >
                {/* <View  */}
                  <Icon name="search" size={24} color="#fff" />
                    {/* <View style={styles.notificationBadge}>
                      <Text style={styles.badgeText}>10</Text>
                    </View> */}
                {/* </View> */}
              </TouchableOpacity>

              {/* Message Icon */}
              <TouchableOpacity onPress={() => console.log('Messages clicked')}>
                <View style={styles.messageContainer}>
                  <Icon name="notifications" size={25} color="#fff" />
                    <View style={styles.messageBadge}>
                      <Text style={styles.badgeText}>5</Text>
                    </View>
                </View>
              </TouchableOpacity>
            </View>
            },
            headerTintColor: '#FFFFFF', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title style
            },
          }}
           />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  };

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
    },
    splashText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    homeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    homeText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },
    icon: {
      marginRight: 16,
    },
    notificationBadge: {
      position: 'absolute',
      top: -8,
      right: -5,
      backgroundColor: '#ff3b30',
      borderRadius: 10,
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    headerIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationContainer: {
      position: 'relative',
      marginRight: 25,
    },
    messageContainer: {
      position: 'relative',
      marginRight: 2
    },
    messageBadge: {
      position: 'absolute',
      top: -10,
      right: -8,
      backgroundColor: '#ff3b30',
      borderRadius: 10,
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });