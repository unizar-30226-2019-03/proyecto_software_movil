import React from "react";
import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";

import { VideoApi, ApiClient } from "swagger_unicast";

import { getUserToken } from "../../config/Auth";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import LoadingFooter from "../../components/LoadingFooter";

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
		// bearerAuth.accessToken = getUserToken();

		// this.videoApiInstance = new VideoApi();

		// this.getData();
		this.state.loading = false;
	}

	getData = () => {
		// if (this.totalPages == undefined || this.offset < this.totalPages) {
		//   let opts = {
		//     page: this.offset
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
		this.setState({ fetchingNewData: true });
		this.getData();
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
