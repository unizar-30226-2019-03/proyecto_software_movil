import { Dimensions, StyleSheet } from "react-native";
var { width } = Dimensions.get("window");

import { GrisChat, VerdeChat } from "../../constants";

export default StyleSheet.create({
  entrante: {
    backgroundColor: GrisChat,
    alignSelf: "flex-start",
    borderRadius: 10,
    maxWidth: width * 0.45,
    marginLeft: 5,
    marginTop: 5
  },
  saliente: {
    backgroundColor: VerdeChat,
    alignSelf: "flex-end",
    borderRadius: 10,
    maxWidth: width * 0.45,
    marginRight: 5,
    marginTop: 5
  },
  texto: {
    margin: 7,
    fontSize: 16
  }
});
