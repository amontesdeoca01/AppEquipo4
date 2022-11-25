import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/helpers/constants";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../BottomNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import CartCard from "../components/Cart/CartCard";

const getData = async (user, setData) => {
  // console.log("prueba", userData);
  let data = [];

  const products = await getDocs(
    collection(db, "users", user.userData.email, "cart")
  );

  if (products.docs.length > 0) {
    products.docs.map((product) => {
      data.push(product.data());
      // console.log("data", data);
    });
  } else {
    // console.log("no products");
  }

  setData(data);
};

const totalPrice = async (user, setTotal, total) => {
  const products = await getDocs(
    collection(db, "users", user.userData.email, "cart")
  );

  if (products.docs.length > 0) {
    products.docs.map((product) => {
      const price = product.data().price;
      const quantity = product.data().quantity;
      setTotal(total + price * quantity);
    });
  }
};

const CartScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getData(user, setData);
      totalPrice(user, setTotal, total);
    }, [])
  );

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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>${total}</Text>
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
