import React from "react";
import { Text, View, Button, FlatList, TouchableNativeFeedback, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import { SubjectApi, ApiClient } from "swagger_unicast";

import LoadingFooter from "../../components/LoadingFooter";

import styles from "./styles";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";

export default class Ranking extends React.Component {
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
        console.log(data);
        if (error) {
          HaOcurridoUnError(this.getData);
        } else {
          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.subjects],
            currentDate: ApiClient.parseDate(response.headers.date),
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
    let hidden = false;

    if (index == 0) {
      color = "gold";
    } else if (index == 1) {
      color = "silver";
    } else if (index == 2) {
      color = "brown";
    } else {
      hidden = true;
    }

    return (
      <View style={hidden ? styles.hidden : null}>
        <Icon name="trophy" type="font-awesome" color={color} />
      </View>
    );
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
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate("Asignatura", {
                    title: item.name,
                    id: item.id
                  })
                }
              >
                <View style={styles.rankingPlace}>
                  <Text style={styles.rankNumber}>{index + 1 + "."}</Text>
                  <IconoAsignaturaUniversidad name={item.abbreviation} image={{ uri: item.university.photo }} />
                  {this.icon(index)}
                  <Text style={styles.rankScore}>{Math.floor(item.avgScore * 20) + "%"}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            ListFooterComponent={LoadingFooter({
              show: this.state.fetchingNewData
            })}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
