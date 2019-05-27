import { StyleSheet, Dimensions } from "react-native";

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
  entradaTexto: {
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 7,
    borderColor: GrisClaro,
    padding: 5,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "center"
  },
  vista: {
    flex: 1
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
  lista: {
    marginBottom: 7
  },
  aviso: {
    backgroundColor: GrisChat,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
    width: 200,
    padding: 10
  }
});
