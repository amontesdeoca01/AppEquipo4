import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../assets/helpers/constants";

//Screens
import HomeScreen from "./views/HomeScreen";
import MenuScreen from "../navigation/views/MenuScreen";
import ProfileScreen from "../navigation/views/ProfileScreen";
import CartScreen from "../navigation/views/CartScreen";
import FavoritesScreen from "../navigation/views/FavoritesScreen";
import { createContext } from "react";

//Screen names
const HOME_SCREEN = "Home";
const MENU_SCREEN = "Menu";
const PROFILE_SCREEN = "Profile";
const CART_SCREEN = "Cart";
const FAVORITES_SCREEN = "Favorites";

const Tab = createBottomTabNavigator();
export const UserContext = createContext();

export default function BottomNavigator({ route, navigation }) {
  const { user } = route.params;
  // console.log("userData in BottomNavigator", user);

  return (
    <UserContext.Provider value={user}>
      <Tab.Navigator
        initialRouteName={HOME_SCREEN}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === HOME_SCREEN) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === MENU_SCREEN) {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === PROFILE_SCREEN) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === CART_SCREEN) {
              iconName = focused ? "cart" : "cart-outline";
            } else if (rn === FAVORITES_SCREEN) {
              iconName = focused ? "heart" : "heart-outline";
            }
            return <IonIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Tab.Screen name={MENU_SCREEN} component={MenuScreen} />
        <Tab.Screen name={CART_SCREEN} component={CartScreen} />
        <Tab.Screen name={FAVORITES_SCREEN} component={FavoritesScreen} />
        <Tab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}
