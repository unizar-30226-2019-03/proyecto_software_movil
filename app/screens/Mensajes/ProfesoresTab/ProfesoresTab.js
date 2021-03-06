/**
 * @fileoverview Lista de profesores a los que puede hablar el usuario
 * @requires swagger_unicast:UserApi
 * @requires swagger_unicast:ApiClient
 * @requires ../../../components/RippleTouchable:RippleTouchable
 * @requires ../../../config/Auth:Auth
 * @requires ../../../config/UnicastNotifications:UnicastNotifications
 * @requires ../../../config/Auth:Auth
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/LoadingFooter:LoadingFooter
 * @requires ../../../components/NoHayContenidoQueMostrar:NoHayContenidoQueMostrar
 */
import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View
} from "react-native";

import { Image } from "react-native-elements";

import { UserApi, ApiClient } from "swagger_unicast";

import RippleTouchable from "../../../components/RippleTouchable";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";
/**
 * Lista de profesores a los que puede hablar el usuario
 * @module ProfesorTab
 */
export default class ProfesorTab extends React.Component {
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

    this.apiInstance = new UserApi();
  }

  componentDidMount = () => {
    this.getData();
  };
  /**
   * Obtiene los profesores a los que puede hablar el usuario
   */
  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0,
        page: this.offset,
        sort: ["desc"]
      };
      this.apiInstance.findUserProfessors(opts, (error, data, response) => {
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.getData);
          }
        } else {
          console.log(data);
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.users],
            loading: false,
            fetchingNewData: false,
            refreshing: false
          });
        }
      });
    } else {
      this.setState({
        fetchingNewData: false,
        refreshing: false,
        loading: false
      });
    }
  };
  /**
   * Callback lalmado al lelgar al final de la lista
   * vuelve a llamar a getData
   */
  onEndReached = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.setState({ fetchingNewData: true });
      this.getData();
    }
  };
  /**
   * Callback invocado al refrescar la pagina,
   * vuelve a llamar a getData
   */
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
            renderItem={({ item }) => {
              return item.id == Auth.getUserId() ? null : (
                <RippleTouchable
                  onPress={() =>
                    this.props.navigation.navigate("Chat", {
                      title: item.name,
                      photo: item.photo,
                      id: item.id
                    })
                  }
                >
                  <View style={styles.chatContainer}>
                    <Image
                      source={{ uri: item.photo }}
                      style={styles.profilePic}
                    />
                    <View style={styles.nameAndMsgContainer}>
                      <Text numberOfLines={1} style={styles.nameText}>
                        {item.name + ", " + item.surnames}
                      </Text>
                    </View>
                  </View>
                </RippleTouchable>
              );
            }}
            ListFooterComponent={LoadingFooter({
              show: this.state.fetchingNewData
            })}
            ListEmptyComponent={
              this.state.fetchingNewData || this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="profesores" />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
