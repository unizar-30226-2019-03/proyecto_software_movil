import { StyleSheet } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, GrisClaro } from "../../constants";

export default StyleSheet.create({
  videoThumbnailContainer: {
    width: ScreenWidth,
    height: FullScreen16_9_Height
  },
  universidadInfoContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 10
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
    marginLeft: 10
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
    width: 70,
    height: 30,
    backgroundColor: "#000"
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
    color: "green",
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 5
  }
});
