import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewSelectVideo: {
    justifyContent: "center",
    alignItems: "center"
  },
  selectVideoButton: {
    margin: 90,
    width: 177,
    height: 47
  },
  viewSelectAsign: {
    paddingTop: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  textAsignatura: {
    fontSize: 18
  },
  pickerAsign: {
    height: 50,
	width: 200,
	color: "blue",
	//borderWidth: 1,
	//borderColor: "grey"
  },
  viewEnterTitle: {
	paddingTop: 8,
    paddingHorizontal: 8,
  }
});
