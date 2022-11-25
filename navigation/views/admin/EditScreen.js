import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../../assets/helpers/constants";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState } from "react";
import { Image } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";

const EditScreen = ({ navigation, route }) => {
  const { food } = route.params;
  const store = route.params.user.store;

  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);
  const [description, setDescription] = useState(food.description);
  const [image, setImage] = useState(food.image);
  const [category, setCategory] = useState(food.category);
  const [ingredients, setIngredients] = useState(food.ingredients);

  const categories = [
    { key: "1", value: "Bebidas" },
    { key: "2", value: "Comidas" },
    { key: "3", value: "Postres" },
  ];

  const update = async () => {
    const foodDoc = doc(db, "products", food.name);
    const foodSnap = await getDoc(foodDoc);
    if (foodSnap.exists()) {
      await deleteDoc(foodDoc);
      await setDoc(doc(db, "products", name), {
        name: name,
        price: price,
        description: description,
        image: image,
        category: category,
        ingredients: ingredients,
        store: store,
      });
      alert("Producto actualizado");
      navigation.goBack();
    }

    // await updateDoc(foodRef, {
    //   name: name,
    //   price: price,
    //   description: description,
    //   image: image,
    //   category: category,
    //   ingredients: ingredients,
    // });

    // alert("Producto actualizado");
    // navigation.goBack();
  };

  return (
    <View style={style.container}>
      <View style={style.Middle}>
        <Text style={style.LoginText}>Editar Producto</Text>
      </View>

      <View style={style.buttonStyle}>
        <View style={{ marginTop: 5, marginRight: 5 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Nombre del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Nombre del Producto"
            onChangeText={(text) => setName(text)}
          >
            {food.name}
          </TextInput>
          <View style={{ marginTop: 5, marginRight: 5 }}>
            <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
              Categoria del Producto
            </Text>
            <SelectList
              placeholder={food.category}
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
            >
              {food.ingredients}
            </TextInput>
          </View>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Descripción del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Descripción del producto"
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          >
            {food.description}
          </TextInput>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Precio del Producto
          </Text>
          <TextInput
            style={style.input}
            placeholder="Precio del producto"
            onChangeText={(text) => setPrice(text)}
          >
            {food.price}
          </TextInput>
        </View>

        <View style={{ marginTop: 5, marginRight: 5, marginBottom: 10 }}>
          <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
            Imagen del Producto
          </Text>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Image
              source={{ uri: food.image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => update()}>
          <View style={style.btnContainer}>
            <Text style={style.btnText}>Actualizar</Text>
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

export default EditScreen;
