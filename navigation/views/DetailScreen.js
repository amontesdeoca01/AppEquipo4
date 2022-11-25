import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { MDIcon } from "../../assets/helpers/icons";
import { COLORS } from "../../assets/helpers/constants";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { Alert } from "react-native";

const getData = async (user, item, setIconName, setFavorite) => {
  const products = await getDocs(
    collection(db, "users", user.userData.email, "favoriteProducts")
  );

  if (products.docs.length > 0) {
    products.docs.map((product) => {
      if (product.data().name === item.name) {
        setIconName("favorite");
        setFavorite(true);
      }
    });
  } else {
    // console.log("no products");
  }
};

const IsFavorite = ({ prop }) => {
  return <MDIcon name={prop} size={25} color={COLORS.primary} />;
};

const handleCart = async (item, user, navigation) => {
  const cartRef = doc(db, "users", user.userData.email, "cart", item.name);
  // console.log("trying to add to cart", item.name);

  const cartItem = await getDoc(cartRef);
  if (cartItem.exists()) {
    // console.log("item already in cart");
    Alert.alert("Item already in cart");
    return;
  }

  await setDoc(cartRef, {
    name: item.name,
    price: item.price,
    image: item.image,
    ingredients: item.ingredients,
    quantity: 1,
  });
  // console.log("item added to cart");
  Alert.alert("Item added to cart");
  navigation.goBack();
};

const DetailScreen = ({ navigation, route }) => {
  const item = route.params.food;
  const user = route.params.user;
  const [favorite, setFavorite] = useState(false);
  const [iconName, setIconName] = useState("favorite-border");
  const favoriteProductsRef = doc(
    db,
    "users",
    user.userData.email,
    "favoriteProducts",
    item.name
  );

  useEffect(() => {
    getData(user, item, setIconName, setFavorite);
  }, []);

  const handleFavorite = async (favorite, item) => {
    if (favorite) {
      await deleteDoc(favoriteProductsRef);
      setIconName("favorite-border");
      setFavorite(false);
    } else {
      await setDoc(favoriteProductsRef, {
        category: item.category,
        description: item.description,
        image: item.image,
        ingredients: item.ingredients,
        name: item.name,
        price: item.price,
        store: item.store,
      });
      setIconName("favorite");
      setFavorite(true);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <TouchableOpacity onPress={navigation.goBack}>
        <View style={style.header}>
          <MDIcon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ height: 220, width: 220, resizeMode: "contain" }}
          />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
            >
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => handleFavorite(favorite, item)}>
              <View style={style.iconContainer}>
                <IsFavorite prop={iconName} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={style.detailsText}>
            Ingredientes: {item.ingredients}
          </Text>
          <Text style={style.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <TouchableOpacity
              onPress={() => handleCart(item, user, navigation)}
            >
              <View style={style.btnContainer}>
                <Text style={style.btnText}>Add To Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginBottom: -10,
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
});

export default DetailScreen;
