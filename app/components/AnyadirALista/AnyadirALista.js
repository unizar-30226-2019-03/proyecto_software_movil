import React from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	Text,
	TouchableWithoutFeedback,
	FlatList,
	ActivityIndicator
} from "react-native";

import { Input, CheckBox } from "react-native-elements";

import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AzulNuevaLista, Azul } from "../../constants";

import { Divider } from "react-native-elements";

import LoadingFooter from "../../components/LoadingFooter";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";

import styles from "./styles";

export default class AnyadirALista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ check: true },
				{ check: false },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true },
				{ check: true }
			],
			dataChanging: [false, false, false, false, false, false, false, false, false, false, false],
			loading: true,
			fetchingNewData: false,
			updatingChanges: false,
			mounted: false,
			nuevaListaModalVisible: false,
			nuevaListaInput: ""
		};
	}

	onShow = () => {
		if (!this.state.mounted) {
			this.setState({
				mounted: true
			});
			this.getData();
		}
	};

	changeCheckBox = idx => {
		if (!this.state.dataChanging[idx]) {
			this.setState({
				dataChanging: update(this.state.dataChanging, { idx: { $set: true } })
			});

			// api

			this.setState({
				dataChanging: update(this.state.dataChanging, { idx: { $set: false } }),
				tempData: update(this.state.data, { idx: { check: { $set: !this.state.data } } })
			});
		}
	};

	getData = () => {
		this.setState({
			loading: false
		});
	};

	onEndReached = () => {};

	updateLista = () => {
		this.props.hide();
		// this.setState({
		// 	updatingChanges: true
		// });
	};

	crearLista = () => {
		this.setState({
			nuevaListaModalVisible: false
			// updatingChanges: true
		});
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
					onShow={this.onShow}
				>
					<TouchableOpacity style={styles.container} onPress={this.props.hide} activeOpacity={1}>
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
								{this.state.loading ? (
									<View style={styles.activityIndicatorContainer}>
										<ActivityIndicator size="large" />
									</View>
								) : (
									<FlatList
										showsVerticalScrollIndicator={false}
										data={this.state.data}
										onEndReached={() => this.onEndReached()}
										renderItem={({ item, index }) => (
											<RippleTouchable onPress={() => this.changeCheckBox(index)} style={styles.checkBoxView}>
												<CheckBox
													activeOpacity={1}
													Component={View}
													checked={item.check}
													title="Click Here to Remove This Item"
													checkedIcon="check-square"
													uncheckedIcon="square-o"
													containerStyle={styles.checkBoxContainer}
													textStyle={styles.texto}
												/>
											</RippleTouchable>
										)}
										ListFooterComponent={LoadingFooter({
											show: this.state.fetchingNewData
										})}
										keyExtractor={(item, index) => index.toString()}
									/>
								)}
								<Divider style={styles.divider} />
								<RippleTouchable
									onPress={() => this.updateLista()}
									disabled={this.state.loading}
									style={styles.listoContainer}
								>
									<FontAwesomeIcons name={"check"} style={styles.texto} />
									<Text style={styles.listoTexto}>Listo</Text>
								</RippleTouchable>
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
										onChangeText={nuevaListaInput => this.setState({ nuevaListaInput })}
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
