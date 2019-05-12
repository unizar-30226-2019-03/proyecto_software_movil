import React from "react";

import { View, Text, TouchableHighlight, Modal, Alert } from "react-native";
import { Icon, AirbnbRating } from "react-native-elements";
import styles from "./styles";
import { ScreenWidth, GrisClaro } from "../../constants/constants";
import ApiClient from "swagger_unicast/dist/ApiClient";
import { VoteApi } from "swagger_unicast";
import Auth from "../../config/Auth";
import VoteId from "swagger_unicast/dist/model/VoteId";
import Vote2 from "swagger_unicast/dist/model/Vote2";
export default class CuadroValorar extends React.Component {
  constructor() {
    super();
    this.state = {
      mostrar: false,
      guardado: false,
      claridad: 3,
      calidad: 3,
      adecuacion: 3
    };
    var SwaggerUnicast = require("swagger_unicast");
    this.voteApi = new SwaggerUnicast.VoteApi();
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();
  }
  puntuar() {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();
    //Enviar al servidor la puntuación actual
    const voteid = new VoteId(this.props.videoId, this.props.usuario);
    const vote = new Vote2(voteid, this.state.claridad, this.state.calidad, this.state.adecuacion);
    this.quitarPopUp();
    this.voteApi.addVote(vote, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    });
  }
  quitarPopUp() {
    this.setState({ mostrar: false });
  }
  cambiarIcono() {
    if (this.state.guardado == true) {
      this.setState({ guardado: false });
    } else {
      this.setState({ guardado: true });
    }
  }
  valoracion() {
    if (!isNaN(this.props.puntuacion) && this.props.puntuacion > 0) {
      return Math.floor((this.props.puntuacion * 100) / 5).toString() + "%";
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.valorar}>
          <View style={styles.titulo}>
            <Text style={{ flex: 0.8, fontSize: 20 }}>{this.props.tituloVideo}</Text>

            <Text style={styles.valoracion}> {this.valoracion()}</Text>
          </View>
          <Text style={styles.fecha}> {this.props.tiempoPasado}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableHighlight onPress={() => this.setState({ mostrar: true })} style={styles.botonValorar}>
              <Text style={{ fontSize: 18 }}> Valorar vídeo</Text>
            </TouchableHighlight>
            <Icon
              name={[this.state.guardado == true ? "bookmark" : "bookmark-o"]}
              type="font-awesome"
              size={35}
              iconStyle={{ marginLeft: 100 }}
              onPress={() => this.cambiarIcono()}
              color={GrisClaro}
            />
            <Icon
              name="share-alt"
              type="font-awesome"
              size={35}
              iconStyle={{ marginLeft: 20 }}
              onPress={() => null}
              color={GrisClaro}
            />
          </View>
        </View>

        <Modal visible={this.state.mostrar} transparent={true} onRequestClose={() => null}>
          <View style={styles.popUp}>
            <View style={styles.apartados}>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Claridad</Text>
                <AirbnbRating
                  size={35}
                  defaultRating={this.state.claridad}
                  showRating={false}
                  onFinishRating={rating => {
                    this.setState({
                      claridad: Math.round(rating)
                    });
                  }}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Calidad</Text>
                <AirbnbRating
                  size={35}
                  defaultRating={this.state.calidad}
                  showRating={false}
                  onFinishRating={rating => {
                    this.setState({
                      calidad: Math.round(rating)
                    });
                  }}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Adecuación</Text>
                <AirbnbRating
                  size={35}
                  defaultRating={this.state.adecuacion}
                  showRating={false}
                  onFinishRating={rating => {
                    this.setState({
                      adecuacion: Math.round(rating)
                    });
                  }}
                />
              </View>

              <TouchableHighlight onPress={() => this.puntuar()}>
                <Text style={styles.valorarTexto}>Valorar</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.quitarPopUp()}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
