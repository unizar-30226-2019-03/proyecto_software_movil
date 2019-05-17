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

import update from "immutability-helper";

import { AzulNuevaLista, Azul } from "../../constants";

import Auth from "../../config/Auth";

import { Divider } from "react-native-elements";

import LoadingFooter from "../../components/LoadingFooter";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";

import styles from "./styles";

export default class AnyadirALista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ check: true }],
			dataChanging: [true],
			loading: true,
			fetchingNewData: false,
			nuevaListaModalVisible: false,
			nuevaListaInput: ""
		};

		this.offset = 0;
		this.totalPages = null;

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
	}

	onShow = () => {
		this.setState({
			loading: true,
			fetchingNewData: false,
			data: [],
			dataChanging: []
		});
		this.getData();
	};

	changeCheckBox = idx => {
		if (!this.state.dataChanging[idx]) {
			let tempDataChanging = [...this.state.dataChanging];
			tempDataChanging[idx] = true;
			this.setState({
				dataChanging: tempDataChanging
			});

			// if (this.state.data.)

			// api

			tempDataChanging = [...this.state.dataChanging];
			tempDataChanging[idx] = false;
			let tempData = [];
			this.setState({
				dataChanging: tempDataChanging
				// data: tempData
			});
		}
	};

	getData = () => {
		// if (this.totalPages == undefined || this.offset < this.totalPages) {
		// 	let opts = {
		// 		cacheControl: "no-cache, no-store, must-revalidate",
		// 		pragma: "no-cache",
		// 		expires: 0,
		// 		page: this.offset
		// 	};
		// 	apiInstance.getUserReproductionLists(opts, (error, data, response) => {
		// 		if (error) {
		// 			if (error.status == 403) {
		// 				Auth.signOut(this.props.navigation);
		// 			} else {
		// 				HaOcurridoUnError(this.props.hide);
		// 			}
		// 		} else {
		// 			let tempDataChanging = _.range(data._embedded.reproductionLists).map(function() {
		// 				return false;
		// 			});
		// 			this.setState({
		// 				loading: false,
		// 				fetchingNewData: false,
		// 				data: [...this.state.data, ...data._embedded.reproductionLists],
		// 				dataChanging: [...this.state.dataChanging, ...tempDataChanging]
		// 			});
		// 		}
		// 	});
		// } else {
		// 	this.setState({ loading: false, fetchingNewData: false });
		// }
		this.setState({ loading: false, fetchingNewData: false });
	};

	onEndReached = () => {
		if (!this.state.fetchingNewData) {
			this.setState({ fetchingNewData: true });
			this.getData();
		}
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
									onPress={() => this.props.hide()}
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
