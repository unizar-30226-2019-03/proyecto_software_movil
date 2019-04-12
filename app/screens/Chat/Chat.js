import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje"

export default class Chat extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("VerPerfil", { title: "Perfil de Pedro" })
				}
				activeOpacity={0.6}
			>
				<View style={styles.headerContainer}>
					<Image
						source={require("../../../test/imagenes/perfil.jpg")}
						style={styles.userIcon}
					/>
					<Text style={styles.userName}>{navigation.getParam("title")}</Text>
				</View>
			</TouchableOpacity>
		)
	});

	render() {
		return (
			<View style={styles.container}>
				<Mensaje mensaje='PEZ' tipo='entrante'/>
				<Mensaje mensaje='PEEEEEZ' tipo='saliente'/>
				<Mensaje mensaje='PEEEEEEEEEEEEEEEEEEEEEEEEZ' tipo='entrante'/>
				<Mensaje mensaje='PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEZ' tipo='saliente'/>
			</View>
		);
	}
}
