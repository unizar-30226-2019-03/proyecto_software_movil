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
    flex: 1,
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 10
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  duracionYLikesContainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 7
  },
  asignaturaContainer: {
    marginLeft: 10,
    width: 80,
    marginTop: 7
  },
  title: {
    fontSize: 18
  },
  fecha: {
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
    color: VerdeClaro,
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5
  }
});
