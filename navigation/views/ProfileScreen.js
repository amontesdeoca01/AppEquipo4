import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../assets/helpers/constants";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.Header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.Card}>
          <View style={styles.Imagecontainer}>
            <Image
              source={{
                uri: "https://cdn.smehost.net/sonymusiccommx-mxprod/wp-content/uploads/2020/12/Ozuna-Header-1920x964.png",
              }}
              style={styles.Image}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.HeaderText}>FACULTAD DE TELEMATICA</Text>
              <Text style={styles.TextStyle}>INGENIERO DE SOFTWARE</Text>
              <Text style={styles.TextStyle}>7° E</Text>
            </View>

            <View>
              <Text style={styles.TextStyle}> 20166453 </Text>
              <Text style={styles.HeaderText}>Ozuna Rosado Nestle</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 80,
    width: "90%",
  },
  Header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  Imagecontainer: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 5,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  HeaderText: {
    fontSize: 25,
    marginVertical: 5,
    textAlign: "center",
  },
  TextStyle: {
    fontSize: 15,
    marginVertical: 5,
    textAlign: "center",
  },
});

export default ProfileScreen;
