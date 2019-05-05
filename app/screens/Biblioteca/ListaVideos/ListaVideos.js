import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import LoadingFooter from "../../../components/LoadingFooter";

import { getUserToken, getUserId } from "../../../config/Auth";

import { UserApi, DisplayApi, ApiClient } from "swagger_unicast";

import timeStampToFormat from "../../../components/TimeStampToFormat";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	constructor(props) {
		super(props);

		this.state = {
			data: [],
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
		if (!this.state.refreshing) {
			this.setState({
				refreshing: true,
				data: [],
				loading: false
			});
			this.getData();
		}
	};

	borrarDeMisVideos = (index, id) => {
		// api
		this.borrarLocal(index);
	};

	borrarDeHistorial = (index, id) => {
		// api
		this.borrarLocal(index);
	};

	borrarLocal = index => {
		var temp = [...this.state.data];
		temp.splice(index, 1);
		this.setState({ data: temp });
	};

	delete = (index, id) => {
		if (this.tipoLista == "Mis vídeos") {
			this.borrarDeMisVideos();
		} else if (this.tipoLista == "Historial") {
			this.borrarDeHistorial();
		}
	};

	render() {
		console.log(this.state.loading)

		console.log(this.state.data)
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
								image={{uri: this.tipoLista == "Mis vídeos" ? item.thumbnailUrl : "item.video.thumbnailUrl" }}
								likes={this.tipoLista == "Mis vídeos" ? item.score : "item.video.score"}
								duracion="1:10"
								title={this.tipoLista == "Mis vídeos" ? item.title : "item.video.title"}
								info={this.tipoLista == "Mis vídeos" ? timeStampToFormat(item.timestamp) : "timeStampToFormat(item.video.timestamp)"}
								videoId={this.tipoLista == "Mis vídeos" ? item.id : "item.id"}
								tipoLista={this.tipoLista}
								index={index}
								deleteCallback={this.delete}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		);
	}
}
