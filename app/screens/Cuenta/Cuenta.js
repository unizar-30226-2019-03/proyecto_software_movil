import React from "react";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-elements";

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
					/>
					<Text style={styles.userName}>PEPITO</Text>
				</View>
				
				<View style={styles.boton}>
				<Button
					onPress={() =>
						this.props.navigation.navigate("VerPerfil", { title: "Mi perfil" })
					}
					title="IR MI PERFIL"
					titleStyle={styles.titulo}
					type="clear"
				/>
				</View>
				<View style={styles.boton}>
				<Button
					onPress={() =>
						this.props.navigation.navigate("SignIn", { title: "Cerrar sesion" })
					}
					title="CERRAR SESION"
					titleStyle={styles.titulo}
					type="clear"
				/>
				</View>
			</View>
		);
	}
}
