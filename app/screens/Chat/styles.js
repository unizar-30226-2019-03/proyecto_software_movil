import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { GrisChat, GrisClaro } from "../../constants";
export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userIcon: {
    width: 35,
    height: 35,
    alignSelf: "center",
    borderRadius: 50
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15
  },
  container: {
    flex: 1
  },
  entradaTexto: {
    height: height * 0.1,
    borderWidth: width * 0.005,
    borderRadius: width * 0.15,
    marginHorizontal: width * 0.02,
    borderColor: GrisClaro,
    padding: width * 0.02
  },
  vista: {
    flex: 1
  }
});
