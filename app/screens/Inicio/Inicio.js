import React from "react";
import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";

import { VideoApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import LoadingFooter from "../../components/LoadingFooter";

import SearchMenu from "../../components/SearchMenu";

import styles from "./styles";

export default class Inicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [{ temp: "temp" }],
			loading: true,
			fetchingNewData: false,
			refreshing: false
		};

		this.offset = 0;
		this.totalPages = undefined;

		// let defaultClient = ApiClient.instance;
		// let bearerAuth = defaultClient.authentications["bearerAuth"];
		// bearerAuth.accessToken = Auth.getUserToken();

		// this.videoApiInstance = new VideoApi();

		this.state.loading = false;
	}
	// componentDidMount = () => {
	// 	// this.getData();
	// };

	getData = () => {
		// if (this.totalPages == undefined || this.offset < this.totalPages) {
		//   let opts = {
		//     page: this.offset,
		//     cacheControl: "no-cache, no-store, must-revalidate",
		//     pragma: "no-cache",
		//     expires: 0
		//   };
		//   this.videoApiInstance.getVideos((error, data, response) => {
		//     if (!error) {
		//       this.offset = this.offset + 1;
		//       this.totalPages = data.page.totalPages;
		//       this.setState({
		//         data: [...this.state.data, ...data._embedded.videos],
		//         loading: false,
		//         fetchingNewData: false,
		//         refreshing: false
		//       });
		//     }
		//   });
		// }
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
			this.totalPages = undefined;
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
						renderItem={({ item }) => (
							<FullScreenThumbnail
								navigation={this.props.navigation}
								image={require("../../../test/imagenes/imagen.jpg")}
								likes="70%"
								duracion="1:10"
								title="Nombre bastante largo para ser un nombre de un video de prueba"
								info="Hece 3 meses"
								asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
								asignaturaName="Multiprocesadores"
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
