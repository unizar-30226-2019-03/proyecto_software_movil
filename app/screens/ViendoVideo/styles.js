import { StyleSheet } from "react-native";
import {
  FullScreenWidth,
  FullScreen16_9_Height,
  Azul,
  GrisClaro
} from "../../constants";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row"
  },
  container: {
    flex: 1
  },
  videoContainer: {
    width: FullScreenWidth,
    height: FullScreen16_9_Height
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
  botonSeguir: {
    borderWidth: 2,
    marginLeft: 100,
    padding: 5,
    borderColor: Azul,
    borderRadius: 10,
    alignContent: "center"
  },
  textoDejarSeguir: {
    fontSize: 20,
    color: "white"
  },
  textoSeguir: {
    fontSize: 20
  }
});
