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

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { VideoApi, ApiClient, SubjectApi } from "swagger_unicast";

import { timeStampToFormat, secToDuration } from "../../../components/Time";

import RippleTouchable from "../../../components/RippleTouchable";

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
      asignaturaSeguida: false,
      loadingVideos: true,
      loadingProfesores: true,
      loadingSeguir: true,
      refreshingVideos: false,
      refreshingProfesores: false,
      refreshingSeguir: false,
      fetchingNewVideos: false,
      changingStateSeguir: false
    };

    this.id = this.props.navigation.getParam("id");

    this.offset = 0;
    this.totalPages = null;

    this.currentDate = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.videosInstance = new VideoApi();
    this.subjectInstance = new SubjectApi();
  }

  componentDidMount = () => {
    this.getData();
  };

  someOneLoading = () => {
    return this.state.loadingVideos || this.state.loadingProfesores || this.state.loadingSeguir;
  };

  someOneRefreshing = () => {
    return this.state.refreshingVideos || this.state.refreshingProfesores || this.state.refreshingSeguir;
  };

  getData = () => {
    this.getVideos();
    this.getProfesores();
    this.getSeguir();
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
        console.log(data);
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          }
        } else {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.currentDate = ApiClient.parseDate(response.headers.date);
          this.setState({
            videos: [...this.state.videos, ...data._embedded.videos],
            loadingVideos: false,
            refreshingVideos: false,
            fetchingNewVideos: false
          });
        }
      });
    } else {
      this.setState({
        fetchingNewVideos: false,
        refreshingVideos: false,
        loadingVideos: false
      });
    }
  };

  getProfesores = () => {
    let opts = {
      cacheControl: "'no-cache, no-store, must-revalidate'",
      pragma: "'no-cache'",
      expires: "'0'"
    };
    this.subjectInstance.getProfessorsFromSubject(this.id, opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        }
      } else {
        this.setState({
          profesores: [...data._embedded.users],
          loadingProfesores: false,
          refreshingProfesores: false
        });
      }
    });
  };

  getSeguir = () => {
    let opts = {
      cacheControl: "'no-cache, no-store, must-revalidate'",
      pragma: "'no-cache'",
      expires: "'0'"
    };
    this.subjectInstance.existsUserInSubject(this.id, opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        }
      } else {
        this.setState({
          asignaturaSeguida: data,
          loadingSeguir: false,
          refreshingSeguir: false
        });
      }
    });
  };

  changeSeguirState = () => {
    if (!this.state.changingStateSeguir && !this.someOneRefreshing()) {
      this.setState({ changingStateSeguir: true });

      if (this.state.asignaturaSeguida) {
        this.subjectInstance.unfollowSubject(this.id, (error, data, response) => {
          if (error) {
            if (error.status == 403) {
              Auth.signOut(this.props.navigation);
            }
          } else {
            this.setState({
              asignaturaSeguida: false,
              changingStateSeguir: false
            });
          }
        });
      } else {
        this.subjectInstance.followSubject(this.id, (error, data, response) => {
          if (!error) {
            this.setState({
              asignaturaSeguida: true,
              changingStateSeguir: false
            });
          }
        });
      }
    }
  };

  onEndReached = () => {
    if (!this.state.fetchingNewVideos && !this.someOneRefreshing()) {
      this.setState({ fetchingNewVideos: true });
      this.getVideos();
    }
  };

  onRefresh = () => {
    if (!this.state.fetchingNewVideos && !this.someOneRefreshing() && !this.state.changingStateSeguir) {
      this.offset = 0;
      this.totalPages = null;
      this.setState({
        refreshingVideos: true,
        refreshingProfesores: true,
        videos: [],
        profesores: []
      });
      this.getData();
    }
  };

  render() {
    console.log(this.state.loadingProfesores, this.state.loadingSeguir, this.state.loadingVideos);
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
                disabled={this.someOneRefreshing() || this.state.changingStateSeguir}
                asignaturaSeguida={this.state.asignaturaSeguida}
                callback={this.changeSeguirState}
              />
            </View>
            <FlatList
              style={styles.profesoresView}
              showsHorizontalScrollIndicator={false}
              data={this.state.profesores}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <RippleTouchable
                    round={true}
                    onPress={() =>
                      this.props.navigation.navigate("Chat", {
                        title: item.name + ", " + item.surnames,
                        id: item.id,
                        photo: item.photo
                      })
                    }
                  >
                    <View style={styles.iconAndNameView}>
                      <Image source={{ uri: item.photo }} style={styles.userIcon} />
                      <Text numberOfLines={1} style={styles.userName}>
                        {item.name}
                      </Text>
                    </View>
                  </RippleTouchable>
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
                      info={timeStampToFormat(item.timestamp, this.currentDate)}
                      asignaturaIcon={{
                        uri: item.university != undefined ? item.university.photo : "uri_nula"
                      }}
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
