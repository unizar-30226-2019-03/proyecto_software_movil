import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import LoadingFooter from "../../../components/LoadingFooter";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Mis listas"
	});

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
							<HalfScreenThumbnail
								navigation={this.props.navigation}
								image={require("../../../../test/imagenes/imagen.jpg")}
								title="Nombre bastante largo para ser un nombre de una lista de prueba"
								info="0 vídeos"
								tipoLista={"Mis listas"}
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
