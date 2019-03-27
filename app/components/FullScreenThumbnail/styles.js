import { StyleSheet } from "react-native";

import {
  ScreenWidth,
  FullScreen16_9_Height,
  GrisClaro,
  VerdeClaro
} from "../../constants";

export default StyleSheet.create({
  videoThumbnailContainer: {
    width: ScreenWidth,
    height: FullScreen16_9_Height
  },
  universidadInfoContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center"
  },
  infoContainer: {
    marginLeft: 10
  },
  duracionYLikesContainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 7
  },
  asignaturaContainer: {
    alignSelf: "center",
    marginLeft: 10,
    width: 80,
    marginTop: 3
  },
  title: {
    fontSize: 18
  },
  fecha: {
    fontSize: 14,
    marginTop: 3,
    color: GrisClaro
  },
  asignaturaIcon: {
    fontSize: 20
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
    color: VerdeClaro,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5
  }
});
