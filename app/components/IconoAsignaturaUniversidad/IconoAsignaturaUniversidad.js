import React from "react";
import { Text, View, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

let MAX_CHAR_NAME = 5;

const IconoAsignaturaUniversidad = props => {
	return (
		<View style={styles.container}>
			<Image source={props.image} style={styles.universidadIcon} />
			<View style={styles.nombreContainer}>
				<Text style={styles.asignaturaNombre}>
					{props.name.length > MAX_CHAR_NAME
						? props.name.substring(0, MAX_CHAR_NAME)
						: props.name}
				</Text>
			</View>
		</View>
	);
};

export default IconoAsignaturaUniversidad;
