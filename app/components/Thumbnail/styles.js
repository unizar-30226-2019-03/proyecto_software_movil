import { StyleSheet } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, GrisClaro } from "../../constants";

export default StyleSheet.create({
  videoThumbnailContainer: {
    width: ScreenWidth,
    height: FullScreen16_9_Height
  },
  universidadInfoContainer: {
    flexDirection: "row"
  },
  infoContainer: {},
  title: {
    fontSize: 18
  },
  fecha: {
    fontSize: 14,
    color: GrisClaro
  },
  asignaturaIcon: {
    width: 70,
    height: 30,
    backgroundColor: "#000"
  }
});
