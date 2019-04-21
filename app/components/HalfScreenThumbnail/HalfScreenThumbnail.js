import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableOpacity
} from "react-native";

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from "react-native-popup-menu";

import { VerdeClaro, RojoClaro } from "../../constants";

import AnyadirALista from "../AnyadirALista";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

export default class HalfScreenThumbnail extends React.Component {
	state = {
		popUpVisible: false,
		anyadirAListaVisible: false
	};

	hideAnyadirALista = () => {
		this.setState({
			anyadirAListaVisible: false
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					style={styles.flexContainer}
					activeOpacity={1}
				>
					<View style={styles.rowContainer}>
						<ImageBackground
							source={this.props.image}
							style={styles.videoThumbnailContainer}
						>
							<View style={styles.duracionYLikesContainer}>
								<Text
									style={[
										styles.likes,
										{ color: this.props.likes > "49%" ? VerdeClaro : RojoClaro }
									]}
								>
									{this.props.likes}
								</Text>
								<Text style={styles.duracion}>{this.props.duracion}</Text>
							</View>
						</ImageBackground>
						<View style={styles.titleYInfoContainer}>
							<Text style={styles.title} numberOfLines={3}>
								{this.props.title}
							</Text>
							<Text style={styles.info}>{this.props.info}</Text>
						</View>
					</View>
				</TouchableOpacity>
				<Menu
					style={styles.dropDownMenuContainer}
					opened={this.state.popUpVisible}
					onBackdropPress={() => this.setState({ popUpVisible: false })}
					onSelect={() =>
						this.setState({
							popUpVisible: false,
							anyadirAListaVisible: true
						})
					}
				>
					<MenuTrigger onPress={() => this.setState({ popUpVisible: true })}>
						<SimpleLineIcons
							name={"options-vertical"}
							style={styles.optionsIcon}
						/>
					</MenuTrigger>
					<MenuOptions>
						<MenuOption>
							<Text style={styles.popUpMenuText}>
								Opcion muy muy muy muy muy larga
							</Text>
						</MenuOption>
						<MenuOption onSelect={this.showAnyadirALista}>
							<Text style={styles.popUpMenuText}>Anyadir a lista</Text>
						</MenuOption>
						<MenuOption>
							<Text style={styles.popUpMenuText}>Opcion 3</Text>
						</MenuOption>
						<MenuOption>
							<Text style={styles.popUpMenuText}>Opcion 4</Text>
						</MenuOption>
					</MenuOptions>
				</Menu>
				<AnyadirALista
					visible={this.state.anyadirAListaVisible}
					hide={this.hideAnyadirALista}
				/>
			</View>
		);
	}
}
