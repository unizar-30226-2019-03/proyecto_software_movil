import React from "react";
import { Text, View, Button, ActivityIndicator, FlatList } from "react-native";

import LoadingFooter from "../../../components/LoadingFooter";

import Auth from "../../../config/Auth";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Mis listas"
	});

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loading: true,
			fetchingNewData: false,
			refreshing: false
		};

		this.offset = 0;
		this.totalPages = undefined;

		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new ReproductionListApi();
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
					this.setState({
						loading: false,
						fetchingNewData: false,
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
			this.totalPages = undefined;
			this.setState({
				refreshing: true,
				data: [],
				fetchingNewData: false,
				loading: false
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
						style={styles.listasContainer}
						showsVerticalScrollIndicator={false}
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
								type={"mis_listas"}
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
