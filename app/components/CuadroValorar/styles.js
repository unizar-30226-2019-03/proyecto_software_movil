import { StyleSheet, Dimensions } from "react-native";
var { windowHeight, windowWidth } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 0.3,
    borderWidth: 2
  },
  valorar: {
    flex: 0.6,
    borderWidth: 1
  },
  dejarSeguir: {
    flex: 0.4,
    borderWidth: 1
  },
  titulo: {
    flexDirection: "row"
  },
  valoracion: {
    fontSize: 20,

    flex: 0.2
  },
  popUp: {
    backgroundColor: "rgba(52,52,52,0.2)",
    flex: 1
  },
  apartados: {
    backgroundColor: "white",
    width: windowWidth * 0.99,
    height: windowHeight * 0.7,
    alignSelf: "center",
    marginVertical: 100,
    borderRadius: 30,
    alignItems: "center",
    padding: 5
  },
  apartado: {
    borderBottomWidth: 2,
    flexDirection: "row",
    padding: 10
  },
  textoApartado: {
    flex: 0.5,
    alignSelf: "center"
  },
  ratingApartado: {
    flex: 0.5,
    alignSelf: "center"
  },
  valorarTexto: {
    borderWidth: 2,
    marginVertical: 10,
    fontSize: 20,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "rgba(52,52,52,0.15)"
  },
  cancelarTexto: {
    borderWidth: 2,
    marginVertical: 10,
    fontSize: 15,
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderColor: "rgba(52,52,52,0.15)"
  }
});
