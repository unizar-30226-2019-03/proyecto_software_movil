import React from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import { getUserToken, getUserId } from "../../../config/Auth";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";
import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

export default class AsignaturasTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      refreshing: false
    };

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    console.log(getUserToken());

    this.apiInstance = new UserApi();

    this.getData();
  }

  getData = () => {
    let id = getUserId();
    this.apiInstance.getSubjectsOfUser(id, null, (error, data, response) => {
      if (!error) {
        this.setState({
          data: [...this.state.data, ...data._embedded.subjects],
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
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => (
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={require("../../../../test/imagenes/perfil_uni.jpg")}
                name={item.name}
                id={item.id}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
