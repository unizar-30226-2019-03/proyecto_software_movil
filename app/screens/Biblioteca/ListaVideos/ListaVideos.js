import React from "react";
import {
	Text,
	View,
	Button,
	ActivityIndicator,
	FlatList,
	Alert
} from "react-native";

import LoadingFooter from "../../../components/LoadingFooter";

import { getUserToken, getUserId } from "../../../config/Auth";

import { VideoApi, DisplayApi, ApiClient } from "swagger_unicast";

import { timeStampToFormat } from "../../../components/Time";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import { secToDuration } from "../../../components/Time";
import LoadingModal from "../../../components/LoadingModal";

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
			currentDate: null,
			refreshing: false,
			deleting: false
		};

		this.offset = 0;
		this.totalPages = null;

		this.tipoLista = this.props.navigation.getParam("title");

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = getUserToken();

		this.apiInstance;

		if (this.tipoLista == "Mis vídeos") {
			this.apiInstance = new VideoApi();
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
		if (this.totalPages == undefined || this.offset < this.totalPages) {
			let id = getUserId();
			let opts = {
				cacheControl: "no-cache, no-store, must-revalidate",
				pragma: "no-cache",
				expires: 0,
				page: this.offset,
				sort: ["timestamp", "desc"]
			};
			this.apiInstance.getVideosFromUploader(
				id,
				opts,
				(error, data, response) => {
					console.log(data);
					if (error) {
						HaOcurridoUnError(this.getVideosOfUser);
					} else {
						this.offset = this.offset + 1;
						// this.totalPages = data.page.totalPages;
						this.setState({
							data: [...this.state.data, ...data._embedded.videos],
							currentDate: ApiClient.parseDate(response.headers.date),
							loading: false,
							refreshing: false
						});
					}
				}
			);
		}
	};

	getHistorial = () => {
		let id = getUserId();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0,
			projection: "displayWithVideo",
			sort: ["timestamp", "desc"]
		};
		this.apiInstance.getDisplaysByUser(id, opts, (error, data, response) => {
			console.log(data);
			if (error) {
				HaOcurridoUnError(this.getHistorial);
			} else {
				this.setState({
					data: [...this.state.data, ...data._embedded.displays],
					currentDate: ApiClient.parseDate(response.headers.date),
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

		this.setState({ deleting: false });
	};

	delete = (index, id) => {
		if (!this.state.deleting) {
			this.setState({ deleting: true });
			if (this.tipoLista == "Mis vídeos") {
				this.borrarDeMisVideos();
			} else if (this.tipoLista == "Historial") {
				this.borrarDeHistorial();
			}
		}
	};

	render() {
		console.log(this.state.loading);

		console.log(this.state.data);
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
								image={{
									uri:
										this.tipoLista == "Mis vídeos"
											? item.thumbnailUrl
											: item.video.thumbnailUrl
								}}
								likes={
									this.tipoLista == "Mis vídeos" ? item.score : item.video.score
								}
								duracion={
									this.tipoLista == "Mis vídeos"
										? secToDuration(item.seconds)
										: secToDuration(item.video.seconds)
								}
								title={
									this.tipoLista == "Mis vídeos" ? item.title : item.video.title
								}
								info={
									this.tipoLista == "Mis vídeos"
										? timeStampToFormat(item.timestamp, this.state.currentDate)
										: timeStampToFormat(
												item.video.timestamp,
												this.state.currentDate
										  )
								}
								videoId={this.tipoLista == "Mis vídeos" ? item.id : "item.id"}
								tipoLista={this.tipoLista}
								index={index}
								deleteCallback={this.delete}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<LoadingModal visible={this.state.deleting} />
			</View>
		);
	}
}
