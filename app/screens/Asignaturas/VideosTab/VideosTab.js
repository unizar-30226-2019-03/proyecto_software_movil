/**
 * @fileoverview Pantalla en la que aparecen los videos de las asignaturas que sigue el usuario
 * @author Unicast
 * @requires ../../../components/FullScreenThumbnail:FullScreenThumbnail
 * @requires swagger_unicast:VideoApi
 * @requires swagger_unicast:ApiClient
 * @requires ../../../components/Time:timeStampToFormat
 * @requires ../../../components/Time:secToDuration
 * @requires ../../../components/LoadingFooter:LoadingFooter
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/NoHayContenidoQueMostrar:NoHayContenidoQueMostrar
 */
import React from "react";

import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";

import FullScreenThumbnail from "../../../components/FullScreenThumbnail";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { VideoApi, ApiClient } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import LoadingFooter from "../../../components/LoadingFooter";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

/**
 * Pantalla que muestra los videos de las asignaturas que sigue el usuario
 * @module VideosTab
 */
export default class VideosTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      fetchingNewData: false,
      refreshing: false
    };

    this.currentDate = null;

    this.offset = 0;
    this.totalPages = null;

    this.tipoLista = this.props.navigation.getParam("type");

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.videoApiInstance = new VideoApi();
  }

  componentDidMount = () => {
    this.getData();
  };
  /**
   * Obtiene los videos de las asignaturas que sigue el usuario
   */
  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0,
        page: this.offset,
        sort: ["timestamp", "desc"],
        projection: ["videoWithSubjectAndUniversity"]
      };
      this.videoApiInstance.getVideosOfUserSubjects(
        opts,
        (error, data, response) => {
          console.log(data);
          if (error) {
            if (error.status == 403) {
              Auth.signOut(this.props.navigation);
            } else {
              HaOcurridoUnError(this.getData);
            }
          } else {
            this.offset = this.offset + 1;
            this.totalPages = data.page.totalPages;
            this.currentDate = ApiClient.parseDate(response.headers.date);
            this.setState({
              data: [...this.state.data, ...data._embedded.videos],
              loading: false,
              refreshing: false,
              fetchingNewData: false
            });
          }
        }
      );
    } else {
      this.setState({
        fetchingNewData: false,
        refreshing: false,
        loading: false
      });
    }
  };

  /**
   * Callback invocado al llegar al final de la lista de videos
   * Vuelve a llamar a getData para obtener más videos
   */
  onEndReached = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.setState({ fetchingNewData: true });
      this.getData();
    }
  };

  /**
   * Callback llamado al hacer refresh de la pantalla
   * Llama a getData para obtener los videos
   */
  onRefresh = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.offset = 0;
      this.totalPages = null;
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
            onEndReached={() => this.onEndReached()}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => (
              <View style={styles.videoContainer}>
                <FullScreenThumbnail
                  navigation={this.props.navigation}
                  image={{ uri: item.thumbnailUrl }}
                  likes={item.score}
                  duracion={secToDuration(item.seconds)}
                  title={item.title}
                  info={timeStampToFormat(item.timestamp, this.currentDate)}
                  asignaturaIcon={{
                    uri:
                      item.university != undefined
                        ? item.university.photo
                        : "uri_nula"
                  }}
                  asignaturaName={item.subject.abbreviation}
                  asignaturaFullName={item.subject.name}
                  asignaturaId={item.subject.id}
                  videoId={item.id}
                />
              </View>
            )}
            ListFooterComponent={LoadingFooter({
              show: this.state.fetchingNewData
            })}
            ListEmptyComponent={
              this.state.fetchingNewData || this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="vídeos" />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
