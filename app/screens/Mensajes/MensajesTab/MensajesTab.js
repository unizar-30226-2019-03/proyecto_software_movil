import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View
} from "react-native";
import { Image } from "react-native-elements";

import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

const samplePic =
  "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

export default class MensajesTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{ temp: "temp" }],
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
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    title: "Matilde P."
                  })
                }
              >
                <Image source={{ uri: samplePic }} style={styles.profilePic} />
                <View style={styles.nameAndMsgContainer}>
                  <Text numberOfLines={1} style={styles.nameText}>
                    Luis Fonsi
                  </Text>
                  <Text numberOfLines={1} style={styles.msgText}>
                    Las notas de aprendizaje automático ya se han subido, puedes
                    consultarlas donde te plazca
                  </Text>
                </View>
                <Text style={styles.hourText}>12:58</Text>
              </TouchableOpacity>
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
