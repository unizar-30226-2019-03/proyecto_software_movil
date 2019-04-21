import { StyleSheet } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, GrisClaro } from "../../constants";

export default StyleSheet.create({
  videoThumbnailContainer: {
    width: ScreenWidth,
    height: FullScreen16_9_Height
  },
  universidadInfoContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 10
  },
  titleYInfoContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 15
  },
  duracionYLikesContainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 7
  },
  asignaturaContainer: {
    marginLeft: 10,
    marginTop: 7
  },
  title: {
    fontSize: 18
  },
  info: {
    fontSize: 14,
    marginTop: 3,
    color: GrisClaro
  },
  duracion: {
    fontSize: 18,
    color: "white",
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: 5
  },
  likes: {
    fontSize: 18,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5
  }
});
