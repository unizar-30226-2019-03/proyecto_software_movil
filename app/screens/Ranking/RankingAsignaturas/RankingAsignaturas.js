import React from "react";
import { Text, View, Button, FlatList, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

import Auth from "../../../config/Auth";

import RippleTouchable from "../../../components/RippleTouchable";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { SubjectApi, ApiClient } from "swagger_unicast";

import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import IconoAsignaturaUniversidad from "../../../components/IconoAsignaturaUniversidad";

import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

export default class RankingAsignaturas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      fetchingNewData: false,
      refreshing: false
    };

    this.offset = 0;
    this.totalPages = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new SubjectApi();
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    if (this.totalPages == undefined || this.offset < this.totalPages) {
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0,
        page: this.offset,
        projection: "subjectWithUniversity"
      };
      this.apiInstance.getSubjectRanking(opts, (error, data, response) => {
        console.log(error);
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.getData);
          }
        } else {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.subjects],
            loading: false,
            refreshing: false,
            fetchingNewData: false
          });
        }
      });
    } else {
      this.setState({ fetchingNewData: false, refreshing: false, loading: false });
    }
  };

  onEndReached = () => {
    if (!this.state.fetchingNewData && !this.state.refreshing) {
      this.setState({ fetchingNewData: true });
      this.getData();
    }
  };

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

  icon = index => {
    let color = "white";

    if (index == 0) {
      color = "gold";
    } else if (index == 1) {
      color = "silver";
    } else if (index == 2) {
      color = "brown";
    }

    if (index < 3) {
      return (
        <View style={styles.trophyView}>
          <Icon name="trophy" type="font-awesome" color={color} />
        </View>
      );
    } else {
      <View style={styles.trophyView} />;
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
            onEndReached={() => this.onEndReached()}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => (
              <RippleTouchable
                onPress={() =>
                  this.props.navigation.navigate("Asignatura", {
                    title: item.name,
                    id: item.id
                  })
                }
                style={styles.rankingPlace}
              >
                <View style={styles.rankNumberView}>
                  <Text style={styles.rankNumber}>{index + 1 + "."}</Text>
                </View>
                <View style={styles.iconoAsignaturaUniversidad}>
                  <IconoAsignaturaUniversidad
                    name={item.abbreviation}
                    image={{ uri: item.university != undefined ? item.university.photo : "uri_nula" }}
                  />
                </View>
                {this.icon(index)}
                <View style={styles.rankScoreView}>
                  <Text style={styles.rankScore}>{Math.floor(item.avgScore * 20) + "%"}</Text>
                </View>
              </RippleTouchable>
            )}
            ListFooterComponent={LoadingFooter({
              show: this.state.fetchingNewData
            })}
            ListEmptyComponent={
              this.state.fetchingNewData || this.state.refreshing ? null : (
                <NoHayContenidoQueMostrar what="asignaturas" />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
