import { StyleSheet, Dimensions } from "react-native";
var { windowHeight, windowWidth } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tituloBoton: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
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
  },
  profesoresTitulo: {
    fontSize: 20,
    borderTopWidth: 0.1,
    marginTop: 2
  },
  iconAndNameView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 20
  },
  userIcon: {
    width: 80,
    height: 80,
    //alignSelf: "flex-start",
    borderRadius: 50
  },
  userName: {
    color: "black",
    //fontWeight: "bold",
    fontSize: 20,
    width: 100
  },
  profesores: {
    marginVertical: 2
  }
});
