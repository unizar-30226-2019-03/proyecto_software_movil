import { StyleSheet } from "react-native";
import { GrisClaro } from "../../constants";
export default StyleSheet.create({
  container: {
    flex: 1
  },
  todoElTexto: {
    flexDirection: "row",
    marginVertical: 7
  },
  tiempo: {
    color: GrisClaro,
    textAlignVertical: "top",
    marginTop: 4,
    marginLeft: 2,
    marginRight: 3,
    fontSize: 15
  },
  nombreUsuario: {
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "top"
  },
  cuerpoComentario: {
    fontSize: 20,
    textAlign: "left",

    color: "black",
    fontWeight: "normal",
    marginLeft: 5
  }
});
