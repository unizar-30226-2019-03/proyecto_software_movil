import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList, Alert } from "react-native";

import Auth from "../../../config/Auth";

import { VideoApi, DisplayApi, ApiClient } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import LoadingModal from "../../../components/LoadingModal";
import LoadingFooter from "../../../components/LoadingFooter";

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
			fetchingNewData: false,
			deleting: false
		};

		this.offset = 0;
		this.totalPages = null;

		this.tipoLista = this.props.navigation.getParam("type");

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance;

		if (this.tipoLista == "mis_videos") {
			this.apiInstance = new VideoApi();
		} else if (this.tipoLista == "historial") {
			this.apiInstance = new DisplayApi();
		} else if (this.tipoLista == "lista") {
			console.log("FALTA");
		}
	}

	componentDidMount = () => {
		this.getData();
	};

	getData = () => {
		if (this.totalPages == undefined || this.offset < this.totalPages) {
			if (this.tipoLista == "mis_videos") {
				this.getVideosOfUser();
			} else if (this.tipoLista == "historial") {
				this.getHistorial();
			} else if (this.tipoLista == "lista") {
				console.log("FALTA");
			}
		} else {
			this.setState({ fetchingNewData: false, refreshing: false, loading: false });
		}
	};

	getVideosOfUser = () => {
		let id = Auth.getUserId();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0,
			page: this.offset,
			sort: ["timestamp", "desc"]
		};
		this.apiInstance.getVideosFromUploader(id, opts, (error, data, response) => {
			console.log(data);
			if (error) {
				HaOcurridoUnError(this.getVideosOfUser);
			} else {
				this.offset = this.offset + 1;
				this.totalPages = data.page.totalPages;
				this.setState({
					data: [...this.state.data, ...data._embedded.videos],
					currentDate: ApiClient.parseDate(response.headers.date),
					loading: false,
					refreshing: false,
					fetchingNewData: false
				});
			}
		});
	};

	getHistorial = () => {
		let id = Auth.getUserId();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0,
			page: this.offset,
			projection: "displayWithVideo",
			sort: ["timestamp", "desc"]
		};
		this.apiInstance.getDisplaysByUser(id, opts, (error, data, response) => {
			if (error) {
				HaOcurridoUnError(this.getHistorial);
			} else {
				this.offset = this.offset + 1;
				this.totalPages = data.page.totalPages;
				this.setState({
					data: [...this.state.data, ...data._embedded.displays],
					currentDate: ApiClient.parseDate(response.headers.date),
					loading: false,
					refreshing: false,
					fetchingNewData: false
				});
			}
		});
	};

	onEndReached = () => {
		if (!this.state.fetchingNewData && !this.state.refreshing) {
			this.setState({ fetchingNewData: true });
			this.getData();
		}
	};

	onRefresh = () => {
		if (!this.state.deleting && !this.state.fetchingNewData && !this.state.refreshing) {
			this.offset = 0;
			this.totalPages = null;
			this.setState({
				refreshing: true,
				data: []
			});
			this.getData();
		}
	};

	borrarDeMisVideos = (index, id) => {
		console.log("ID", id);
		this.apiInstance.deleteVideo(id, (error, data, response) => {
			console.log(data);
			console.log(error);
			if (error) {
				HaOcurridoUnError(null);
				this.setState({ deleting: false });
			} else {
				this.borrarLocal(index);
			}
		});
	};

	borrarDeHistorial = (index, id) => {
		this.apiInstance.displaysDeleteVideoIdDelete(id, (error, data, response) => {
			if (error) {
				HaOcurridoUnError(null);
				this.setState({ deleting: false });
			} else {
				this.borrarLocal(index);
			}
		});
	};

	borrarLocal = index => {
		var temp = [...this.state.data];
		temp.splice(index, 1);
		this.setState({ data: temp, deleting: false });
	};

	delete = (index, id) => {
		console.log(index);
		console.log(id);
		if (!this.state.deleting && !this.state.refreshing) {
			this.setState({ deleting: true });
			if (this.tipoLista == "mis_videos") {
				this.borrarDeMisVideos(index, id);
			} else if (this.tipoLista == "historial") {
				this.borrarDeHistorial(index, id);
			}
		}
	};

	render() {
		return (
			<View style={[styles.container, { justifyContent: this.state.loading ? "center" : "flex-start" }]}>
				{this.state.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={this.state.data}
						refreshing={this.state.refreshing}
						onRefresh={() => this.onRefresh()}
						onEndReached={() => this.onEndReached()}
						renderItem={({ item, index }) => {
							let _item;
							if (this.tipoLista == "mis_videos") {
								_item = item;
							} else if (this.tipoLista == "historial") {
								_item = item.video;
							} else if (this.tipoLista == "lista") {
								console.log("FALTA");
							}
							return (
								<HalfScreenThumbnail
									navigation={this.props.navigation}
									image={{ uri: _item.thumbnailUrl }}
									likes={_item.score}
									duracion={secToDuration(_item.seconds)}
									title={_item.title}
									info={timeStampToFormat(_item.timestamp, this.state.currentDate)}
									videoId={_item.id}
									type={this.tipoLista}
									index={index}
									deleteCallback={this.delete}
									canShowPopUp={!this.state.deleting && !this.state.refreshing}
								/>
							);
						}}
						ListFooterComponent={LoadingFooter({
							show: this.state.fetchingNewData
						})}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<LoadingModal visible={this.state.deleting} />
			</View>
		);
	}
}
