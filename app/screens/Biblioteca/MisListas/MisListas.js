import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import RippleTouchable from "../../../components/RippleTouchable";

import LoadingModal from "../../../components/LoadingModal";
import LoadingFooter from "../../../components/LoadingFooter";
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
			fetchingNewData: false,
			refreshing: false,
			deleting: false,
			anyadirListaOpen: false
		};

		this.offset = 0;
		this.totalPages = undefined;

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
	};

	openAnyadirLista = () => {
		this.setState({ anyadirListaOpen: true });
	};

	hideAnyadirLista = () => {
		this.setState({ anyadirListaOpen: false });
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
				console.log(data);
				if (error) {
					if (error.status == 403) {
						Auth.signOut(this.props.navigation);
					} else {
						HaOcurridoUnError(this.getData);
					}
				} else {
					this.offset = this.offset + 1;
					this.totalPages = data.page.totalPages;
					this.setState({
						loading: false,
						fetchingNewData: false,
						refreshing: false,
						data: [...this.state.data, ...data._embedded.reproductionLists]
					});
				}
			});
		} else {
			this.setState({ loading: false, fetchingNewData: false });
		}
	};

	onEndReached = () => {
		if (!this.state.fetchingNewData && !this.state.refreshing) {
			this.setState({ fetchingNewData: true });
			this.getData();
		}
	};

	onRefresh = () => {
		if (!this.state.fetchingNewData && !this.state.refreshing) {
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
		if (!this.state.deleting && !this.state.refreshing) {
			this.setState({ deleting: true });
			this.apiInstance.deleteReproductionList(id, (error, data, response) => {
				if (error) {
					if (error.status == 403) {
						Auth.signOut(this.props.navigation);
					} else {
						HaOcurridoUnError(null);
					}
					this.setState({ deleting: false });
				} else {
					var temp = [...this.state.data];
					temp.splice(index, 1);
					this.setState({ data: temp, deleting: false });
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
						onEndReached={() => this.onEndReached()}
						onRefresh={() => this.onRefresh()}
						renderItem={({ item, index }) => (
							<HalfScreenThumbnail
								hideMenu={item.name == "Favoritos" ? true : false}
								navigation={this.props.navigation}
								image={require("../../../../test/imagenes/imagen.jpg")}
								title={item.name}
								info="0 vídeos"
								type={"mis_listas"}
								index={index}
								itemId={item.id}
								itemName={item.name}
								canShowPopUp={!this.state.deleting && !this.state.refreshing}
								deleteCallback={this.delete}
							/>
						)}
						ListHeaderComponent={<View style={styles.videosTopMargin} />}
						ListFooterComponent={
							<View>
								<View style={styles.videosBottomMargin} />
								<LoadingFooter show={this.state.fetchingNewData} />
							</View>
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<AnyadirLista
					visible={this.state.anyadirListaOpen}
					hide={this.hideAnyadirLista}
					onListaAdded={this.onRefresh}
				/>
				<LoadingModal visible={this.state.deleting} />
			</View>
		);
	}
}
