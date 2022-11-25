import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Icon } from "react-native-elements";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { COLORS } from "../../assets/helpers/constants";
import { useContext, useState } from "react";
import { UserContext } from "../BottomNavigator";
import MenuCategories from "../components/Menu/MenuCategories";
import MenuCard from "../components/Menu/MenuCard";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const MenuScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async (setProductData) => {
    let data = [];

    const productsRef = collection(db, "products");
    const products = await getDocs(productsRef);
    const productsList = products.docs.map((doc) => {
      if (doc.exists()) {
        data.push(doc.data());
      }
    });
    setProductData(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProductData(setProductData);
    }, [])
  );

  const searchFilterFunction = async (text) => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("name", "==", text));
    const products = await getDocs(q);
    const productsList = products.docs.map((doc) => {
      if (doc.exists()) {
        return doc.data();
      }
    });
    setProductData(productsList);

    setSearch(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Hello,</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              {user.userData.name}
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 12, color: COLORS.grey }}>
            What do you want today?
          </Text>
        </View>
        <View style={style.imageTop}>
          <Image
            source={{
              uri: "https://cdn.smehost.net/sonymusiccommx-mxprod/wp-content/uploads/2020/12/Ozuna-Header-1920x964.png",
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for food"
            onChangeText={(text) => searchFilterFunction(text)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white}></Icon>
        </View>
      </View>
      <View>
        <MenuCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={productData}
        renderItem={({ item, i }) => (
          <MenuCard food={item} key={i} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default MenuScreen;
