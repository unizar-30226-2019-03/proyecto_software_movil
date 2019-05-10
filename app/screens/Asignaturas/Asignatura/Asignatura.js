import React from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl
} from "react-native";

import { createAppContainer, createStackNavigator } from "react-navigation";

import { getUserToken, getUserId } from "../../../config/Auth";

import { VideoApi, ApiClient } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import FullScreenThumbnail from "../../../components/FullScreenThumbnail";
import BotonSeguirAsignatura from "../../../components/BotonSeguirAsignatura";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import LoadingModal from "../../../components/LoadingModal";
import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

export default class Asignatura extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      profesores: [],
      loadingVideos: false,
      loadingProfesores: false,
      loadingSeguir: false,
      refreshingVideos: false,
      refreshingProfesores: false,
      refreshingSeguir: false,
      fetchingNewVideos: false
    };

    this.id = this.props.navigation.getParam("id");

    this.offset = 0;
    this.totalPages = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    this.videosInstance = new VideoApi();
  }

  componentDidMount() {
    this.setState({
      loadingVideos: true,
      loadingProfesores: true,
      loadingSeguir: true
    });
    this.getData();
  }

  someOneLoading = () => {
    return this.state.loadingVideos || this.state.loadingProfesores || this.state.loadingSeguir;
  };

  someOneRefreshing = () => {
    return this.state.refreshingVideos || this.state.refreshingProfesores || this.state.refreshingSeguir;
  };

  getData = () => {
    this.getVideos();
    this.getProfesores();
    this.botonSeguir.getData();
  };

  getVideos = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0,
        page: this.offset,
        sort: ["timestamp", "desc"],
        projection: "videoWithSubjectAndUniversity"
      };
      this.videosInstance.getVideosFromSubject(this.id, opts, (error, data, response) => {
        if (!error) {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            videos: [...this.state.videos, ...data._embedded.videos],
            currentDate: ApiClient.parseDate(response.headers.date),
            loadingVideos: false,
            refreshingVideos: false,
            fetchingNewVideos: false
          });
        }
      });
    } else {
      this.setState({ fetchingNewVideos: false, refreshingVideos: false, loadingVideos: false });
    }
  };

  getProfesores = () => {
    this.setState({
      profesores: [
        { temp: "dawda" },
        { temp: "dawda" },
        { temp: "dawda" },
        { temp: "dawda" },
        { temp: "dawda" },
        { temp: "dawda" },
        { temp: "dawda" }
      ],
      loadingProfesores: false,
      refreshingProfesores: false
    });
  };

  seguirLoaded = () => {
    console.log("SI");
    this.setState({
      loadingSeguir: false,
      refreshingSeguir: false
    });
  };

  onEndReached = () => {
    if (!this.state.fetchingNewVideos && !this.someOneRefreshing()) {
      this.setState({ fetchingNewVideos: true });
      this.getVideos();
    }
  };

  onRefresh = () => {
    if (!this.state.fetchingNewVideos && !this.someOneRefreshing()) {
      this.offset = 0;
      this.totalPages = null;
      this.setState({
        refreshingVideos: true,
        refreshingProfesores: true,
        refreshingSeguir: true,
        videos: [],
        profesores: []
      });
      this.getData();
    }
  };

  render() {
    return (
      <View style={[styles.container, { justifyContent: this.someOneLoading() ? "center" : "flex-start" }]}>
        {this.someOneLoading() ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={this.someOneRefreshing()} onRefresh={() => this.onRefresh()} />}
          >
            <View style={styles.viewSeguirAsignatura}>
              <BotonSeguirAsignatura
                disabled={this.someOneRefreshing()}
                onRef={ref => (this.botonSeguir = ref)}
                onLoadCallback={this.seguirLoaded}
              />
            </View>
            <FlatList
              style={styles.profesoresView}
              showsHorizontalScrollIndicator={false}
              data={this.state.profesores}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate("Chat", {
                        title: "Juancho Provisional"
                      })
                    }
                  >
                    <View style={styles.iconAndNameView}>
                      <Image
                        source={require("./../../../../test/imagenes/perfil.jpg")}
                        style={styles.userIcon}
                        margin={20}
                      />
                      <Text style={styles.userName}>Pedro E.</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={LoadingFooter({
                show: this.state.fetchingNewData
              })}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.videosView}
              data={this.state.videos}
              onEndReached={() => this.onEndReached()}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.videoContainer}>
                    <FullScreenThumbnail
                      navigation={this.props.navigation}
                      image={{ uri: item.thumbnailUrl }}
                      likes={item.score}
                      duracion={secToDuration(item.seconds)}
                      title={item.title}
                      info={timeStampToFormat(item.timestamp, this.state.currentDate)}
                      asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
                      asignaturaName={item.subject.abbreviation}
                      asignaturaFullName={item.subject.name}
                      asignaturaId={item.subject.id}
                      videoId={item.id}
                    />
                  </View>
                );
              }}
              ListFooterComponent={LoadingFooter({
                show: this.state.fetchingNewData
              })}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}
