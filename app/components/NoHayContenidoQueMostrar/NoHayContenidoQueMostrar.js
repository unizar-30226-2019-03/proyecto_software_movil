import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const NoHayContenidoQueMostrar = ({ what }) => {
	console.log(what);
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{"No hay " + what + " que mostrar"}</Text>
		</View>
	);
};

export default NoHayContenidoQueMostrar;
