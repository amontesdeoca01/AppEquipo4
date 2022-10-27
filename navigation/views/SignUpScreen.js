import { Text, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { IonIcon } from "../../assets/helpers/icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../../firebase-config";

import { useState } from "react";
import { COLORS } from "../../assets/helpers/constants";
import { collection, doc, setDoc } from "firebase/firestore";

const LoginScreen3 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const users = collection(db, "users");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    } else {
      await setDoc(doc(users, email), {
        email: email,
        password: password,
      });
      alert("Registro exitoso");
      navigation.navigate("Login");
    }
  };

  return (
    <View style={style.container}>
      <View style={style.Middle}>
        <Text style={style.LoginText}>Registrate</Text>
      </View>
      <View style={style.text2}>
        <Text>¿Ya tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={style.signupText}> ¡Inica Sesión!</Text>
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
        <View style={{ marginTop: 10, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Contraseña
          </Text>
          <TextInput
            style={style.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          >
            {/* <IonIcon name="mail" size={20}></IonIcon> */}
          </TextInput>
        </View>
        <View style={{ marginTop: 10, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Confirmar Contraseña
          </Text>
          <TextInput
            style={style.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          >
            {/* <IonIcon name="mail" size={20}></IonIcon> */}
          </TextInput>
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <View style={style.btnContainer}>
            <Text style={style.btnText}>Registrarme</Text>
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

export default LoginScreen3;
