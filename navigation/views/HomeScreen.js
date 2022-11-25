import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { COLORS } from "../../assets/helpers/constants";

import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const images = [
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCTJP0stxQ8F6Tj6y2k2u9lD0x4Q9nlChVeHASYBtdL08gbh-S",
  "https://assets.xboxservices.com/assets/6a/57/6a578e53-43da-4456-a068-c66eff863a89.png?n=EA_Play_Hero_Tile_16x9-v2-Dark.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLUlJOZ8tUuSOLBs5_P8gR59h-nN-4ijG07A&usqp=CAU",
  "https://electrek.co/wp-content/uploads/sites/3/2016/11/drive-to-believe-hero-22x-e1479669607200.jpg?quality=82&strip=all",
  "https://lh6.googleusercontent.com/M9e_xYLMiI0x0LWfpDeAth7nkw76NBkyneVPppVe0ziHpH4rX3VTlaSWaaaIfWjEyIaZulU3hbLJ0EWlSicg5-f1Wx2vm5S7sO27mUtmXOxPKDENz9Rua-vaCSUR4qks=w1280",
];

const WIDTH = Dimensions.get("window").width;

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [imgActive, setimgActive] = useState(0);

  const [productData, setProductData] = useState([]);
  const [randomProduct, setRandomProduct] = useState([]);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setimgActive(slide);
      }
    }
  };

  // const getData = async () => {
  //   let data = [];
  //   const productsRef = collection(db, "products");
  //   const products = await getDocs(productsRef);
  //   const productsList = products.docs.map((doc) => {
  //     if (doc.exists()) {
  //       data.push(doc.data());
  //     }
  //   });
  //   setProductData(data);
  // };

  const getData = async () => {
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

  const randomData = (products) => {
    let data = [];
    for (let i = 0; i < 4; i++) {
      data.push(products[Math.floor(Math.random() * products.length)]);
    }
    setRandomProduct(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      randomData(productData);
    }, [])
  );

  const Slider = () => {
    return (
      <View style={styles.screen}>
        {/* <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Welcome to</Text>
        <Text style={styles.HeaderText2}>ServiApp</Text>
      </View> */}

        <SafeAreaView style={styles.SliderContainer}>
          <View style={styles.Wrap}>
            <ScrollView
              scrollEventThrottle={({ nativeEvent }) => onchange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.Wrap}
            >
              {images.map((e, index) => (
                <Image
                  key={index}
                  resizeMode="stretch"
                  style={styles.Wrap}
                  source={{ uri: e }}
                />
              ))}
            </ScrollView>
            <View style={styles.WrapDot}>
              {images.map((e, index) => (
                <Text
                  key={index}
                  style={imgActive == index ? styles.DotActive : styles.Dot}
                >
                  {/* ⬤ */}
                </Text>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  const Card = ({ food }) => {
    // console.log("navigation", navigation);
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        // onPress={() => navigation.navigate("Main")}
      >
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
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Hello,</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Pepe
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 12, color: COLORS.grey }}>
            Welcome to ServiApp
          </Text>
        </View>
      </View>

      <View>
        <Slider />
      </View>

      <View style={{ marginTop: 200 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          Nuestros productos
        </Text>
      </View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={randomProduct}
        renderItem={({ item, i }) => <Card food={item} key={i} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 35,
  },
  HeaderContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: COLORS.white,
  },
  HeaderText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  HeaderText2: {
    fontSize: 20,
    fontweight: "bold",
  },
  SliderContainer: {
    flex: 1,
    marginTop: 20,
  },
  Wrap: {
    width: WIDTH,
    height: 200,
  },
  WrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  DotActive: {
    margin: 3,
    color: COLORS.dark,
  },
  Dot: {
    margin: 3,
    color: COLORS.grey,
  },
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
});
