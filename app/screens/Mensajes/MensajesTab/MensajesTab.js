import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, FlatList, View } from "react-native";

import { Image } from "react-native-elements";

import { UserApi, MessageApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import RippleTouchable from "../../../components/RippleTouchable";

import LoadingFooter from "../../../components/LoadingFooter";

import styles from "./styles";

const samplePic =
  "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

export default class MensajesTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      fetchingNewData: false,
      refreshing: false
    };

    this.barrier = 0;
    this.offset = 0;
    this.totalPages = undefined;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.userApiInstance = new UserApi();
    this.messageApiInstance = new MessageApi();
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
        sort: ["desc"]
      };
      this.userApiInstance.findUserProfessors(opts, (error, data, response) => {
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.getData);
          }
        } else {
          console.log(data);
          let newData = [];
          data._embedded.users.forEach(item => console.log(item));

          // ultimo mensaje de cada profesor

          // BARERRA

          this.offset = this.offset + 1;
          this.totalPages = data.page.totalPages;
          this.setState({
            data: [...this.state.data, ...data._embedded.users],
            loading: false,
            fetchingNewData: false,
            refreshing: false
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
      <View style={[styles.container, { justifyContent: this.state.loading ? "center" : "flex-start" }]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={this.state.data}
            refreshing={this.state.refreshing}
            onEndReached={() => this.onEndReached()}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => (
              <RippleTouchable
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    title: "Matilde P."
                  })
                }
              >
                <View style={styles.chatContainer}>
                  <Image source={{ uri: samplePic }} style={styles.profilePic} />
                  <View style={styles.nameAndMsgContainer}>
                    <Text numberOfLines={1} style={styles.nameText}>
                      Luis Fonsi
                    </Text>
                    <Text numberOfLines={1} style={styles.msgText}>
                      Las notas de aprendizaje automático ya se han subido, puedes consultarlas donde te plazca
                    </Text>
                  </View>
                  <Text style={styles.hourText}>12:58</Text>
                </View>
              </RippleTouchable>
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
