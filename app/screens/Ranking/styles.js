import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewFilter: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rankingTitle: {
    fontWeight: "bold",
    fontSize: 17
  },
  searchBarContainer: {
    width: 190,
    backgroundColor: "white",
    borderRadius: 7
  },
  searchBar: {
    backgroundColor: "lightgrey"
  },
  rankingPlace: {
    paddingHorizontal: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "lightgrey"
  },
  rankNumber: {
    fontSize: 17,
    fontWeight: "bold"
  },
  rankScore: {
    fontSize: 20,
    fontWeight: "bold"
  },
  hidden: {
    opacity: 0
  }
});
