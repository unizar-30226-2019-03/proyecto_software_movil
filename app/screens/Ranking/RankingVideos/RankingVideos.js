/**
 * @fileoverview Ranking de videos mas vistos la ultima semana
 * @author Unicast
 * @requires ../../../config/Auth:Auth
 * @requires ../../../config/UnicastNotifications:UnicastNotifications
 * @requires swagger_unicast:VideoApi
 * @requires swagger_unicast:ApiClient
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/Time:timeStampToFormat
 * @requires ../../../components/Time:secToDuration
 * @requires ../../../components/FullScreenThumbnail:FullScreenThumbnail
 * @requires ../../../components/LoadingFooter:LoadingFooter
 * @requires ../../../components/NoHayContenidoQueMostrar:NoHayContenidoQueMostrar
 *
 */
import React from "react";
import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { VideoApi, ApiClient } from "swagger_unicast";

import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import FullScreenThumbnail from "../../../components/FullScreenThumbnail";

import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";
/**
 * Pantalla de videos mas visitados la ultima semana
 * @module RankingVideos
 */
export default class RankingVideos extends React.Component {
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

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new VideoApi();
  }

  componentDidMount = () => {
    this.getData();
  };
  /**
   * Obtiene los videos mas populares esta semana
   */
  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0,
        page: this.offset,
        projection: "videoWithSubjectAndUniversity"
      };
      this.apiInstance.findMostPopularLastWeekVideos(
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
            this.currentDate = ApiClient.parseDate(response.headers.date);
            this.offset = this.offset + 1;
            this.totalPages = data.page.totalPages;
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
   * Callback llamado al llegar al final de la lista,
   * vuelve a llamar a getData
   */
  onEndReached = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.setState({ fetchingNewData: true });
      this.getData();
    }
  };
  /**
   * Callback llamado al refrescar la pagina,
   * vuelve a llamar a getData
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
