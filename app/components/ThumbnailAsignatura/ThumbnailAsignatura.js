import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

const ThumbnailAsignatura = props => {
  return (
    <TouchableOpacity
      style={styles.asignaturaContainer}
      onPress={() =>
        props.navigation.navigate("Asignatura", {
          title: props.name
        })
      }
      activeOpacity={1}
    >
      <Image source={props.icon} style={styles.asignaturaIcon} margin={20} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThumbnailAsignatura;
