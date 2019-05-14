import React from "react";

import { Button } from "react-native-elements";

import { Text, View } from "react-native";

import { Azul } from "../../constants";

import RippleTouchable from "../../components/RippleTouchable";

import styles from "./styles";

const BotonSeguirAsignatura = props => {
	return (
		<RippleTouchable
			disabled={props.disabled}
			onPress={() => props.callback()}
			style={[styles.buttonSeguirAsignatura, { backgroundColor: props.asignaturaSeguida ? "darkgrey" : Azul }]}
		>
			<Text style={styles.text}>{props.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}</Text>
		</RippleTouchable>
	);
};

export default BotonSeguirAsignatura;
