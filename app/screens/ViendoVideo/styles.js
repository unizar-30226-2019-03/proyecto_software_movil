import { StyleSheet } from "react-native";
import {
  FullScreenWidth,
  FullScreen16_9_Height,
  Azul,
  GrisClaro
} from "../../constants";

import { StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  dejarDeSeguir: {
    marginVertical: 5,
    marginHorizontal: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  botonDejarSeguir: {
    borderWidth: 2,
    marginLeft: 120,
    padding: 5,
    backgroundColor: Azul,
    borderColor: GrisClaro,
    borderRadius: 10
  },
  textInput: {
    flex: 4,
    marginLeft: 20,
    marginRight: 5
  },
  enviar: {
    fontSize: 16,
    alignSelf: "center",
    marginHorizontal: 4,
    color: GrisClaro
  },
  entradaTexto: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    marginHorizontal: 7,
    borderColor: GrisClaro,
    padding: 5,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 2
  }
});
