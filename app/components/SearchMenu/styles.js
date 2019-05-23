import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    
  },
  appLogo: {
    width: 35,
    height: 35,
    marginLeft: 5,
  },
  appText: {
    width: 99,
    height: 30,
    marginLeft: 5,
    marginBottom: 10,
  },
  userButton: {
    marginRight: 15,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignSelf: "center",
  },
  searchButton: {
    marginRight: 15,
    alignSelf: "center",
    marginLeft: 30
  },
  searchIcon: {
    color: "#000",
    fontSize: 27
  }
});
