import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { get, marginTop } from "styled-system";
import { COLORS } from "../../assets/helpers/constants";
import { db } from "../../firebase-config";
import { UserContext } from "../BottomNavigator";

const { width } = Dimensions.get("screen");
const sexoWidth = width / 2 - 20;

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
    console.log("no products");
  }

  setData(data);
};

const Card = ({ item }) => {
  return (
    <View style={style.card}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{ marginHorizontal: 5, width: 150 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: COLORS.grey, marginBottom: 5 }}>
          {item.ingredients}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>${item.price}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              style={{
                color: "#008000",
                fontSize: 18,
                height: 30,
                padding: 5,
                marginLeft: -15,
              }}
            >
              Add
            </Text>
            <Text
              style={{
                color: "#008000",
                fontSize: 18,
                height: 30,
                paddingTop: -5,
                paddingLeft: 5,
                marginLeft: -15,
                paddingRight: 5,
              }}
            >
              to cart
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              color: "#FF0000",
              fontSize: 18,
              height: 30,
              marginVertical: 5,
              padding: 5,
              marginLeft: -15,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FavoritesScreen = () => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData(user, setData);
    }, [])
  );

  // const data = [
  //   {
  //     name: "Hamburguesa",
  //     price: 10,
  //   },
  //   {
  //     name: "pene",
  //     price: 10,
  //   },
  // ];

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites</Text>
      </View>
      <View style={style.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, i) => (
            <Card item={item} key={i} />
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  btnContainer: {
    backgroundColor: COLORS.white,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray,
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
  btnCart: {
    color: "#008000",
    fontSize: 18,
    height: 30,
    padding: 5,
    marginLeft: -15,
  },
});

export default FavoritesScreen;
