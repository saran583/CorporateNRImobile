import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashPage from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashPage.preventAutoHideAsync();
const Stack = createStackNavigator();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const rental = useSelector((state) => state.rental);
  // const dispatch = useDispatch()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/MiSans-Regular.ttf'),
  });

  useEffect(() => {
    SplashPage.preventAutoHideAsync();
  
      async function loadFonts() {
        await Font.loadAsync({
          "MiSans-Regular": require("../assets/fonts/MiSans-Regular.ttf"),
          "MiSans-Semibold": require("../assets/fonts/MiSans-Semibold.ttf"),
          "MiSans-Normal": require("../assets/fonts/MiSans-Normal.ttf"),
          "MiSans-Thin": require("../assets/fonts/MiSans-Thin.ttf"),
        });
      }
      loadFonts();
    }, []);

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

  return (
    <Provider store={store}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='Splash' >
        <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={LoginScreen}  options={{ headerShown: false }} />
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
            headerTitle: "Rental Detail Page",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>

  );
}
