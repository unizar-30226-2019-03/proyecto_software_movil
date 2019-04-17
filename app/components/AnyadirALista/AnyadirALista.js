import React from "react";
import {
	View,
	TouchableHighlight,
	Modal,
	Text,
	TouchableWithoutFeedback,
	ScrollView
} from "react-native";

import { Divider } from "react-native-elements";

import styles from "./styles";

const AnyadirALista = props => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={props.visible}
			onRequestClose={props.hide}
			onBackdropPress={props.hide}
		>
			<TouchableHighlight
				style={styles.container}
				onPress={props.hide}
				activeOpacity={1}
			>
				<TouchableWithoutFeedback>
					<View style={styles.anyadirAListaContainer}>
						<View style={styles.guardarYNuevaListaContainer}>
							<Text style={styles.texto}>Guardar vídeo en...</Text>
							<Text style={styles.nuevaListaTexto}>+NUEVA LISTA</Text>
						</View>
						<Divider style={{ backgroundColor: "gray" }} />
						<ScrollView>
							<Text style={styles.texto}>UNO</Text>
							<Text style={styles.texto}>DOS</Text>
							<Text style={styles.texto}>TRES</Text>
							<Text style={styles.texto}>CUATRO</Text>
							<Text style={styles.texto}>CINCO</Text>
							<Text style={styles.texto}>SEIS</Text>
							<Text style={styles.texto}>SIETE</Text>
						</ScrollView>
						<Text style={styles.texto}>Listo</Text>
					</View>
				</TouchableWithoutFeedback>
			</TouchableHighlight>
		</Modal>
	);
};

export default AnyadirALista;
