import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList, Alert } from "react-native";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { VideoApi, DisplayApi, ApiClient, ReproductionListApi } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import LoadingModal from "../../../components/LoadingModal";
import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

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
			refreshing: false,
			fetchingNewData: false,
			deleting: false
		};

		this.currentDate = null;

		this.offset = 0;
		this.totalPages = null;

		this.tipoLista = this.props.navigation.getParam("type");

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		if (this.tipoLista == "mis_videos") {
			this.apiInstance = new VideoApi();
		} else if (this.tipoLista == "historial") {
			this.apiInstance = new DisplayApi();
		} else if (this.tipoLista == "lista") {
			this.videoApiInstance = new VideoApi();
			this.reproductionApiInstance = new ReproductionListApi();
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
				this.getVideosDeLista();
			}
		} else {
			this.setState({ fetchingNewData: false, refreshing: false, loading: false });
		}
	};

	getVideosDeLista = () => {
		let reproListId = this.props.navigation.getParam("id");
		console.log("ID REPRO", reproListId);
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: "0",
			page: this.offset,
			sort: ["null"],
			projection: "videoWithSubject"
		};
		this.videoApiInstance.getVideosFromReproductionList(reproListId, opts, (error, data, response) => {
			console.log(data);
			console.log(error);
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(this.getVideosDeLista);
				}
			} else {
				this.currentDate = ApiClient.parseDate(response.headers.date);
				this.offset = this.offset + 1;
				this.totalPages = data.page.totalPages;
				this.setState({
					data: [...this.state.data, ...data._embedded.videos],
					loading: false,
					refreshing: false,
					fetchingNewData: false
				});
			}
		});
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
		this.apiInstance.getVideosFromUploader(opts, (error, data, response) => {
			console.log(data);
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(this.getVideosOfUser);
				}
			} else {
				this.currentDate = ApiClient.parseDate(response.headers.date);
				this.offset = this.offset + 1;
				this.totalPages = data.page.totalPages;
				this.setState({
					data: [...this.state.data, ...data._embedded.videos],
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
		this.apiInstance.getDisplaysByUser(opts, (error, data, response) => {
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(this.getHistorial);
				}
			} else {
				this.currentDate = ApiClient.parseDate(response.headers.date);
				this.offset = this.offset + 1;
				this.totalPages = data.page.totalPages;
				this.setState({
					data: [...this.state.data, ...data._embedded.displays],
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
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(null);
				}
				this.setState({ deleting: false });
			} else {
				this.borrarLocal(index);
			}
		});
	};

	borrarDeHistorial = (index, id) => {
		this.apiInstance.displaysDeleteVideoIdDelete(id, (error, data, response) => {
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(null);
				}
				this.setState({ deleting: false });
			} else {
				this.borrarLocal(index);
			}
		});
	};

	borrarDeLista = (index, id) => {
		let reproListId = this.props.navigation.getParam("id");
		this.reproductionApiInstance.deleteVideoFromReproductionList(reproListId, id, (error, data, response) => {
			if (error) {
				if (error.status == 403) {
					Auth.signOut(this.props.navigation);
				} else {
					HaOcurridoUnError(null);
				}
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
			} else if (this.tipoLista == "lista") {
				this.borrarDeLista(index, id);
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
						keyboardShouldPersistTaps={"handled"}
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
								_item = item;
							}
							return (
								<HalfScreenThumbnail
									navigation={this.props.navigation}
									image={{ uri: _item.thumbnailUrl }}
									likes={_item.score}
									duracion={secToDuration(_item.seconds)}
									title={_item.title}
									info={timeStampToFormat(_item.timestamp, this.currentDate)}
									itemId={_item.id}
									type={this.tipoLista}
									index={index}
									deleteCallback={this.delete}
									canShowPopUp={!this.state.deleting && !this.state.refreshing}
								/>
							);
						}}
						ListHeaderComponent={<View style={styles.videosTopMargin} />}
						ListFooterComponent={
							<View>
								<View style={styles.videosBottomMargin} />
								<LoadingFooter show={this.state.fetchingNewData} />
							</View>
						}
						ListEmptyComponent={
							this.state.fetchingNewData || this.state.refreshing ? null : <NoHayContenidoQueMostrar what="vídeos" />
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<LoadingModal visible={this.state.deleting} />
			</View>
		);
	}
}
