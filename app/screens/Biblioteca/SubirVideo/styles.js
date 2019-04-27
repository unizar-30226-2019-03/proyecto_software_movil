import { StyleSheet, Dimensions } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, Azul } from "../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewSelectVideo: {
    borderWidth: 2,
    borderColor: "grey",
    borderStyle: "dashed",
    borderRadius: 4,
    width: ScreenWidth,
    height: FullScreen16_9_Height,
    justifyContent: "center",
    alignItems: "center"
  },
  selectVideoButton: {
    margin: 90,
    width: 177,
    height: 47,
    backgroundColor: Azul
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
    color: Azul
  },
  viewInput: {
    paddingTop: 18,
    paddingHorizontal: 8
  },
  viewSelectThumbnail: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 18
  },
  selectThumbnail: {
    backgroundColor: Azul
  },
  imageThumbnail: {
    aspectRatio: 16 / 9,
    height: 70,
    borderRadius: 3
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
    backgroundColor: Azul
  }
});
