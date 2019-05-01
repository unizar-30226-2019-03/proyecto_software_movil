import { StyleSheet, Dimensions } from "react-native";
var { windowHeight, windowWidth } = Dimensions.get("window");
import { GrisClaro } from "../../constants/constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2
  },
  valorar: {
    flex: 0.2,
    borderWidth: 1
  },
  dejarSeguir: {
    flex: 0.2,
    borderWidth: 1,
    marginTop: "20%"
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
    height: windowHeight * 0.7,
    alignSelf: "center",
    marginVertical: 100,
    borderRadius: 30,
    alignItems: "center",
    padding: 5
  },
  apartado: {
    borderBottomWidth: 2,
    width: windowWidth / 2,
    flexDirection: "column",
    flex: 1,
    padding: 5,
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
    fontSize: 20,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    borderColor: "rgba(52,52,52,0.15)"
  },
  cancelarTexto: {
    borderBottomWidth: 4,
    marginVertical: 10,
    fontSize: 15,
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderColor: "rgba(52,52,52,0.15)"
  },
  botonValorar: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgba(52,52,52,0.15)",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 3,
    flexDirection: "row",
    width: "40%",
    padding: 5
  }
});
