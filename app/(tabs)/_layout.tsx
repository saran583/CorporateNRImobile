import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import ProfileIcon from '@/components/ui/ProfileIcon';


export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const navigation = useNavigation();


  const actions = [
    {
      text: "Commerce",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "utility",
      position: 2,
      color: Colors.primary,
      textStyle:{ fontSize: 15}

    },
    {
      text: "Other",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "other",
      position: 1,
      color: Colors.primary,
      textStyle:{ fontSize: 15}

    },
    {
      text: "Rental",
      icon: <IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "rental",
      position: 3,
      color: Colors.primary,
      textStyle:{ fontSize: 15}
    },
    
  ];


  return (
    <>
    <View style={{height: 90,backgroundColor: Colors.primary, flexDirection:'row', width:'100%', paddingTop:45, paddingHorizontal:15, justifyContent: 'space-between'}}>
    <View style={{flexDirection:'row'}}>
    <ProfileIcon name="John Doe" size={35} backgroundColor="#4CAF50" textColor="#FFFFFF" />
    <Text style={{color:"#fff", fontSize: 22, paddingTop:3, fontWeight: '500'}} numberOfLines={1}>Corporate NRI</Text>
    </View>
    <View style={styles.headerIconsContainer}>
                  {/* Notification Icon */}
                  <TouchableOpacity style={styles.notificationContainer}onPress={() => {navigation.navigate("Search")}} >
                      <Icon name="search" size={24} color="#fff" />
                  </TouchableOpacity>
    
                  {/* Message Icon */}
                  <TouchableOpacity onPress={() => {navigation.navigate("MessagesPage")}}>
                    <View style={styles.messageContainer}>
                      <Icon name="message" size={25} color="#fff" />
                        <View style={styles.messageBadge}>
                          <Text style={styles.badgeText}>5</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                </View>
    </View>
    <Tabs
    // Colors[colorScheme ?? 'light'].tint
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 10, // Adjust size
          width: "auto", // Ensure width is flexible
          flexWrap: "nowrap", // Allow wrapping if necessary
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors.primary
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Latest',
          tabBarIcon: ({ color }) => <Icon name="whatshot" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore copy"
        options={{
          title: 'Featured',
          tabBarIcon: ({ color }) =>  <Icon name="star" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Today"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) =>  <Icon name="calendar-today" size={25} color={color} />,
        }}
      />
    </Tabs>
    <FloatingAction
    actions={actions}
    color={Colors.primary}
    distanceToEdge={{vertical:60, horizontal: 20}}
    actionsPaddingTopBottom={2}
    onPressItem={name => {
      navigation.navigate(name=='rental'?"HomeRental":name=='other'?"OtherRental":"UtilityRental")
      console.log(`selected button: ${name}`);
    }}
  />
    </>
  );
}


const styles=StyleSheet.create({
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

})