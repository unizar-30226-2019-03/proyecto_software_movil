import React from "react";
import { View, TouchableNativeFeedback, ActivityIndicator, Image } from "react-native";
import { Text, Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import { UserApi, ApiClient } from "swagger_unicast";

import ImagenPerfil from "../../components/ImagenPerfil";

import { observer } from "mobx-react/native";

import styles from "./styles";

export default class Cuenta extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Cuenta"
	});

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.userView}>
						<ImagenPerfil style={styles.userIcon} />
						<Text style={styles.userName}>NOMBRE</Text>
					</View>

					<TouchableNativeFeedback
						onPress={() =>
							this.props.navigation.navigate("VerPerfil", {
								userId: Auth.getUserId()
							})
						}
					>
						<View style={styles.boton}>
							<Icon name="account-box" size={30} marginLeft={20} />

							<Text style={styles.titulo}>IR A MI PERFIL</Text>
						</View>
					</TouchableNativeFeedback>

					<TouchableNativeFeedback onPress={() => Auth.signOut(this.props.navigation)}>
						<View style={styles.boton}>
							<Icon name="arrow-forward" size={30} marginLeft={20} />

							<Text style={styles.titulo}>CERRAR SESIÓN</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}
}
