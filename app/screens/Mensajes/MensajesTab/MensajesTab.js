import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, FlatList, View } from "react-native";

import { Image } from "react-native-elements";

import { MessageApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import { timeStampToChatDate } from "../../../components/Time";

import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import RippleTouchable from "../../../components/RippleTouchable";
import LoadingFooter from "../../../components/LoadingFooter";
import NoHayContenidoQueMostrar from "../../../components/NoHayContenidoQueMostrar";

import styles from "./styles";

export default class MensajesTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };

    this.updating = false;

    this.currentDate = null;

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new MessageApi();
  }

  componentDidMount = () => {
    this.getData();
    UnicastNotifications.setNewMessageCallback(this.getData);
  };

  componentWillUnmount = () => {
    UnicastNotifications.cleanNewMessageCallback();
  };

  getData = () => {
    if (!this.updating) {
      this.updating = true;

      this.setState({
        loading: true
      });

      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: 0
      };
      this.apiInstance.getLastMessages(opts, (error, data, response) => {
        console.log(data);
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.getData);
          }
        } else {
          console.log("DMENAJES    DAWDAWDAW");
          console.log("Message data : ", data);
          let newData = null;
          if (data._embedded) {
            newData = data._embedded.messages;
          } else {
            newData = data._embedded["messages"] = [];
          }
          this.currentDate = ApiClient.parseDate(response.headers.date);
          this.setState({
            data: [...newData],
            loading: false
          });
        }
        this.updating = false;
      });
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
                    <Image
                      source={{
                        uri: usuario.photo
                      }}
                      style={styles.profilePic}
                    />
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
