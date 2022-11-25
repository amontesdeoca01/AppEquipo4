import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomNavigator from "./navigation/BottomNavigator";
import DetailScreen from "./navigation/views/DetailScreen";
import LoginScreen from "./navigation/views/LoginScreen";
import SellerScreen from "./navigation/views/admin/SellerScreen";
import EditScreen from "./navigation/views/admin/EditScreen";
import AddScreen from "./navigation/views/admin/AddScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={BottomNavigator} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Seller" component={SellerScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
