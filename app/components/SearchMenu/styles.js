import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  appLogo: {
    width: 35,
    height: 35,
    marginLeft: 5
  },
  appText: {
    width: 99,
    height: 30,
    marginLeft: 5,
    marginBottom: 10
  },
  userButton: {
    marginRight: 15
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignSelf: "center"
  },
  searchButton: {
    marginRight: 30,
    alignSelf: "center"
  },
  searchIcon: {
    color: "#000",
    fontSize: 27
  }
});
