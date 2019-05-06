import React from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import { getUserToken, getUserId } from "../../../config/Auth";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";
import LoadingFooter from "../../../components/LoadingFooter";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

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

    this.apiInstance = new UserApi();

    this.getData();
  }

  getData = () => {
    let id = getUserId();
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.apiInstance.getSubjectsOfUser(id, opts, (error, data, response) => {
      if (error) {
        HaOcurridoUnError(this.getData);
      } else {
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
