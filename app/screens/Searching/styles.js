import { StyleSheet } from "react-native";

import { ScreenWidth, GrisFondoBarraBusqueda } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey"
  },
  videoMargin: {
    marginBottom: 10
  },
  subjectMargin: {
    marginBottom: 5
  },
  swapButton: {
    width: 205
  },
  headerContainer: {
    width: ScreenWidth - 56
  },
  searchBarIn: {
    backgroundColor: 0x00f
  },
  searchBarOut: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0
  }
});
