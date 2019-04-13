import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text} from "react-native-elements";


import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.boton}
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial"
						})
					}
					>

					<Text style={styles.titulo}>IR A HISTORIAL</Text>
					
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.boton}
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis vídeos"
						})
					}
					>

					<Text style={styles.titulo}>IR A MIS VIDEOS</Text>
					
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					onPress={() => 
						this.props.navigation.navigate("MisListas")}
					>

					<Text style={styles.titulo}>IR A MIS LISTAS</Text>

				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					onPress={() => 
						this.props.navigation.navigate("SubirVideo")}
					>

					<Text style={styles.titulo}>IR A SUBIR VIDEO</Text>
					
				</TouchableOpacity>
			</View>
		);
	}
}
