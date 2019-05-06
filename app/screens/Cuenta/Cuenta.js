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
	}

	componentWillMount = () => {
		this.focusListener = this.props.navigation.addListener(
			"didFocus",
			this.handleDidFocus
		);
		this.blurListener = this.props.navigation.addListener(
			"didBlur",
			this.handleDidBlur
		);
	};

	componentWillUnmount = () => {
		this.focusListener.remove();
		this.blurListener.remove();
	};

	resume = () => {
		let id = getUserId();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0
		};
		this.apiInstance.getUser(id, opts, (error, data, response) => {
			if (!error) {
				this.setState({ imagenPerfil: data.photo, loading: false });
			}
		});
	};

	handleDidFocus = () => {
		this.resume();
	};

	handleDidBlur = () => {
		this.setState({ loading: true });
	};

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.userView}>
						{this.state.loading ? (
							<View style={[styles.userIcon, { justifyContent: "center" }]}>
								<ActivityIndicator size="large" />
							</View>
						) : (
							<Image
								key={this.state.imagenPerfil}
								source={{ uri: this.state.imagenPerfil }}
								style={styles.userIcon}
							/>
						)}
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
			</View>
		);
	}
}
