import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableOpacity
} from "react-native";

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from "react-native-popup-menu";

import { VerdeClaro, RojoClaro } from "../../constants";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

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
				<Menu style={styles.dropDownMenuContainer}>
					<MenuTrigger>
						<SimpleLineIcons
							name={"options-vertical"}
							style={styles.optionsIcon}
						/>
					</MenuTrigger>
					<MenuOptions>
						<MenuOption>
							<Text style={styles.popUpMenuText}>Opcion muy muy muy muy muy larga</Text>
						</MenuOption>
						<MenuOption >
							<Text style={styles.popUpMenuText}>Anyadir a lista</Text>
						</MenuOption>
						<MenuOption>
							<Text style={styles.popUpMenuText}>Opcion 3</Text>
						</MenuOption>
						<MenuOption>
							<Text style={styles.popUpMenuText}>Opcion 4</Text>
						</MenuOption>
					</MenuOptions>
				</Menu>
			</View>
	);
};

export default HalfScreenThumbnail;
