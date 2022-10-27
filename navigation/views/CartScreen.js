import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MDIcon, IonIcon } from "../../assets/helpers/icons";
import { COLORS, foods } from "../../assets/helpers/constants";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../BottomNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const getData = async (user, setData) => {
  // console.log("prueba", userData);
  let data = [];

  const products = await getDocs(
    collection(db, "users", user.userData.email, "cart")
  );

  if (products.docs.length > 0) {
    products.docs.map((product) => {
      data.push(product.data());
      console.log("data", data);
    });
  } else {
    console.log("no products");
  }

  setData(data);
};

const CartScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData(user, setData);
    }, [])
  );

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{ uri: item.image }}
          style={{ height: 80, width: 80, resizeMode: "contain" }}
        />
        <View
          style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${item.price}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
          <View style={style.actionBtn}>
            <IonIcon name="ios-remove" size={25} color={COLORS.white} />
            <IonIcon name="ios-add" size={25} color={COLORS.white} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>
      <View style={style.middleContainer}>
        <View style={style.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, i) => (
              <CartCard item={item} key={i} />
            ))}
          </ScrollView>
        </View>
        <View>
          <View style={style.bottomContainer}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Total Price
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>$53</Text>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <TouchableOpacity>
              <View style={style.btnContainer}>
                <Text style={style.btnText}>Checkout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  scrollContainer: {
    paddingVertical: 20,
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 12,
  },
  middleContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    height: "90%",
  },
});

export default CartScreen;
