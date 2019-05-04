import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import LoadingFooter from "../../../components/LoadingFooter";

import { getUserToken, getUserId } from "../../../config/Auth";

import { UserApi, DisplayApi, ApiClient } from "swagger_unicast";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	constructor(props) {
		super(props);

		this.state = {
			data: [ {temp: "temp"} ],
			loading: true,
			refreshing: false
		};

		this.tipoLista = this.props.navigation.getParam("title");

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = getUserToken();

		this.apiInstance;

		if (this.tipoLista == "Mis vídeos") {
			this.apiInstance = new UserApi();
		} else if (this.tipoLista == "Historial") {
			this.apiInstance = new DisplayApi();
		}

		this.getData();
	}

	getData = () => {
		if (this.tipoLista == "Mis vídeos") {
			this.getVideosOfUser();
		} else if (this.tipoLista == "Historial") {
			this.getHistorial();
		}
	};

	getVideosOfUser = () => {
		let id = getUserId();
		this.apiInstance.getVideosOfUser(id, null, (error, data, response) => {
			if (!error) {
				this.setState({
					data: [...this.state.data, ...data._embedded.videos],
					loading: false,
					refreshing: false
				});
			}
		});
	};

	getHistorial = () => {
		let id = getUserId();
		this.apiInstance.getDisplaysByUser(id, null, (error, data, response) => {
			if (!error) {
				this.setState({
					data: [...this.state.data, ...data._embedded.displays],
					loading: false,
					refreshing: false
				});
			}
		});
	};

	onRefresh = () => {
		this.offset = 0;
		this.totalPages = undefined;
		this.setState({
			refreshing: true,
			data: [],
			fetchingNewData: false,
			loading: false
		});
		this.getData();
	};

	borrarDeMisVideos = (index, id) => {
		// api
		this.borrarLocal(index)
	}
	
	borrarDeHistorial = (index, id) => {
		// api
		this.borrarLocal(index)
	}

	borrarLocal = (index) => {
		var temp = [...this.state.data];
		temp.splice(index, 1);
		this.setState({ data: temp });
	}

	delete = (index, id) => {
		if (this.tipoLista == "Mis vídeos") {
			this.borrarDeMisVideos();
		} else if (this.tipoLista == "Historial") {
			this.borrarDeHistorial();
		}
	};

	render() {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: this.state.loading ? "center" : "flex-start" }
				]}
			>
				{this.state.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						data={this.state.data}
						refreshing={this.state.refreshing}
						onRefresh={() => this.onRefresh()}
						renderItem={({ item, index }) => (
							<HalfScreenThumbnail
								navigation={this.props.navigation}
								image={require("../../../../test/imagenes/imagen.jpg")}
								likes="70%"
								duracion="1:10"
								title="Nombre temporal"
								info="Hece 3 meses"
								videoId={0}
								tipoLista={this.tipoLista}
								index={index}
								deleteCallback={this.delete}
							/>
						)}
						ListFooterComponent={LoadingFooter({
							show: this.state.fetchingNewData
						})}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		);
	}
}
