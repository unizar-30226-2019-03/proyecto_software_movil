import { StyleSheet } from "react-native";

import { HalfScreenWidth, HalfScreen16_9_Height, GrisClaro } from "../../constants";

export default StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 17,
    paddingVertical: 8
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
    marginBottom: 4
  },
  dropDownMenuContainer: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5
  },
  optionsIcon: {
    fontSize: 14,
    padding: 5
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
