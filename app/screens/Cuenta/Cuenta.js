import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";

import { signOut } from "../../config/Auth";

import styles from "./styles";

export default class Cuenta extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Cuenta"
	});

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.userView}>
					<Image
						source={require("../../../test/imagenes/perfil.jpg")}
						style={styles.userIcon}
						margin={20}
					/>
					<Text style={styles.userName}>NOMBRE</Text>
				</View>

				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() =>
						this.props.navigation.navigate("VerPerfil", {
							title: "Mi perfil",
							perfilPropioSi: true
						})
					}
				>
					<Icon name="account-box" size={30} marginLeft={20} />

					<Text style={styles.titulo}>IR A MI PERFIL</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() => signOut(this.props.navigation)}
				>
					<Icon name="arrow-forward" size={30} marginLeft={20} />

					<Text style={styles.titulo}>CERRAR SESIÓN</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
