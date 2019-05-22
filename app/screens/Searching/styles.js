import { StyleSheet } from "react-native";

import { ScreenWidth, GrisFondoBarraBusqueda } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  activeTab: {
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 15
  },
  inactiveTab: {
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 15
  },
  activeSwap: {
    flex: 0.5,
    borderBottomWidth: 1.5,
    borderColor: "black"
  },
  inactiveSwap: {
    flex: 0.5,
    borderBottomWidth: 1.5,
    borderColor: "lightgray"
  },
  loadingCircleView: {
    justifyContent: "center",
    flex: 1
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
  },
  videoContainer: {
    marginBottom: 10
  }
});
