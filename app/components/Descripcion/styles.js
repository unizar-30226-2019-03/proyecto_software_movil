import { StyleSheet, Dimensions } from "react-native";
var { windowHeight, windowWidth } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tituloBoton: {
    borderWidth: 2,
    padding: 5,
    flexDirection: "row"
  },
  DescripcionTitulo: {
    fontSize: 20,
    flex: 0.95,
    marginHorizontal: 5
  },
  IconoDescripcion: {
    alignSelf: "flex-end"
  },
  cuerpoDescripcion: {
    fontSize: 15
  }
});
