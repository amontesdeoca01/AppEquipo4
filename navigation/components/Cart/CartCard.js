import { Image, StyleSheet, Text, View } from "react-native";
import { IonIcon } from "../../../assets/helpers/icons";
import { COLORS } from "../../../assets/helpers/constants";
import {
  getDocs,
  updateDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useContext } from "react";
import { UserContext } from "../../BottomNavigator";
import { useState } from "react";

const CartCard = ({ item }) => {
  const user = useContext(UserContext);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([]);

  const getData = async (user, setData) => {
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

  const addQuantity = async (product) => {
    setNewQuantity(newQuantity + 1);

    // console.log("prueba", newQuantity);

    const productRef = doc(
      db,
      "users",
      user.userData.email,
      "cart",
      product.name
    );

    await updateDoc(productRef, {
      quantity: newQuantity,
    });
  };

  const subQuantity = async (product) => {
    if (newQuantity > 1) {
      setNewQuantity(newQuantity - 1);

      const productRef = doc(
        db,
        "users",
        user.userData.email,
        "cart",
        product.name
      );

      await updateDoc(productRef, {
        quantity: newQuantity,
      });
    }
  };

  const deleteProduct = async (item, setData) => {
    const docRef = doc(db, "users", user.userData.email, "cart", item.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
      getData(user, setData);
    } else {
      // console.log("No such document!");
    }
  };

  // useEffect(() => {
  //   getQuantity();
  // }, [setNewQuantity]);

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
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>${item.price}</Text>
      </View>
      <View style={{ marginRight: 20, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{newQuantity}</Text>
        <View style={style.actionBtn}>
          <IonIcon
            name="ios-remove"
            size={25}
            color={COLORS.white}
            onPress={() => subQuantity(item)}
          />
          <IonIcon
            name="ios-add"
            size={25}
            color={COLORS.white}
            onPress={() => addQuantity(item)}
          />
        </View>
        <View style={style.deleteBtn}>
          <IonIcon
            name="ios-trash"
            size={25}
            color={COLORS.dark}
            onPress={() => deleteProduct(item, setData)}
          />
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const style = StyleSheet.create({
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
  deleteBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.light,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
