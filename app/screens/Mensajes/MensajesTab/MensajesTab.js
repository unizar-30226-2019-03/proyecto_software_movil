import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, FlatList, View } from "react-native";

import { Image } from "react-native-elements";

import { MessageApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { timeStampToChatDate } from "../../../components/Time";

import RippleTouchable from "../../../components/RippleTouchable";
import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

const samplePic =
  "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

export default class MensajesTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };

    this.currentDate = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new MessageApi();
  }

  componentDidMount = () => {
    this.getData();
    UnicastNotifications.fireSingleton();
  };

  getData = () => {
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.apiInstance.getLastMessages(opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.getData);
        }
      } else {
        console.log("DMENAJES    DAWDAWDAW");
        console.log(data);
        this.currentDate = ApiClient.parseDate(response.headers.date);
        this.setState({
          data: [...data._embedded.messages],
          loading: false
        });
      }
    });
  };

  render() {
    return (
      <View style={[styles.container, { justifyContent: this.state.loading ? "center" : "flex-start" }]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => {
              let usuario = item.sender.id == Auth.getUserId() ? item.receiver : item.sender;
              return (
                <RippleTouchable
                  onPress={() =>
                    this.props.navigation.navigate("Chat", {
                      title: usuario.name,
                      photo: usuario.photo,
                      id: usuario.id
                    })
                  }
                >
                  <View style={styles.chatContainer}>
                    <Image source={{ uri: usuario.photo }} style={styles.profilePic} />
                    <View style={styles.nameAndMsgContainer}>
                      <Text numberOfLines={1} style={styles.nameText}>
                        {usuario.name + ", " + usuario.surnames}
                      </Text>
                      <Text numberOfLines={1} style={styles.msgText}>
                        {item.text}
                      </Text>
                    </View>
                    <Text style={styles.hourText}>{timeStampToChatDate(item.timestamp, this.currentDate)}</Text>
                  </View>
                </RippleTouchable>
              );
            }}
            ListEmptyComponent={<NoHayContenidoQueMostrar what="mensajes" />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
