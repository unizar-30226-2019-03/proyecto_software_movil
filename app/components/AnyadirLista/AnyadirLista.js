import React from "react";
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from "react-native";

import { Input } from "react-native-elements";

import { Azul } from "../../constants";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import LoadingFooter from "../../components/LoadingFooter";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";
import HaOcurridoUnError from "../../components/HaOcurridoUnError";

import styles from "./styles";

export default class AnyadirLista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nuevaListaInput: ""
		};

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
	}

	crearLista = () => {
		let name = this.state.nuevaListaInput;
		this.props.hide();
		if (this.props.onAddingLista) {
			this.props.onAddingLista();
		}
		this.apiInstance.addReproductionList(name, (error, data, response) => {
			if (error) {
				this.setState({ updatingChanges: false });
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(null);
				}
			} else {
				this.setState({ updatingChanges: false });
				if (this.props.onListaAdded) {
					this.props.onListaAdded(data.id);
				}
			}
		});
	};

	render() {
		return (
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.props.visible}
					onRequestClose={this.props.hide}
					onBackdropPress={this.props.hide}
				>
					<TouchableOpacity style={styles.container} onPress={this.props.hide} activeOpacity={1}>
						<TouchableWithoutFeedback>
							<View style={styles.anyadirListaContainer}>
								<Text style={styles.nuevaListaModalTexto}>Nueva lista</Text>
								<View style={styles.nuevaListaInputContainer}>
									<Input
										placeholder="Nombre"
										autoFocus
										onChangeText={nuevaListaInput => this.setState({ nuevaListaInput })}
									/>
								</View>
								<View style={styles.crearCancelarContainer}>
									<RippleTouchable onPress={this.props.hide} style={styles.cancelar} activeOpacity={1}>
										<Text style={styles.nuevaListaTexto}>CANCELAR</Text>
									</RippleTouchable>
									<RippleTouchable
										onPress={() => this.crearLista()}
										disabled={!(this.state.nuevaListaInput.length > 0)}
										activeOpacity={1}
									>
										<Text
											style={[
												styles.nuevaListaTexto,
												{
													color: this.state.nuevaListaInput.length > 0 ? Azul : "gray"
												}
											]}
										>
											CREAR
										</Text>
									</RippleTouchable>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}
