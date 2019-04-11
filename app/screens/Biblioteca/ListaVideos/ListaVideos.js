import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="70%"
						duracion="1:10"
						title="Nombre bastante largo para ser un nombre de un video de prueba"
						info="Hece 3 meses"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="10%"
						duracion="1:10"
						title="Nombre corto"
						info="Hece 2 días"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						likes="55%"
						duracion="1:10"
						title="Nombre de bastante normal"
						info="Hece 10 años"
					/>
				</ScrollView>
			</View>
		);
	}
}
