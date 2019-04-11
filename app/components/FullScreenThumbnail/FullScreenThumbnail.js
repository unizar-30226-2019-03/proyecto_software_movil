import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableOpacity
} from "react-native";

import { VerdeClaro, RojoClaro } from "../../constants";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";

import styles from "./styles";

// TODO: Parametrizar ir a otras pantallas (a la asignatura y video que toque).

const FullScreenThumbnail = ({
	navigation,
	image,
	likes,
	duracion,
	title,
	info,
	asignaturaIcon,
	asignaturaName
}) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => navigation.navigate("ViendoVideo")}
				activeOpacity={1}
			>
				<ImageBackground source={image} style={styles.videoThumbnailContainer}>
					<View style={styles.duracionYLikesContainer}>
						<Text
							style={[
								styles.likes,
								{ color: likes > "49%" ? VerdeClaro : RojoClaro }
							]}
						>
							{likes}
						</Text>
						<Text style={styles.duracion}>{duracion}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>

			<View style={styles.universidadInfoContainer}>
				<View>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Asignatura", {
								title: "UPM - Proyecto software"
							})
						}
						activeOpacity={1}
						style={styles.asignaturaContainer}
					>
						<IconoAsignaturaUniversidad
							style={styles.asignaturaIcon}
							image={asignaturaIcon}
							name={asignaturaName}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.titleYInfoContainer}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("ViendoVideo")}
						activeOpacity={1}
					>
						<View>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.info}>{info}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default FullScreenThumbnail;
