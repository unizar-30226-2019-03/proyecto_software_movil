import React from "react";
import { Text, View, ScrollView } from "react-native";

import { SearchBar, Button } from "react-native-elements";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";

import styles from "./styles";

export default class Searching extends React.Component {
	state = {
		search: ""
	};

	updateSearch = search => {
		this.setState({ search });
	};

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<View style={styles.headerContainer}>
					<SearchBar
						placeholder="Buscar..."
						inputContainerStyle={styles.searchBarIn}
						searchIcon={false}
						containerStyle={styles.searchBarOut}
					/>
				</View>
			)
		};
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<Text>TODO: THUMBNAILS DE ASIGNATURAS AQUI</Text>
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
