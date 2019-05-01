import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default class Mensaje extends React.Component {
	render() {
		return (
			<View
				style={[
					this.props.tipo == "entrante" ? styles.entrante : styles.saliente
				]}
			>
				<Text style={styles.texto}>{this.props.mensaje}</Text>
				<Text style={styles.textoSmall}>{this.props.fecha}</Text>
			</View>
		);
	}
}
