import React from "react";
import { Text, View, Button } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchMenu from "../../components/SearchMenu";

import SearchScreen from "../Searching";
import ListaVideos from "./ListaVideos";
import MisListas from "./MisListas";
import SubirVideo from "./SubirVideo";

import styles from "./styles";

class Biblioteca extends React.Component {
	static navigationOptions = SearchMenu;

	render() {
		return (
			<View style={styles.container}>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial"
						})
					}
					title="IR A HISTORIAL"
				/>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis vídeos"
						})
					}
					title="IR A MIS VIDEOS"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("MisListas")}
					title="IR A MIS LISTAS"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("SubirVideo")}
					title="IR A SUBIR VIDEO"
				/>
			</View>
		);
	}
}

const BibliotecaStackNav = createStackNavigator({
	Biblioteca: Biblioteca,
	ListaVideos: ListaVideos,
	MisListas: MisListas,
	SubirVideo: SubirVideo,
	SearchScreen: SearchScreen
});

export default createAppContainer(BibliotecaStackNav);
