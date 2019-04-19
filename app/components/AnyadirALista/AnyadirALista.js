import React from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	Text,
	TouchableWithoutFeedback,
	ScrollView,
	CheckBox
} from "react-native";

import { Input } from "react-native-elements";

import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import { AzulNuevaLista } from "../../constants";

import { Divider } from "react-native-elements";

import styles from "./styles";

export default class AnyadirALista extends React.Component {
	state = {
		nuevaListaModalVisible: false,
		nuevaListaInput: ""
	};

	hideAnyadirAListaShowNuevaLista() {
		this.props.hide();
		this.setState({
			nuevaListaModalVisible: true
		});
	}

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
					<TouchableOpacity
						style={styles.container}
						onPress={this.props.hide}
						activeOpacity={1}
					>
						<TouchableWithoutFeedback>
							<View style={styles.anyadirAListaContainer}>
								<View style={styles.guardarYNuevaListaContainer}>
									<Text style={styles.texto}>Guardar vídeo en...</Text>
									<TouchableOpacity
										onPress={() => this.hideAnyadirAListaShowNuevaLista()}
										activeOpacity={1}
										style={styles.nuevaListaContainer}
									>
										<Text style={styles.nuevaListaTexto}>+NUEVA LISTA</Text>
									</TouchableOpacity>
								</View>
								<Divider style={styles.divider} />
								<ScrollView>
									<TouchableOpacity
										style={styles.listaContainer}
										activeOpacity={1}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.listaContainer}
									>
										<CheckBox />
										<Text style={styles.texto}>SIETE</Text>
									</TouchableOpacity>
								</ScrollView>
								<Divider style={styles.divider} />
								<TouchableOpacity
									onPress={this.props.hide}
									activeOpacity={1}
									style={styles.listoContainer}
								>
									<FontAwesomeIcons name={"check"} style={styles.texto} />
									<Text style={styles.listoTexto}>Listo</Text>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.nuevaListaModalVisible}
					onRequestClose={() =>
						this.setState({
							nuevaListaModalVisible: false
						})
					}
					onBackdropPress={() =>
						this.setState({
							nuevaListaModalVisible: false
						})
					}
				>
					<TouchableOpacity
						style={styles.container}
						onPress={() =>
							this.setState({
								nuevaListaModalVisible: false
							})
						}
						activeOpacity={1}
					>
						<TouchableWithoutFeedback>
							<View style={styles.anyadirListaContainer}>
								<Text style={styles.nuevaListaModalTexto}>Nueva lista</Text>
								<View style={styles.nuevaListaInputContainer}>
									<Input
										placeholder="Nombre"
										autoFocus
										onChangeText={nuevaListaInput =>
											this.setState({ nuevaListaInput })
										}
									/>
								</View>
								<View style={styles.crearCancelarContainer}>
									<TouchableOpacity
										onPress={() =>
											this.setState({
												nuevaListaModalVisible: false
											})
										}
										style={styles.cancelar}
										activeOpacity={1}
									>
										<Text style={styles.nuevaListaTexto}>CANCELAR</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() =>
											this.setState({
												nuevaListaModalVisible: false
											})
										}
										disabled={!(this.state.nuevaListaInput.length > 0)}
										activeOpacity={1}
									>
										<Text
											style={[
												styles.nuevaListaTexto,
												{
													color:
														this.state.nuevaListaInput.length > 0
															? AzulNuevaLista
															: "gray"
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
			</View>
		);
	}
}
