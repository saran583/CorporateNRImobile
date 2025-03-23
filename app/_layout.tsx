import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashPage from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Font from "expo-font";
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';


import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from '@/components/SplashPage';
import { Colors } from '@/constants/Colors';
import LoginScreen from '@/components/ui/LoginScreen';
import SignInScreen from '@/components/ui/SignIn';
import SignUpPage from '@/components/ui/SignUpPage';
import MessagesScreen from '@/components/ui/MessagesComponent';
import MessagesPage from '@/components/ui/MessagesPage';
import TabTwoScreen from './(tabs)/explore';
import TabThreeScreen from './(tabs)/explore copy';
import ProfileScreen from '@/components/ui/ProfilePage';
import SearchComponent from '@/components/ui/SearchScreen';
import HomeRentalForm from '@/components/ui/HomeRentalForm';
import OtherRentalForm from '@/components/ui/OtherRentalForm';
import UtilityRental from '@/components/ui/UtilityForm';
import PropertyDetails from '@/components/ui/DetailPage';
import HomeScreen from '@/components/HomeScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from "./store";


import React, { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashPage.preventAutoHideAsync();
const Stack = createStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}





async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}



export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const rental = useSelector((state) => state.rental);
  // const dispatch = useDispatch()
  const [loaded] = useFonts({
    "MiSans-Regular": require("../assets/fonts/MiSans-Regular.ttf"),
    // "MiSans-Semibold": require("../assets/fonts/MiSans-Semibold.ttf"),
    // "MiSans-Normal": require("../assets/fonts/MiSans-Normal.ttf"),
    // "MiSans-Thin": require("../assets/fonts/MiSans-Thin.ttf"),
  });


  // const userId = useSelector((state) => state.rental.userId);
  
  
  
    const addToken = async (token) => {
  
      console.log(JSON.stringify({ token, id : userId }))
    
        const response = await fetch('https://my9ivim6h2.execute-api.us-east-1.amazonaws.com/default/addToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, id : userId }),
        });
    
        const data = await response.json();
        console.log(data)
        if (response.ok) {
        }
    };
  
  
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
      undefined
    );
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    const setPushToken =(token)=>{
      setExpoPushToken(token);
    }
  
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then(token =>setPushToken(token ?? ''))
        .catch((error: any) => setExpoPushToken(`${error}`));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

  // useEffect(() => {
  //   SplashPage.preventAutoHideAsync();
  
  //     async function loadFonts() {
  //       await Font.loadAsync({
  //         "MiSans-Regular": require("../assets/fonts/MiSans-Regular.ttf"),
  //         "MiSans-Semibold": require("../assets/fonts/MiSans-Semibold.ttf"),
  //         "MiSans-Normal": require("../assets/fonts/MiSans-Normal.ttf"),
  //         "MiSans-Thin": require("../assets/fonts/MiSans-Thin.ttf"),
  //       });
  //     }
  //     loadFonts();
  //   }, []);

  useEffect(() => {
    if (loaded) {
      SplashPage.hideAsync();
    }
  }, [loaded]);

  // useEffect(()=>{
  //   console.log("updated rental",rental)

  // },[rental])

  if (!loaded) {
    return null;
  }
try{
  return (
    <Provider store={store}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='Splash' >
        <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={LoginScreen}   options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={SignInScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage}  options={{ headerShown: false }} />

        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Messages" component={MessagesScreen}  options={{
            headerTitle: "Messages",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />
          <Stack.Screen name="MessagesPage" component={MessagesPage}  options={{
            headerTitle: "Messages",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />
        <Stack.Screen name="Home2" component={TabTwoScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Home3" component={TabThreeScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Profile" component={ProfileScreen}  options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />
          <Stack.Screen name="Search" component={SearchComponent}  options={{
            headerTitle: "Search",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />



        <Stack.Screen name="HomeRental" component={HomeRentalForm} options={{
            headerTitle: "Create Home Rental",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
        <Stack.Screen name="OtherRental" component={OtherRentalForm} options={{
            headerTitle: "Other Listing",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
          <Stack.Screen name="UtilityRental" component={UtilityRental} options={{
            headerTitle: "Commerce Listing",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
          <Stack.Screen name="DetailPage" component={PropertyDetails}  options={{
            headerTitle: "Detail Page",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>

  );}
  catch(error:any){
    console.error("App crashed:", error);
    return <Text style={{ color: 'red' }}>Something went wrong! {error.toString()}</Text>;
  }
}
