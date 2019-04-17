import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewFilter: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rankingTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  dropDownMenuContainer: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5
  },
  rankingPlace: {
    paddingHorizontal: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgrey"
  },
  rankNumber: {
    fontSize: 17,
    fontWeight: "bold"
  },
  touchableAsign: {
    minWidth: 80
  },
  rankScore: {
    fontSize: 20,
    fontWeight: "bold"
  },
  hidden: {
    opacity: 0
  }
});
