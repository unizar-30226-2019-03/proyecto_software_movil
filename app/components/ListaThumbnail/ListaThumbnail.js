import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

export default class ListaThumbnail extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis listas - Lista de cosas"
						})
					}
					style={styles.flexContainer}
					activeOpacity={1}
				>
					<View style={styles.rowContainer}>
						<Image
							source={require("../../../test/imagenes/imagen.jpg")}
							style={styles.listaThumbnailContainer}
						/>
						<View style={styles.infoContainer}>
							<Text style={styles.title} numberOfLines={3}>
								Un nombre bastante largo para una lista para ver que tal queda
							</Text>
							<Text style={styles.numVideos}>195 vídeos</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View>
					<TouchableOpacity
						style={styles.optionsIconContainer}
						underlayColor="transparent"
						activeOpacity={0.5}
					>
						<SimpleLineIcons
							name={"options-vertical"}
							style={styles.optionsIcon}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
