import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/helpers/constants";
import { db } from "../../firebase-config";
import { UserContext } from "../BottomNavigator";
import FavoriteCard from "../components/Favorite/FavoriteCard";

const getData = async (user, setData) => {
  // console.log("prueba", userData);
  let data = [];

  const products = await getDocs(
    collection(db, "users", user.userData.email, "favoriteProducts")
  );

  if (products.docs.length > 0) {
    products.docs.map((product) => {
      data.push(product.data());
    });
  } else {
    // console.log("no products");
  }

  setData(data);
};

const FavoritesScreen = () => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData(user, setData);
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites</Text>
      </View>
      <View style={style.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, i) => (
            <FavoriteCard item={item} key={i} user={user} setData={setData} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  scrollContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default FavoritesScreen;
