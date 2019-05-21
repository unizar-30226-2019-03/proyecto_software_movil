import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { Text, Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import UnicastNotifications from "../../config/UnicastNotifications";

import { UserApi, ApiClient } from "swagger_unicast";

import ImagenPerfil from "../../components/ImagenPerfil";

import RippleTouchable from "../../components/RippleTouchable";

import { observer } from "mobx-react/native";

import PerfilStore from "../../config/PerfilStore";

import styles from "./styles";

@observer
export default class Cuenta extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Cuenta"
	});

	onComponentDidMount = () => {
		UnicastNotifications.fireSingleton();
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.userView}>
						<ImagenPerfil style={styles.userIcon} />
						<Text style={styles.userName}>{PerfilStore.userName}</Text>
					</View>

					<RippleTouchable
						onPress={() =>
							this.props.navigation.navigate("VerPerfil", {
								userId: Auth.getUserId()
							})
						}
						style={styles.boton}
					>
						<Icon name="account-box" size={30} marginLeft={20} />

						<Text style={styles.titulo}>IR A MI PERFIL</Text>
					</RippleTouchable>

					<RippleTouchable onPress={() => Auth.signOut(this.props.navigation)} style={styles.boton}>
						<Icon name="arrow-forward" size={30} marginLeft={20} />

						<Text style={styles.titulo}>CERRAR SESIÓN</Text>
					</RippleTouchable>
				</View>
			</View>
		);
	}
}
