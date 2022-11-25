import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, categories } from "../../../assets/helpers/constants";
import { Icon } from "react-native-elements";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config";

const MenuCategories = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const categoryFilter = async (category) => {
    const productsRef = collection(db, "products");
    const products = query(productsRef, where("category", "==", category));
    const productsSnapshot = await getDocs(products);
    const productsList = productsSnapshot.docs.map((doc) =>
      console.log("si", doc.data())
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categoriesListContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => categoryFilter(category.name)}
        >
          <View
            style={style.categoryBtn}
            // style={{
            //   backgroundColor:
            //     selectedCategoryIndex == index
            //       ? COLORS.primary
            //       : COLORS.secondary,
            //   ...style.categoryBtn,
            // }}
          >
            <View style={style.categoryBtnImgCon}>
              <Icon name={category.icon} type="font-awesome-5" size={25} />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: COLORS.secondary,
                // color:
                //   selectedCategoryIndex == index
                //     ? COLORS.white
                //     : COLORS.primary,
              }}
            >
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignitems: "center",
  },
});

export default MenuCategories;
