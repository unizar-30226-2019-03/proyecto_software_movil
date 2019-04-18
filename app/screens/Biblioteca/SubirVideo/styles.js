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
    color: "blue"
    //borderWidth: 1,
    //borderColor: "grey"
  },
  viewInput: {
    paddingTop: 18,
    paddingHorizontal: 8,
  },
  viewSelectThumbnail: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 18,
  },
  imageThumbnail: {
    aspectRatio: 16/9,
    height: 70,
    borderRadius: 3,
  },
  uploadButtonView: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  uploadButton: {
    marginRight: 12,
    marginBottom: 7,
    width: 120,
  }

});
