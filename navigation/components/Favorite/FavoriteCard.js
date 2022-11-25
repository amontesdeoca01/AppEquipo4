import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../../assets/helpers/constants";
import { db } from "../../../firebase-config";

const FavoriteCard = ({ item, user, setData }) => {
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

  const deleteFavorite = async (name, user, setData) => {
    const docRef = doc(
      db,
      "users",
      user.userData.email,
      "favoriteProducts",
      name
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
      getData(user, setData);
    } else {
      // console.log("No such document!");
    }
  };
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
        <TouchableOpacity
          onPress={() => deleteFavorite(item.name, user, setData)}
        >
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

export default FavoriteCard;

const style = StyleSheet.create({
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
});
