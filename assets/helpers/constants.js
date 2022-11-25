const COLORS = {
  white: "#fff",
  dark: "#000",
  primary: "#F9813A",
  secondary: "#fedac5",
  light: "#E5E5E5",
  grey: "#908e8c",
};

const categories = [
  { id: "1", name: "Comidas", icon: "hamburger" },
  { id: "2", name: "Bebidas", icon: "beer" },
  { id: "3", name: "Postres", icon: "ice-cream" },
];

const stores = ["Comida Sana", "Cafetería", "Comida rápida"];

let foods = [
  {
    id: 1,
    name: "Salmon bowl",
    ingredients: "Salmon, salad, rice, cream, avacado",
    price: 20,
    image:
      "https://64.media.tumblr.com/10c7690fda9446e84eaeef71513cee9f/tumblr_o9vgitLOEh1uyxczto1_500.png",
  },
  {
    id: 2,
    name: "Burger",
    ingredients: "Bread, meat, salad, cheese, tomato",
    price: 10,
    image:
      "https://www.burgerking.com.mx/wp-media-folder-bk-mex//home/ubuntu/wordpress/web/app/uploads/sites/3/2021/02/1200x800_02_Whopper-1-1.png",
  },
  {
    id: 3,
    name: "Pizza",
    ingredients: "Flour, tomato, cheese, meat, salad",
    price: 15,
    image:
      "https://i.pinimg.com/originals/55/b0/b7/55b0b72920fb7a4e3aeed01cdf73aa89.png",
  },
  {
    id: 4,
    name: "Hotdog",
    ingredients: "Bread, meat, salad, cheese, tomato",
    price: 8,
    image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c1b7.png",
  },
];

export { COLORS, categories, foods, stores };
