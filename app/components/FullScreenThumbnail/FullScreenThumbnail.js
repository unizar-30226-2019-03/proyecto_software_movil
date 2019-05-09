import React from "react";
import { View, Image, ImageBackground, Text, TouchableOpacity } from "react-native";

import { VerdeClaro, RojoClaro } from "../../constants";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";

import styles from "./styles";

// TODO: Parametrizar ir a otras pantallas (a la asignatura y video que toque).

const FullScreenThumbnail = props => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => props.navigation.navigate("ViendoVideo", { id: props.videoId })}
				activeOpacity={1}
			>
				<ImageBackground source={props.image} style={styles.videoThumbnailContainer}>
					<View style={styles.duracionYLikesContainer}>
						{props.likes != null ? (
							<Text style={[styles.likes, { color: props.likes * 20 > 49 ? VerdeClaro : RojoClaro }]}>
								{props.likes * 20 + "%"}
							</Text>
						) : null}
						<Text style={styles.duracion}>{props.duracion}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>

			<View style={styles.universidadInfoContainer}>
				<View>
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate("Asignatura", {
								title: props.asignaturaFullName,
								id: props.asignaturaId
							})
						}
						activeOpacity={1}
						style={styles.asignaturaContainer}
					>
						<IconoAsignaturaUniversidad
							style={styles.asignaturaIcon}
							image={props.asignaturaIcon}
							name={props.asignaturaName}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.titleYInfoContainer}>
					<TouchableOpacity onPress={() => props.navigation.navigate("ViendoVideo")} activeOpacity={1}>
						<View>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.info}>{props.info}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default FullScreenThumbnail;
