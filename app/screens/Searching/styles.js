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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
  },
  videoMargin: {
    marginBottom: 10
  },
  subjectMargin: {
    marginBottom: 5
  },
  activeTab: {
    textAlign: "center",
    paddingVertical: 20,
    color: "black"
  },
  inactiveTab: {
    textAlign: "center",
    paddingVertical: 20,
    color: "lightgrey"
  },
  activeSwap: {
    width: 205,
    borderBottomWidth: 2
    /*     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22 */
  },
  inactiveSwap: {
    width: 205
    /*     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22 */
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
