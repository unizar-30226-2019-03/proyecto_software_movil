import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Mis listas"
	});

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre bastante largo para ser un nombre de una lista de prueba"
						info="0 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre corto"
						info="198087 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
					<HalfScreenThumbnail
						navigation={this.props.navigation}
						image={require("../../../../test/imagenes/imagen.jpg")}
						title="Nombre normal"
						info="19 vídeos"
					/>
				</ScrollView>
			</View>
		);
	}
}
