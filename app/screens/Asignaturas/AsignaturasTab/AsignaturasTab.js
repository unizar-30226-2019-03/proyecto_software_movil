import React from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import { SubjectApi, ApiClient } from "swagger_unicast";

import { getUserToken } from "../../../config/Auth";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";
import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

export default class AsignaturasTab extends React.Component {
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
    bearerAuth.accessToken = getUserToken();

    this.subjectApiInstance = new SubjectApi();

    this.getData();
  }

  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        page: this.offset
      };
      this.subjectApiInstance.getSubjects((error, data, response) => {
        if (!error) {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.subjects],
            loading: false,
            fetchingNewData: false,
            refreshing: false
          });
        }
      });
    }
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
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={require("../../../../test/imagenes/perfil_uni.jpg")}
                name={item.name}
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
