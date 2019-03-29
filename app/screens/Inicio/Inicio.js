import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";

import styles from "./styles";

export default class Inicio extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="70%"
						duracion="1:10"
						title="Nombre bastante largo para ser un nombre de un video de prueba"
						info="Hece 3 meses"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="10%"
						duracion="1:10:60"
						title="Nombre corto"
						info="Hece 1 día"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="70%"
						duracion="0:50"
						title="Nombre largooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
						info="Hece 3 años"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
					<FullScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="5:10:60"
						title="Nombre normal"
						info="Hece 2 horas"
						asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
						asignaturaName="Multiprocesadores"
					/>
				</ScrollView>
			</View>
		);
	}
}
