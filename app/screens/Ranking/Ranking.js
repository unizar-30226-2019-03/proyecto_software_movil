import React from "react";
import { Text, View, Button, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import LoadingFooter from "../../components/LoadingFooter";

import styles from "./styles";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { temp: "temp" },
        { temp: "temp" },
        { temp: "temp" },
        { temp: "temp" },
        { temp: "temp" }
      ],
      loading: true,
      fetchingNewData: false,
      refreshing: false
    };

    this.offset = 0;
    this.totalPages = undefined;

    // let defaultClient = ApiClient.instance;
    // let bearerAuth = defaultClient.authentications["bearerAuth"];
    // bearerAuth.accessToken = getUserToken();

    // this.videoApiInstance = new VideoApi();

    // this.getData();
    this.state.loading = false;
  }

  getData = () => {
    // if (this.totalPages == undefined || this.offset < this.totalPages) {
    //   let opts = {
    //     page: this.offset,
    //     cacheControl: "no-cache, no-store, must-revalidate",
    //     pragma: "no-cache",
    //     expires: 0
    //   };
    //   this.videoApiInstance.getVideos((error, data, response) => {
    //     if (!error) {
    //       this.offset = this.offset + 1;
    //       this.totalPages = data.page.totalPages;
    //       this.setState({
    //         data: [...this.state.data, ...data._embedded.videos],
    //         loading: false,
    //         fetchingNewData: false,
    //         refreshing: false
    //       });
    //     }
    //   });
    // }
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
      this.totalPages = undefined;
      this.setState({
        refreshing: true,
        data: [],
        fetchingNewData: false,
        loading: false
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
            data={this.state.data}
            refreshing={this.state.refreshing}
            onEndReached={() => this.onEndReached()}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => (
              <View style={styles.rankingPlace}>
                <Text style={styles.rankNumber}>1.</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Asignatura", {
                      title: "UPM - Proyecto software"
                    })
                  }
                >
                  <IconoAsignaturaUniversidad
                    name="Multiprocesadores"
                    image={require("../../../test/imagenes/perfil_uni.jpg")}
                  />
                </TouchableOpacity>
                {this.icon(index)}
                <Text style={styles.rankScore}>99.98%</Text>
              </View>
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
