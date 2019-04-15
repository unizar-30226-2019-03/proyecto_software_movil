import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon} from "react-native-elements";




import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial"
						})
					}
					>
					<Icon
						name="access-time"
						size= {30}
						marginLeft={20}
					></Icon>

					<Text style={styles.titulo}>IR A HISTORIAL</Text>
					
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis vídeos"
						})
					}
					>
					<Icon
						name="play-circle-outline"
						size= {30}
						marginLeft={20}
					></Icon>

					<Text style={styles.titulo}>IR A MIS VIDEOS</Text>
					
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() => 
						this.props.navigation.navigate("MisListas")}
					>
					<Icon
						name="playlist-play"
						size= {30}
						marginLeft={20}
					></Icon>

					<Text style={styles.titulo}>IR A MIS LISTAS</Text>

				</TouchableOpacity>

				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() => 
						this.props.navigation.navigate("SubirVideo")}
					>
					<Icon
						name="videocam"
						size= {30}
						marginLeft={20}
					></Icon>
					<Text style={styles.titulo}>IR A SUBIR VIDEO</Text>
					
				</TouchableOpacity>
			</View>
		);
	}
}
