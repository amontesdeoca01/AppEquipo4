import { useContext } from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { COLORS } from "../../../assets/helpers/constants";
import { UserContext } from "../../BottomNavigator";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const MenuCard = ({ navigation, food }) => {
  console.log(food);
  const user = useContext(UserContext);
  return (
    <TouchableHighlight
      underlayColor={COLORS.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Details", { food, user })}
    >
      <View style={style.card}>
        <View style={{ alignItems: "center", top: -40 }}>
          <Image
            source={{ uri: food.image }}
            style={{ height: 120, width: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{food.name}</Text>
          <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
            {food.ingredients}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            ${food.price}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
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

export default MenuCard;
