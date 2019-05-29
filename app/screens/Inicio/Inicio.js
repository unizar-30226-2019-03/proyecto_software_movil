import React from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Linking,
  Alert,
  InteractionManager
} from "react-native";

import { VideoApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import UnicastNotifications from "../../config/UnicastNotifications";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import LoadingFooter from "../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../components/NoHayContenidoQueMostrar";

import { timeStampToFormat, secToDuration } from "../../components/Time";

import SearchMenu from "../../components/SearchMenu";

import styles from "./styles";

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      refreshing: false
    };

    this.currentDate = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();
    this.navigation = this.props.navigation;
    this.apiInstance = new VideoApi();
    this._handleOpenURL = this._handleOpenURL.bind(this);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this._handleOpenURL);
  }

  componentDidMount() {
    //this.props.navigation.navigate("Chat", {
    //title: "PRUEBA",
    //photo: "../../assets/icon_unicast.jpg",
    // id: 1
    // });

    this.getData();
    UnicastNotifications.fireSingleton();

    Linking.addEventListener("url", this._handleOpenURL);

    Linking.getInitialURL().then(url => {
      if (url.includes("unicast-web.s3-website.eu-west-3.amazonaws.com")) {
        //Descarta si la url es http:// ( si se entra sin pulsar enlace)
        //Alert.alert("Initial url is: " + url);

        let { path, queryParams } = Expo.Linking.parse(url);

        //Alert.alert(queryParams.id.toString(10));
        id = queryParams.id;
        //Alert.alert(id.toString(10));
        // id = 1;
        if (id != undefined) {
          this.props.navigation.navigate("ViendoVideo", {
            id: id
          });
        }
      } else {
        if (url.length > 7) {
          Alert.alert("URL INCORRECTA");
        }
      }
    });
  }

  _handleOpenURL(event) {
    //this.forceUpdate();
    ///Alert.alert(event.url);
    if (event.url.includes("unicast-web.s3-website.eu-west-3.amazonaws.com")) {
      let { path, queryParams } = Expo.Linking.parse(event.url);
      id = queryParams.id;
      //Alert.alert(id.toString(10));
      this.props.navigation.navigate("ViendoVideo", {
        id: id
      });
    } else {
      Alert.alert("URL INCORRECTA");
    }
  }

  getData = () => {
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0,
      projection: "videoWithSubjectAndUniversity"
    };
    this.apiInstance.findRecommendedVideos(opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.getData);
        }
      } else {
        this.currentDate = ApiClient.parseDate(response.headers.date);
        this.setState({
          data: [...data._embedded.videos],
          loading: false,
          refreshing: false
        });

        console.log("DATOSSSSSS");
        console.log(data);
      }
    });
  };

  onRefresh = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
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
          {
            justifyContent: this.state.loading ? "center" : "flex-start"
          }
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
              this.state.refreshing ? null : (
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
