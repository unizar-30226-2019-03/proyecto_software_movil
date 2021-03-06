/**
 * @fileoverview Pantalla que muestra una lista de videos (historial, mis videos o una lista)
 * @author Unicast
 * @requires ../../../config/Auth:Auth
 * @requires swagger_unicast:VideoApi
 * @requires swagger_unicast:DisplayApi
 * @requires swagger_unicast:ApiClient
 * @requires swagger_unicast:ReproductionListApi
 * @requires ../../../components/Time:timeStampToFormat
 * @requires ../../../components/Time:secToDuration
 * @requires ../../../components/HalfScreenThumbnail:HalfScreenThumbnail
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/LoadingFooter:LoadingFooter
 * @requires ../../../components/LoadingModal:LoadingModal
 * @requires ../../../components/NoHayContenidoQueMostrar:NoHayContenidoQueMostrar
 */
import React from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  Alert
} from "react-native";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import {
  VideoApi,
  DisplayApi,
  ApiClient,
  ReproductionListApi
} from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import LoadingModal from "../../../components/LoadingModal";
import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

/**
 *
 * @module ListaVideos
 * @param {Object} props A través de props.navigation se indica si es una lista de videos de un historial,
 * de una lista de reproducción o de los videos subidos por el usuario.
 */
export default class ListaVideos extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      fetchingNewData: false,
      deleting: false
    };

    this.currentDate = null;

    this.offset = 0;
    this.totalPages = null;

    this.tipoLista = this.props.navigation.getParam("type");

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    if (this.tipoLista == "mis_videos") {
      this.apiInstance = new VideoApi();
    } else if (this.tipoLista == "historial") {
      this.apiInstance = new DisplayApi();
    } else if (this.tipoLista == "lista") {
      this.videoApiInstance = new VideoApi();
      this.reproductionApiInstance = new ReproductionListApi();
    }
  }

  componentDidMount = () => {
    this.getData();
  };
  /**
   * Obtiene los datos necesarios en funcion del tipo de lista
   */
  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      if (this.tipoLista == "mis_videos") {
        this.getVideosOfUser();
      } else if (this.tipoLista == "historial") {
        this.getHistorial();
      } else if (this.tipoLista == "lista") {
        this.getVideosDeLista();
      }
    } else {
      this.setState({
        fetchingNewData: false,
        refreshing: false,
        loading: false
      });
    }
  };
  /**
   * Obtiene los videos de una lista de reproducción del usuario
   */
  getVideosDeLista = () => {
    let reproListId = this.props.navigation.getParam("id");
    console.log("ID REPRO", reproListId);
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: "0",
      page: this.offset,
      sort: ["null"],
      projection: "videoWithSubject"
    };
    this.videoApiInstance.getVideosFromReproductionList(
      reproListId,
      opts,
      (error, data, response) => {
        console.log(data);
        console.log(error);
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.getVideosDeLista);
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
  };
  /**
   * Obtiene los videos subidos por un usuario
   */
  getVideosOfUser = () => {
    let id = Auth.getUserId();
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0,
      page: this.offset,
      sort: ["timestamp", "desc"]
    };
    this.apiInstance.getVideosFromUploader(opts, (error, data, response) => {
      console.log(data);
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.getVideosOfUser);
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
    });
  };
  /**
   * Obtiene el historial de reproducción de un usuario
   */
  getHistorial = () => {
    let id = Auth.getUserId();
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0,
      page: this.offset,
      projection: "displayWithVideo",
      sort: ["timestamp", "desc"]
    };
    this.apiInstance.getDisplaysByUser(opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.getHistorial);
        }
      } else {
        this.currentDate = ApiClient.parseDate(response.headers.date);
        this.offset = this.offset + 1;
        this.totalPages = data.page.totalPages;
        this.setState({
          data: [...this.state.data, ...data._embedded.displays],
          loading: false,
          refreshing: false,
          fetchingNewData: false
        });
      }
    });
  };
  /**
   * Callback llamado al llegar al final de la lista.
   * Vuelve a llamar a getData
   */
  onEndReached = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.setState({ fetchingNewData: true });
      this.getData();
    }
  };
  /**
   * Callback llamado al hacer refresh en la pantalla,
   * vuelve a llamar a getData
   */
  onRefresh = () => {
    if (
      !this.state.deleting &&
      !this.state.fetchingNewData &&
      !this.state.refreshing
    ) {
      this.offset = 0;
      this.totalPages = null;
      this.setState({
        refreshing: true,
        data: []
      });
      this.getData();
    }
  };
  /**
   * Elimina un video subido por el usuario
   * @param {Number} index Indice que ocupa en la lista local dicho video
   * @param {Number} id Identificador del video
   */
  borrarDeMisVideos = (index, id) => {
    console.log("ID", id);
    this.apiInstance.deleteVideo(id, (error, data, response) => {
      console.log(data);
      console.log(error);
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(null);
        }
        this.setState({ deleting: false });
      } else {
        this.borrarLocal(index);
      }
    });
  };
  /**
   * Elimina del historial un video
   * @param {Number} index Indice que ocupa en la lista local dicho video
   * @param {Number} id Identificador del video
   */
  borrarDeHistorial = (index, id) => {
    this.apiInstance.deleteDisplay(id, (error, data, response) => {
      if (error) {
        console.log("error callback: ", error);
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(null);
        }
        this.setState({ deleting: false });
      } else {
        this.borrarLocal(index);
      }
    });
  };
  /**
   * Elimina de una lista de reproducción un video
   * @param {Number} index Indice que ocupa en la lista local dicho video
   * @param {Number} id Identificador del video
   */
  borrarDeLista = (index, id) => {
    let reproListId = this.props.navigation.getParam("id");
    this.reproductionApiInstance.deleteVideoFromReproductionList(
      reproListId,
      id,
      (error, data, response) => {
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(null);
          }
          this.setState({ deleting: false });
        } else {
          this.borrarLocal(index);
        }
      }
    );
  };
  /**
   * Elimina de la lista local un video para que no aparezca por pantalla
   * @param {Number} index indice del video en la lista
   */
  borrarLocal = index => {
    var temp = [...this.state.data];
    temp.splice(index, 1);
    this.setState({
      data: temp,
      deleting: false
    });
  };

  /**
   * Elimina un video de la lista que corresponda
   * @param {Number} index Indice del video en la lista
   * @param {Number} id Identificador del video
   */
  delete = (index, id) => {
    console.log("vamos a borrar ", index);
    console.log("el de id ", id);
    if (!this.state.deleting && !this.state.refreshing) {
      this.setState({ deleting: true });
      if (this.tipoLista == "mis_videos") {
        this.borrarDeMisVideos(index, id);
      } else if (this.tipoLista == "historial") {
        this.borrarDeHistorial(index, id);
      } else if (this.tipoLista == "lista") {
        this.borrarDeLista(index, id);
      }
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: this.state.loading ? "center" : "flex-start"
          }
        ]}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            onEndReached={() => this.onEndReached()}
            renderItem={({ item, index }) => {
              let _item;
              if (this.tipoLista == "mis_videos") {
                _item = item;
              } else if (this.tipoLista == "historial") {
                _item = item.video;
              } else if (this.tipoLista == "lista") {
                _item = item;
              }
              return (
                <HalfScreenThumbnail
                  navigation={this.props.navigation}
                  image={{
                    uri: _item.thumbnailUrl
                  }}
                  likes={_item.score}
                  duracion={secToDuration(_item.seconds)}
                  title={_item.title}
                  info={timeStampToFormat(_item.timestamp, this.currentDate)}
                  itemId={_item.id}
                  type={this.tipoLista}
                  index={index}
                  deleteCallback={this.delete}
                  canShowPopUp={!this.state.deleting && !this.state.refreshing}
                />
              );
            }}
            ListHeaderComponent={<View style={styles.videosTopMargin} />}
            ListFooterComponent={
              <View>
                <View style={styles.videosBottomMargin} />
                <LoadingFooter show={this.state.fetchingNewData} />
              </View>
            }
            ListEmptyComponent={
              this.state.fetchingNewData || this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="vídeos" />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <LoadingModal visible={this.state.deleting} />
      </View>
    );
  }
}
