import React from "react";
import { Text, View, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

let MAX_CHAR_NAME = 5;

const IconoAsignaturaUniversidad = ({ image, name }) => {
	return (
		<View style={styles.container}>
			<Image source={image} style={styles.universidadIcon} />
			<View style={styles.nombreContainer}>
				<Text style={styles.asignaturaNombre}>
					{name.length > MAX_CHAR_NAME
						? name.substring(0, MAX_CHAR_NAME)
						: name}
				</Text>
			</View>
		</View>
	);
};

export default IconoAsignaturaUniversidad;
