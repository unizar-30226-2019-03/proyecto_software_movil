import React from "react";
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from "react-native";

import { Input, CheckBox } from "react-native-elements";

import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AzulNuevaLista, Azul } from "../../constants";

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
			nuevaListaInput: "",
			updatingChanges: false
		};

		this.offset = 0;
		this.totalPages = null;

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
	}

	crearLista = () => {
		let name = this.state.nuevaListaInput;
		this.props.hide();
		this.setState({ updatingChanges: true });
		this.apiInstance.addReproductionList(name, (error, data, response) => {
			if (error) {
				this.setState({ updatingChanges: false });
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(null);
				}
			} else {
				console.log("DATATAWTAWTATAT", data);
				this.setState({ updatingChanges: false });
				if (this.props.onListaAdded) {
					// this.props.onListaAdded(data.id);
					this.props.onListaAdded();
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
									<TouchableOpacity onPress={this.props.hide} style={styles.cancelar} activeOpacity={1}>
										<Text style={styles.nuevaListaTexto}>CANCELAR</Text>
									</TouchableOpacity>
									<TouchableOpacity
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
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>
				<LoadingModal visible={this.state.updatingChanges} />
			</View>
		);
	}
}
