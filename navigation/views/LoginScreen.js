import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { db } from "../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../assets/helpers/constants";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      if (password === user.userData.password) {
        navigation.navigate("Main", { user });
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  };

  return (
    <View style={style.container}>
      <View style={style.Middle}>
        <Text style={style.LoginText}>Inicio de sesión</Text>
      </View>
      <View style={style.text2}>
        <Text>¿No estás registrado? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={style.signupText}> ¡Registrate!</Text>
        </TouchableOpacity>
      </View>

      <View style={style.buttonStyle}>
        <View style={{ marginTop: 10, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>Correo</Text>
          <TextInput
            style={style.input}
            placeholder="Correo electrónico"
            onChangeText={(email) => setEmail(email)}
          >
            {/* <IonIcon name="mail" size={20}></IonIcon> */}
          </TextInput>
        </View>
        <View style={{ marginTop: 10, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Contraseña
          </Text>
          <TextInput
            style={style.input}
            placeholder="Contraseña"
            onChangeText={(password) => setPassword(password)}
          >
            {/* <IonIcon name="mail" size={20}></IonIcon> */}
          </TextInput>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View style={style.btnContainer}>
            <Text style={style.btnText}>Ingresar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 15,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoginScreen;
