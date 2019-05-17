import React from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

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
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new UserApi();
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    let id = Auth.getUserId();
    console.log(id);
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      projection: "subjectWithUniversity",
      expires: 0
    };
    this.apiInstance.getSubjectsOfUser(id, opts, (error, data, response) => {
      console.log(data);
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
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => (
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={{ uri: item.university.photo }}
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
