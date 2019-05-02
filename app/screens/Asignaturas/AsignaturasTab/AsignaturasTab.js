import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";

import { SubjectApi, ApiClient } from "swagger_unicast";

import { getUserToken } from "../../../config/Auth";

import styles from "./styles";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";

export default class AsignaturasTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      fetchingNewData: false,
      refreshing: false,
    };

    this.offset = 0;
    this.totalPages = undefined;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    this.subjectApiInstance = new SubjectApi();
  }

  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      console.log(this.offset)
      console.log(this.totalPages)
      this.subjectApiInstance.getSubjects((error, data, response) => {
        if (!error) {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.subjects]
          });
        }
      });
    }
  }

  componentWillMount = () => {
    this.getData();
    this.setState({ loading: false })
  };

  onEndReached = () => {
    this.setState({ fetchingNewData: true })
    this.getData();
    this.setState({ fetchingNewData: false })  
  }

  onRefresh = () => {
    this.offset = 0;
    this.totalPages = undefined;
    this.setState({ refreshing: true, data:[] })
    this.getData();
    this.setState({ refreshing: false })
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetchingNewData ? (
          <ActivityIndicator size="large" style={{ marginBottom: 15 }} />
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={this.state.data}
            refreshing={this.state.refreshing}
            onEndReached={() => this.onEndReached()}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => (
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={require("../../../../test/imagenes/perfil_uni.jpg")}
                name={item.name}
              />
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
