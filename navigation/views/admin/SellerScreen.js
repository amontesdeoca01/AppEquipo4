import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "../../../assets/helpers/constants";
import { db } from "../../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const SellerScreen = ({ navigation, route }) => {
  const { userData } = route.params.user;
  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    let data = [];
    const productsRef = collection(db, "products");
    const products = await getDocs(productsRef);
    const productsList = products.docs.map((doc) => {
      if (doc.exists()) {
        if (doc.data().store == userData.store) {
          data.push(doc.data());
        }
      }
    });
    setProductData(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [])
  );

  const Card = ({ food, userData }) => {
    const deleteItem = async () => {
      const foodRef = doc(db, "products", food.name);
      await deleteDoc(foodRef);
      getProducts();
      alert("Producto eliminado");
    };

    return (
      <View underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.card}>
          <View style={{ alignItems: "center", top: -40 }}>
            <Image
              source={{ uri: food.image }}
              style={{ height: 120, width: 120, resizeMode: "contain" }}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.name}
            </Text>
          </View>
          <View style={styles.fixToText}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Edit", {
                  food: food,
                  user: userData,
                })
              }
            >
              <View style={styles.btnContainerEdit}>
                <Text style={styles.btnText}>Editar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteItem()}>
              <View style={styles.btnContainerDelete}>
                <Text style={styles.btnText}>Eliminar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Hola,</Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              {userData.name}
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 12, color: COLORS.grey }}>
            Bienvenido a ServiApp
          </Text>
        </View>

        <View style={{ marginTop: 15, flexDirection: "row", fontSize: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Tienda: </Text>
          <Text>{userData.store}</Text>
        </View>
      </View>

      <View style={{ marginTop: 35 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          Tus productos
        </Text>
      </View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={productData}
        renderItem={({ item }) => <Card food={item} userData={userData} />}
      />

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add", { store: userData.store })}
        >
          <View style={styles.btnContainerAdd}>
            <Text style={styles.btnText}>Añadir</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SellerScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: COLORS.white,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  btnContainerEdit: {
    backgroundColor: "#2089dc",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  btnContainerDelete: {
    backgroundColor: "#ff2d21",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  btnContainerAdd: {
    backgroundColor: COLORS.primary,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 20,
  },
});
