import React from "react";
import { View, Image, TouchableOpacity} from "react-native";
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
				
			
				<TouchableOpacity
					style={styles.boton}
					onPress={() =>
						this.props.navigation.navigate("VerPerfil", { title: "Mi perfil" })
					}
					>
					<Text style={styles.titulo}>IR MI PERFIL</Text>
				
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					onPress={() =>
						this.props.navigation.navigate("SignIn", { title: "Cerrar sesion" })
					}
					>
					
					<Text style={styles.titulo}>CERRAR SESION</Text>

				</TouchableOpacity>

			</View>
			
		);
	}
}
