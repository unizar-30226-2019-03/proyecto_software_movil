import { StyleSheet, Dimensions } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, Azul } from "../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewSelectVideo: {
    borderWidth: 2,
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
    fontSize: 18,
    marginBottom: 2
  },
  pickerAsign: {
    width: 200,
    color: Azul
  },
  viewInput: {
    paddingTop: 18,
    paddingHorizontal: 8
  },
  viewSelectThumbnail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 40,
    height: 70
  },
  selectThumbnail: {
    backgroundColor: Azul
  },
  selectImageButton: {
    width: 150,
    marginRight: 28
  },
  imageThumbnail: {
    aspectRatio: 16 / 9,
    height: 70,
    borderRadius: 3,
    marginRight: 30
  },
  uploadButtonView: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  uploadButton: {
    marginRight: 12,
    marginBottom: 12,
    width: 120,
    backgroundColor: Azul
  },
  imageErrText: {
    color: "red",
    padding: 5,
    borderWidth: 1,
    borderColor: "red",
    marginRight: 24.5,
    borderRadius: 3
  }
});
