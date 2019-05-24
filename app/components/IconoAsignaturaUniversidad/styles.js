import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    width: 85
  },
  nombreContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  universidadIcon: {
    width: 35,
    height: 35,
    alignSelf: "center",
    borderRadius: 30

  },
  asignaturaNombre: {
    fontSize: 14,
    alignSelf: "center"
  }
});
