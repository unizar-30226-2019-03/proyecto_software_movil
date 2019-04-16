import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewFilter: {
    alignItems: "flex-end"
  },
  touchableFilter: {
    paddingTop: 7,
    paddingRight: 10
  },
  viewFilterMenu: {
    borderWidth: 6,
    borderColor: "red"
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
    borderColor: "lightgrey",
  },
  rankNumber: {
    fontSize: 17,
    fontWeight: "bold"
  },
  rankScore: {
	fontSize: 20,
    fontWeight: "bold"  
  }
});
