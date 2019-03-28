import React from "react";
import { Text, View, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

let MAX_CHAR_NAME = 5;

const IconoAsignaturaUniversidad = () => {
	let nombre = "Aprendizaje automatico";

	return (
		<View style={styles.container}>
			<Image
				source={require("../../../test/imagenes/perfil_uni.jpg")}
				style={styles.universidadIcon}
			/>
			<View style={styles.nombreContainer}>
				<Text style={styles.asignaturaNombre}>
					{nombre.length > MAX_CHAR_NAME
						? nombre.substring(0, MAX_CHAR_NAME)
						: nombre}
				</Text>
			</View>
		</View>
	);
};

export default IconoAsignaturaUniversidad;
