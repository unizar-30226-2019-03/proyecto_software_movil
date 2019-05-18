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

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import { Divider } from "react-native-elements";

import LoadingFooter from "../../components/LoadingFooter";
import AnyadirLista from "../../components/AnyadirLista";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";

import styles from "./styles";

export default class AnyadirALista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			dataChanging: [],
			loading: false,
			fetchingNewData: false,
			nuevaListaModalVisible: false
		};

		this.listsVideoIn = [];
		this.offset = 0;
		this.totalPages = null;

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
	}

	onHide = () => {
		this.setState({
			nuevaListaModalVisible: false,
			loading: true
		});
		this.props.hide();
	};

	onShow = () => {
		this.listsVideoIn = [];
		this.offset = 0;
		this.totalPages = null;
		this.setState({
			loading: true,
			fetchingNewData: false,
			data: [],
			dataChanging: []
		});
		this.getDataFull();
	};

	changeCheckBox = idx => {
		if (!this.state.dataChanging[idx]) {
			let tempDataChanging = [...this.state.dataChanging];
			tempDataChanging[idx] = true;
			this.setState({
				dataChanging: tempDataChanging
			});

			let reproListId = this.state.data[idx].lista.id;
			let videoId = this.props.videoId;
			if (!this.state.data[idx].check) {
				this.apiInstance.addVideotoReproductionList(reproListId, videoId, (error, data, response) => {
					console.log("DAWDAWDAWDAWDAWD");
					console.log(data);
					console.log(error);
					let tempData = [...this.state.data];
					if (!error) {
						console.log("SIIIII");
						tempData[idx].check = true;
					}
					tempDataChanging = [...this.state.dataChanging];
					tempDataChanging[idx] = false;
					this.setState({
						data: [...tempData],
						dataChanging: [...tempDataChanging]
					});
				});
			} else {
				this.apiInstance.deleteVideoFromReproductionList(reproListId, videoId, (error, data, response) => {
					let tempData = [...this.state.data];
					console.log(data);
					console.log(error);
					if (!error) {
						tempData[idx].check = false;
					}
					tempDataChanging = [...this.state.dataChanging];
					tempDataChanging[idx] = false;
					this.setState({
						data: [...tempData],
						dataChanging: [...tempDataChanging]
					});
				});
			}
		}
	};

	getDataFull = () => {
		let videoId = this.props.videoId; // Number | Id del video que se quiere mirar
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0
		};
		this.apiInstance.getReproductionListVideoIn(videoId, opts, (error, data, response) => {
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(this.onHide);
				}
			} else {
				this.listsVideoIn = data._embedded.reproductionLists;
				this.getData();
			}
		});
	};

	getData = () => {
		if (this.totalPages == undefined || this.offset < this.totalPages) {
			let opts = {
				cacheControl: "no-cache, no-store, must-revalidate",
				pragma: "no-cache",
				expires: 0,
				page: this.offset
			};
			this.apiInstance.getUserReproductionLists(opts, (error, data, response) => {
				if (error) {
					if (error.status == 403) {
						Auth.signOut(this.props.navigation);
					} else {
						HaOcurridoUnError(this.onHide);
					}
				} else {
					this.offset = this.offset + 1;
					this.totalPages = data.page.totalPages;

					let tempDataChanging = data._embedded.reproductionLists.map(lista => {
						return false;
					});

					let tempData = data._embedded.reproductionLists.map(lista => {
						let listaVideo = this.listsVideoIn.find(lv => lv.id === lista.id);
						return listaVideo ? { lista, check: true } : { lista, check: false };
					});

					console.log(tempData);
					this.setState({
						loading: false,
						fetchingNewData: false,
						data: [...this.state.data, ...tempData],
						dataChanging: [...this.state.dataChanging, ...tempDataChanging]
					});

					console.log(data);
				}
			});
		} else {
			this.setState({ loading: false, fetchingNewData: false });
		}
	};

	onEndReached = () => {
		if (!this.state.fetchingNewData) {
			this.setState({ fetchingNewData: true });
			this.getData();
		}
	};

	hideAnyadirLista = () => {
		this.setState({
			nuevaListaModalVisible: false
		});
	};

	hideAnyadirAListaShowNuevaLista = () => {
		this.onHide();
		this.setState({
			nuevaListaModalVisible: true
		});
	};

	onNewLista = id_lista => {
		let reproListId = this.state.data[idx].lista.id;
		let videoId = this.props.videoId;
		this.apiInstance.addVideotoReproductionList(reproListId, videoId, (error, data, response) => {
			if (!error) {
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
					onRequestClose={this.onHide}
					onBackdropPress={this.onHide}
					onShow={this.onShow}
					keyboardShouldPersistTaps="handled"
				>
					<TouchableOpacity style={styles.container} onPress={this.onHide} activeOpacity={1}>
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
													title={item.lista.name}
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
									onPress={() => this.onHide()}
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
				<AnyadirLista
					visible={this.state.nuevaListaModalVisible}
					hide={this.hideAnyadirLista}
					videoId={this.props.videoId}
				/>
			</View>
		);
	}
}
