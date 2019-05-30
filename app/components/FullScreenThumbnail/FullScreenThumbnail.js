/**
 * @fileoverview Thumbnail anchura igual a la pantalla de un video.
 * @author Unicast
 * @requires ../IconoAsignaturaUniversidad:IconoAsignaturaUniversidad
 */
import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";

import { VerdeClaro, RojoClaro } from "../../constants";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";

import styles from "./styles";

// TODO: Parametrizar ir a otras pantallas (a la asignatura y video que toque).

/**
 * @module FullScreenThumbnail
 * @param {Object} props props.videoId es el id del Video , props.image es la imagen del thumbnail,
 * 		props.asignaturaId es el id de la asignatura del video, props.asignaturaFullname es el
 * 		nombre de la asignatura del video, props.asignaturaName es el nombre anreviado de la asignatura
 * 		y props.asignaturaIcon el icono de la asignatura del video
 */
const FullScreenThumbnail = props => {
  const likes = Math.floor(props.likes * 20);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("ViendoVideo", { id: props.videoId })
      }
      activeOpacity={1}
    >
      <ImageBackground
        source={props.image}
        style={styles.videoThumbnailContainer}
      >
        <View style={styles.duracionYLikesContainer}>
          {props.likes != null ? (
            <Text
              style={[
                styles.likes,
                { color: likes > 49 ? VerdeClaro : RojoClaro }
              ]}
            >
              {likes + "%"}
            </Text>
          ) : null}
          <Text style={styles.duracion}>{props.duracion}</Text>
        </View>
      </ImageBackground>

      <View style={styles.universidadInfoContainer}>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Asignatura", {
                title: props.asignaturaFullName,
                id: props.asignaturaId
              })
            }
            activeOpacity={1}
            style={styles.asignaturaContainer}
          >
            <IconoAsignaturaUniversidad
              style={styles.asignaturaIcon}
              image={props.asignaturaIcon}
              name={props.asignaturaName}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleYInfoContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.info}>{props.info}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FullScreenThumbnail;
