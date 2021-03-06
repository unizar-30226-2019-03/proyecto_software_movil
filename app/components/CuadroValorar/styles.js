import { StyleSheet, Dimensions } from "react-native";
var { windowHeight, windowWidth } = Dimensions.get("window");
import { GrisClaro } from "../../constants/constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2
  },
  valorar: {
    height: 130,
    maxHeight: 130
  },

  titulo: {
    flexDirection: "row"
  },
  valoracion: {
    fontSize: 20,

    flex: 0.2
  },
  fecha: {
    color: GrisClaro
  },

  popUp: {
    backgroundColor: "rgba(52,52,52,0.2)",
    flex: 1
  },
  apartados: {
    backgroundColor: "white",
    width: windowWidth,
    maxHeight: 500,
    height: "80%",

    alignSelf: "center",
    marginVertical: "10%",
    borderRadius: 30,
    alignItems: "center",
    padding: 5
  },
  apartado: {
    borderBottomWidth: 2,
    width: windowWidth / 2,
    flexDirection: "column",
    flex: 1,

    alignItems: "center",
    marginHorizontal: "10%"
  },
  textoApartado: {
    alignSelf: "center",
    fontSize: 20,
    marginRight: 5
  },

  valorarTexto: {
    borderBottomWidth: 4,
    marginVertical: 10,
    fontSize: 25,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    borderColor: "rgba(52,52,52,0.15)"
  },
  cancelarTexto: {
    borderBottomWidth: 4,
    marginVertical: 10,
    fontSize: 20,
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderColor: "rgba(52,52,52,0.15)"
  },
  botonValorar: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgba(52,52,52,0.15)",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 3,
    flexDirection: "row",
    width: "40%",
    padding: 5
  }
});
