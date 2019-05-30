/**
 * @fileoverview Pantalla con la lista de asignaturas que sigue el usuario
 * @author Unicast
 * @requires swagger_unicast:UserApi
 * @requires swagger_unicast:ApiClient
 * @requires ../../../config/Auth:Auth
 * @requires ../../../config/UnicastNotifications:UnicastNotifications
 * @requires ../../../components/ThumbnailAsignatura:ThumbnailAsignatura
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/NoHayContenidoQueMostrar:NoHayContenidoQueMostrar
 */

import React from "react";

import { View, FlatList, ActivityIndicator, Text } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";
import LoadingFooter from "../../../components/LoadingFooter";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";
/**
 * @module AsignaturasTab
 *
 */
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

  /**
   * Obtiene las asignaturas que sigue un usuario
   */
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
      console.log("GHDAW");
      console.log(data);
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        }
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
  /**
   * Callback al refrescar la pantalla
   * Llama a la función getData
   */
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
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => (
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={{
                  uri:
                    item.university != undefined
                      ? item.university.photo
                      : "uri_nula"
                }}
                name={item.name}
                id={item.id}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="asignaturas" />
              )
            }
          />
        )}
      </View>
    );
  }
}
