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

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

// TODO: Parametrizar ir a otras pantallas (a la asignatura y video que toque).

const HalfScreenThumbnail = ({
	navigation,
	image,
	likes,
	duracion,
	title,
	info
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("ViendoVideo")}
				style={styles.flexContainer}
				activeOpacity={1}
			>
				<View style={styles.rowContainer}>
					<ImageBackground
						source={image}
						style={styles.videoThumbnailContainer}
					>
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
					<View style={styles.titleYInfoContainer}>
						<Text style={styles.title} numberOfLines={3}>
							{title}
						</Text>
						<Text style={styles.info}>{info}</Text>
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
};

export default HalfScreenThumbnail;
