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
    shadowRadius: 2.22
  },
  videoMargin: {
    marginBottom: 10
  },
  subjectMargin: {
    marginBottom: 5
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
    /*     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22 */
  },
  inactiveSwap: {
    flex: 0.5,
    borderBottomWidth: 1.5,
    borderColor: "lightgray"
    /*     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22 */
  },
  loadingCircleView: {
    paddingTop: 240
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
