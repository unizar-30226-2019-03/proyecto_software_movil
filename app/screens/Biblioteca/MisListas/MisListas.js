import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import RippleTouchable from "../../../components/RippleTouchable";

import LoadingModal from "../../../components/LoadingModal";
import AnyadirLista from "../../../components/AnyadirLista";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import { Azul } from "../../../constants";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: "Mis listas",
			headerRight: (
				<RippleTouchable round={true} onPress={() => params.openAnyadirLista()} style={styles.viewBotonAnyadirLista}>
					<MaterialIcons name={"add"} style={styles.botonAnyadirLista} />
				</RippleTouchable>
			)
		};
	};

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loading: true,
			refreshing: false,
			changingVideo: false,
			anyadirListaOpen: false
		};

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
	}

	componentDidMount = () => {
		this.openAnyadirLista = this.openAnyadirLista.bind(this);
		this.props.navigation.setParams({
			openAnyadirLista: this.openAnyadirLista
		});
		this.getData();
		UnicastNotifications.fireSingleton();
	};

	openAnyadirLista = () => {
		this.setState({ anyadirListaOpen: true });
	};

	hideAnyadirLista = () => {
		this.setState({ anyadirListaOpen: false });
	};

	getData = () => {
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0
		};
		this.apiInstance.getUserReproductionLists(opts, (error, data, response) => {
			console.log(data);
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(this.getData);
				}
			} else {
				this.setState({
					loading: false,
					refreshing: false,
					data: [...data._embedded.reproductionLists]
				});
			}
		});
	};

	onRefresh = () => {
		if (!this.state.refreshing) {
			this.offset = 0;
			this.totalPages = null;
			this.setState({
				refreshing: true,
				data: []
			});
			this.getData();
		}
	};

	delete = (index, id) => {
		if (!this.state.changingVideo && !this.state.refreshing) {
			this.setState({ changingVideo: true });
			this.apiInstance.deleteReproductionList(id, (error, data, response) => {
				if (error) {
					if (error.status == 403) {
						Auth.signOut(this.props.navigation);
					} else {
						HaOcurridoUnError(null);
					}
					this.setState({ changingVideo: false });
				} else {
					var temp = [...this.state.data];
					temp.splice(index, 1);
					this.setState({ data: temp, changingVideo: false });
				}
			});
		}
	};

	render() {
		return (
			<View style={[styles.container, { justifyContent: this.state.loading ? "center" : "flex-start" }]}>
				{this.state.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						style={styles.listasContainer}
						showsVerticalScrollIndicator={false}
						data={this.state.data}
						refreshing={this.state.refreshing}
						onRefresh={() => this.onRefresh()}
						renderItem={({ item, index }) => (
							<HalfScreenThumbnail
								hideMenu={item.name == "Favoritos" ? true : false}
								navigation={this.props.navigation}
								image={item.thumbnail ? { uri: item.thumbnail } : require("../../../assets/lista_vacia.png")}
								title={item.name}
								info={item.numVideos + (item.numVideos == 1 ? " vídeo" : " vídeos")}
								type={"mis_listas"}
								index={index}
								itemId={item.id}
								itemName={item.name}
								canShowPopUp={!this.state.changingVideo && !this.state.refreshing}
								deleteCallback={this.delete}
							/>
						)}
						ListHeaderComponent={<View style={styles.videosTopMargin} />}
						ListFooterComponent={
							<View>
								<View style={styles.videosBottomMargin} />
							</View>
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<AnyadirLista
					visible={this.state.anyadirListaOpen}
					hide={this.hideAnyadirLista}
					onListaAdded={() => this.setState({ changingVideo: false }) || this.onRefresh()}
					onAddingLista={() => this.setState({ changingVideo: true })}
				/>
				<LoadingModal visible={this.state.changingVideo} />
			</View>
		);
	}
}
