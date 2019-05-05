import { StyleSheet } from "react-native";

import {
  HalfScreenWidth,
  HalfScreen16_9_Height,
  GrisClaro
} from "../../constants";

export default StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 17
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row"
  },
  videoThumbnailContainer: {
    width: HalfScreenWidth,
    height: HalfScreen16_9_Height
  },
  titleYInfoContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 1
  },
  duracionYLikesContainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 4,
  },
  dropDownMenuContainer: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  optionsIcon: {
    fontSize: 14
  },
  title: {
    fontSize: 16
  },
  info: {
    fontSize: 13,
    marginTop: 3,
    color: GrisClaro
  },
  duracion: {
    fontSize: 15,
    color: "white",
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: 5,
    paddingHorizontal: 5
  },
  likes: {
    fontSize: 15,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5,
    paddingHorizontal: 5
  },
  popUpMenuText: {
    fontSize: 17
  }
});
