import React from "react";
import { View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, Platform } from "react-native";

import { SearchBar, Button, Text } from "react-native-elements";

import { VideoApi, SubjectApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import UnicastNotifications from "../../config/UnicastNotifications";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import ThumbnailAsignatura from "../../components/ThumbnailAsignatura";

import { timeStampToFormat, secToDuration } from "../../components/Time";

import HaOcurridoUnError from "../../components/HaOcurridoUnError";

import RippleTouchable from "../../components/RippleTouchable";

import NoHayContenidoQueMostrar from "../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

export default class Searching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      viewingVideos: true,
      vidData: [],
      subData: [],
      loadingVid: false,
      loadingSub: false
    };

    this.currentDate = undefined;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.videoApiInstance = new VideoApi();
    this.subjectApiInstance = new SubjectApi();
  }

  componentDidMount() {
    this.changeSearchText = this.changeSearchText.bind(this);
    this.getData = this.getData.bind(this);
    this.props.navigation.setParams({
      changeSearchText: this.changeSearchText,
      getData: this.getData,
      searchText: this.state.searchText
    });
  }

  getVideoData = () => {
    let opts = {
      title: this.state.searchText,
      projection: "videoWithSubjectAndUniversity"
    };
    this.videoApiInstance.findVideosContainingTitle(opts, (error, data, response) => {
      if (!error) {
        this.currentDate = ApiClient.parseDate(response.headers.date);
        this.setState({
          vidData: data._embedded.videos,
          loadingVid: false
        });
      } else {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(null);
        }
      }
    });
  };

  getSubjectData = () => {
    let opts = {
      name: this.state.searchText,
      projection: "subjectWithUniversity"
    };
    this.subjectApiInstance.findSubjectsContainingName(opts, (error, data, response) => {
      if (!error) {
        this.setState({
          subData: data._embedded.subjects,
          loadingSub: false
        });
      } else {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(null);
        }
      }
    });
  };

  changeTabThenGetData = viewingVideo => {
    if (viewingVideo) {
      this.setState({
        viewingVideos: viewingVideo
      });
    } else {
      this.setState({
        viewingVideos: viewingVideo
      });
    }
  };

  getData = () => {
    if (this.state.viewingVideos) {
      this.setState({ loadingVid: true });
      if (this.state.searchText != "") this.getVideoData();
    } else {
      this.setState({ loadingSub: true });
      if (this.state.searchText != "") this.getSubjectData();
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    if (Platform.OS === "android") {
      return {
        headerTitle: (
          <View style={styles.headerContainerAndroid}>
            <SearchBar
              autoFocus
              value={params.searchText}
              placeholder="Buscar..."
              inputContainerStyle={styles.searchBarIn}
              searchIcon={false}
              containerStyle={styles.searchBarOut}
              onChangeText={text => params.changeSearchText(text)}
              onSubmitEditing={event => params.getData()}
            />
          </View>
        ),
        headerStyle: {
          elevation: 0
        }
      };
    } else {
      return {
        headerTitle: (
          <View style={styles.headerContainerIos}>
            <SearchBar
              autoFocus
              value={params.searchText}
              placeholder="Buscar..."
              inputContainerStyle={styles.searchBarIn}
              searchIcon={false}
              containerStyle={styles.searchBarOut}
              onChangeText={text => params.changeSearchText(text)}
              onSubmitEditing={event => params.getData()}
            />
          </View>
        ),
        headerStyle: {
          elevation: 0
        }
      };
    }
  };

  changeSearchText = value => {
    this.setState({
      searchText: value
    });
    this.props.navigation.setParams({
      searchText: value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={1}
            style={this.state.viewingVideos ? styles.inactiveSwap : styles.activeSwap}
            onPress={() => this.changeTabThenGetData(false)}
          >
            <Text style={this.state.viewingVideos ? styles.inactiveTab : styles.activeTab}>ASIGNATURAS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={this.state.viewingVideos ? styles.activeSwap : styles.inactiveSwap}
            onPress={() => this.changeTabThenGetData(true)}
          >
            <Text style={this.state.viewingVideos ? styles.activeTab : styles.inactiveTab}>VÍDEOS</Text>
          </TouchableOpacity>
        </View>
        {this.state.viewingVideos ? (
          this.state.loadingVid ? (
            <View style={styles.loadingCircleView}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.vidData}
              renderItem={({ item }) => (
                <View style={styles.videoContainer}>
                  <FullScreenThumbnail
                    navigation={this.props.navigation}
                    image={{ uri: item.thumbnailUrl }}
                    likes={item.score}
                    duracion={secToDuration(item.seconds)}
                    title={item.title}
                    info={timeStampToFormat(item.timestamp, this.currentDate)}
                    asignaturaIcon={{
                      uri: item.university != null ? item.university.photo : "uri_nula"
                    }}
                    asignaturaName={item.subject.abbreviation}
                    asignaturaFullName={item.subject.name}
                    asignaturaId={item.subject.id}
                    videoId={item.id}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<NoHayContenidoQueMostrar what="vídeos" />}
            />
          )
        ) : this.state.loadingSub ? (
          <View style={styles.loadingCircleView}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.subData}
            renderItem={({ item }) => (
              <ThumbnailAsignatura
                navigation={this.props.navigation}
                icon={{
                  uri: item.university != null ? item.university.photo : "uri_nula"
                }}
                name={item.name}
                id={item.id}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              this.state.fetchingNewData || this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="asignaturas" />
              )
            }
          />
        )}
      </View>
    );
  }
}
