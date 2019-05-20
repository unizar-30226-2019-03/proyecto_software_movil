import React from "react";

import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";

import FullScreenThumbnail from "../../../components/FullScreenThumbnail";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { VideoApi, ApiClient } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

export default class VideosTab extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loading: true,
			fetchingNewData: false,
			refreshing: false
		};

		this.offset = 0;
		this.totalPages = null;

		this.tipoLista = this.props.navigation.getParam("type");

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.videoApiInstance = new VideoApi();
	}

	componentDidMount = () => {
		this.getData();
	};

	getData = () => {
		if (this.totalPages == undefined || this.offset < this.totalPages) {
			let opts = {
				cacheControl: "no-cache, no-store, must-revalidate",
				pragma: "no-cache",
				expires: 0,
				page: this.offset,
				sort: ["timestamp", "desc"],
				projection: ["videoWithSubjectAndUniversity"]
			};
			this.videoApiInstance.getVideosOfUserSubjects(opts, (error, data, response) => {
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
						data: [...this.state.data, ...data._embedded.videos],
						currentDate: ApiClient.parseDate(response.headers.date),
						loading: false,
						refreshing: false,
						fetchingNewData: false
					});
				}
			});
		} else {
			this.setState({ fetchingNewData: false, refreshing: false, loading: false });
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
						onEndReached={() => this.onEndReached()}
						onRefresh={() => this.onRefresh()}
						renderItem={({ item, index }) => (
							<View style={styles.videoContainer}>
								<FullScreenThumbnail
									navigation={this.props.navigation}
									image={{ uri: item.thumbnailUrl }}
									likes={item.score}
									duracion={secToDuration(item.seconds)}
									title={item.title}
									info={timeStampToFormat(item.timestamp, this.state.currentDate)}
									asignaturaIcon={{ uri: item.university != undefined ? item.university.photo : "uri_nula" }}
									asignaturaName={item.subject.abbreviation}
									asignaturaFullName={item.subject.name}
									asignaturaId={item.subject.id}
									videoId={item.id}
								/>
							</View>
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
