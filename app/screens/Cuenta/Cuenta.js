import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Text, Icon } from "react-native-elements";

import { signOut, getUserId, getUserToken } from "../../config/Auth";

import { UserApi, ApiClient } from "swagger_unicast";

import styles from "./styles";

export default class Cuenta extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Cuenta"
	});

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			imagenPerfil: ""
		};

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = getUserToken();

		this.apiInstance = new UserApi();

		let id = getUserId();
		let opts = {
		  cacheControl: "no-cache, no-store, must-revalidate",
		  pragma: "no-cache",
		  expires: 0
		};
		this.apiInstance.getUser(id, opts, (error, data, response) => {
			if (!error) {
				this.state.imagenPerfil = data.photo;
				this.setState({ imagenPerfil: data.photo, loading: false });
			}
		});
	}

	render() {
		console.log(this.state.imagenPerfil);
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: this.state.loading ? "center" : "flex-start" }
				]}
			>
				{this.state.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<View>
						<View style={styles.userView}>
							<Image
								key={this.state.imagenPerfil}
								source={{ uri: this.state.imagenPerfil }}
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
									userId: getUserId()
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
				)}
			</View>
		);
	}
}
