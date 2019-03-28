import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableOpacity
} from "react-native";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

export default class HalfScreenThumbnail extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					style={styles.flexContainer}
					activeOpacity={1}
				>
					<View style={styles.rowContainer}>
						<ImageBackground
							source={require("../../../test/imagenes/imagen.jpg")}
							style={styles.videoThumbnailContainer}
						>
							<View style={styles.duracionYLikesContainer}>
								<Text style={styles.likes}> 70% </Text>
								<Text style={styles.duracion}> 12:50 </Text>
							</View>
						</ImageBackground>
						<View style={styles.infoContainer}>
							<Text style={styles.title} numberOfLines={3}>
								Nombre de video de prueba con un nombre especialmente largo
							</Text>
							<Text style={styles.fecha}>Hace 3 meses</Text>
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
