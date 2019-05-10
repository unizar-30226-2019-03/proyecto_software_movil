import React from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";

import { SearchBar } from "react-native-elements";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import ThumbnailAsignatura from "../../components/ThumbnailAsignatura";

import EntypoIcons from "react-native-vector-icons/Entypo";

import styles from "./styles";

export default class Searching extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: ""
		};
	}

	componentDidMount() {
		this.changeSearchText = this.changeSearchText.bind(this);
		this.props.navigation.setParams({
			changeSearchText: this.changeSearchText,
			searchText: this.state.searchText
		});
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerTitle: (
				<View style={styles.headerContainer}>
					<SearchBar
						autoFocus
						value={params.searchText}
						placeholder="Buscar..."
						inputContainerStyle={styles.searchBarIn}
						searchIcon={false}
						containerStyle={styles.searchBarOut}
						onChangeText={text => params.changeSearchText(text)}
					/>
				</View>
			)
		};
	};

	changeSearchText = value => {
		this.setState({
			searchText: value
		});
		this.props.navigation.setParams({
			searchText: value
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Una asignatura con nombre largo"
					/>
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Proyecto software"
					/>
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Multiprocesadores"
					/>
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
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Multiprocesadores"
					/>
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Multiprocesadores"
					/>
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Multiprocesadores"
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
					<ThumbnailAsignatura
						navigation={this.props.navigation}
						icon={require("../../../test/imagenes/perfil_uni.jpg")}
						name="Multiprocesadores"
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
