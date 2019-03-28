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
  listaThumbnailContainer: {
    width: HalfScreenWidth,
    height: HalfScreen16_9_Height
  },
  optionsIconContainer: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  infoContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 1
  },
  optionsIcon: {
    fontSize: 14
  },
  title: {
    fontSize: 16
  },
  numVideos: {
    fontSize: 13,
    marginTop: 3,
    color: GrisClaro
  }
});
