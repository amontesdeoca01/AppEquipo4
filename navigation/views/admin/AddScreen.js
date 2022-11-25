import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import { COLORS } from "../../../assets/helpers/constants";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { SelectList } from "react-native-dropdown-select-list";
import { Image } from "react-native-elements";

const AddScreen = ({ navigation, route }) => {
  const { store } = route.params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://media-exp1.licdn.com/dms/image/D5603AQGjIaPVp3w-Lw/profile-displayphoto-shrink_200_200/0/1664303157749?e=1674086400&v=beta&t=XRhDgGn5XXv7xo3XzPjXXsNL4hOE549xIjgzn5w8dyw"
  );
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");

  const categories = [
    { key: "1", value: "Bebidas" },
    { key: "2", value: "Comidas" },
    { key: "3", value: "Postres" },
  ];

  // const getPicturesFromGallery = async () => {
  //   CameraRoll.getPhotos({
  //     first: 20,
  //     assetType: "Photos",
  //   })
  //     .then((r) => {
  //       setImage(r.edges[0].node.image.uri);
  //     })
  //     .catch((err) => {
  //       //Error Loading Images
  //     });
  // };

  const add = async () => {
    const foodRef = doc(db, "products", name);
    await setDoc(foodRef, {
      category: category,
      description: description,
      image: image,
      ingredients: ingredients,
      name: name,
      price: price,
      store: store,
    });
    alert("Producto agregado");
    navigation.goBack();
  };
  return (
    <View style={style.container}>
      <View style={style.Middle}>
        <Text style={style.LoginText}>Añadir Producto</Text>
      </View>

      <View style={style.buttonStyle}>
        <View style={{ marginTop: 5, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Nombre del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Nombre del Producto"
            T
            onChangeText={(text) => setName(text)}
          ></TextInput>
        </View>
        <View style={{ marginTop: 5, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Categoria del Producto
          </Text>
          <SelectList
            setSelected={(val) => setCategory(val)}
            data={categories}
            save="value"
            search={false}
          />
        </View>
        <View style={{ marginTop: 5, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Ingredientes
          </Text>
          <TextInput
            style={style.input}
            placeholder="Ingredientes"
            onChangeText={(text) => setIngredients(text)}
          ></TextInput>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Descripción del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Descripción del producto"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
          ></TextInput>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Precio del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Precio del producto"
            onChangeText={(text) => setPrice(text)}
          ></TextInput>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Imagen del Producto
          </Text>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => add()}>
          <View style={style.btnContainer}>
            <Text style={style.btnText}>Añadir</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={style.btnContainerCancel}>
            <Text style={style.btnText}>Cancelar</Text>
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
    marginTop: 60,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: -20,
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
  },
  btnContainerCancel: {
    backgroundColor: COLORS.grey,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddScreen;
