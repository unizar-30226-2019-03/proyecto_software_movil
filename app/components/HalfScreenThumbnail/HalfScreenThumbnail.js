/**
 * @fileoverview Thumbnail de anchura igual a la mitad de la pantalla de un vídeo.
 * @requires ../../constants:VerdeClaro
 * @requires ../../constants:RojoClaro
 * @requires ../AnyadirALista:AnyadirALista
 * @requires ../../components/RippleTouchable:RippleTouchable
 *
 */
import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

import { VerdeClaro, RojoClaro } from "../../constants";

import AnyadirALista from "../AnyadirALista";

import RippleTouchable from "../../components/RippleTouchable";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";
/**
 * @param {Object} props Props que se le pasa al componente.
 * 		props.type="historial"|"Eliminar video"|"lista"|"mis_listas"
 * 		indica que tipo de mensaje "Eliminar de" debe mostrar
 * 		props.itemId id del video,
 * 		props.image thumbnail,
 * 		props.title titulo del video,
 * 		props.info informacion del video
 * 		props.duracion duracion del video
 * 		props.likes valoracion del video
 * @module HalfScreenThumbnail
 *
 *
 */
export default class HalfScreenThumbnail extends React.Component {
  state = {
    popUpVisible: false,
    anyadirAListaVisible: false
  };

  /**
   * Oculta el modal de añadir a lista
   */
  hideAnyadirALista = () => {
    this.setState({
      anyadirAListaVisible: false
    });
  };

  render() {
    let eliminarText;
    if (this.props.type == "historial") {
      eliminarText = "Eliminar del historial";
    } else if (this.props.type == "mis_videos") {
      eliminarText = "Eliminar vídeo";
    } else if (this.props.type == "lista") {
      eliminarText = "Eliminar de la lista";
    } else if (this.props.type == "mis_listas") {
      eliminarText = "Eliminar lista";
    }

    const likes = Math.floor(this.props.likes * 20);
    return (
      <RippleTouchable
        onPress={() =>
          this.props.type == "mis_listas"
            ? this.props.navigation.navigate("ListaVideos", {
                title: this.props.itemName,
                id: this.props.itemId,
                type: "lista"
              })
            : this.props.navigation.navigate("ViendoVideo", {
                id: this.props.itemId
              })
        }
        style={styles.container}
      >
        <View style={styles.rowContainer}>
          <ImageBackground
            source={this.props.image}
            style={styles.videoThumbnailContainer}
          >
            <View style={styles.duracionYLikesContainer}>
              {this.props.likes != null ? (
                <Text
                  style={[
                    styles.likes,
                    { color: likes > 49 ? VerdeClaro : RojoClaro }
                  ]}
                >
                  {likes + "%"}
                </Text>
              ) : null}
              {this.props.duracion != null ? (
                <Text style={styles.duracion}>{this.props.duracion}</Text>
              ) : null}
            </View>
          </ImageBackground>
          <View style={styles.titleYInfoContainer}>
            <Text style={styles.title} numberOfLines={3}>
              {this.props.title}
            </Text>
            <Text style={styles.info}>{this.props.info}</Text>
          </View>
        </View>
        {this.props.hideMenu ? null : (
          <Menu
            style={styles.dropDownMenuContainer}
            opened={this.state.popUpVisible}
            onBackdropPress={() => this.setState({ popUpVisible: false })}
          >
            <MenuTrigger
              onPress={() =>
                this.props.canShowPopUp
                  ? this.setState({ popUpVisible: true })
                  : null
              }
            >
              <SimpleLineIcons
                name={"options-vertical"}
                style={styles.optionsIcon}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() =>
                  this.setState({
                    popUpVisible: false
                  }) ||
                  this.props.deleteCallback(this.props.index, this.props.itemId)
                }
              >
                <Text style={styles.popUpMenuText}>{eliminarText}</Text>
              </MenuOption>
              {this.props.type != "mis_listas" ? (
                <MenuOption
                  onSelect={() =>
                    this.setState({
                      popUpVisible: false,
                      anyadirAListaVisible: true
                    })
                  }
                >
                  <Text style={styles.popUpMenuText}>
                    Añadir a lista de reproducción
                  </Text>
                </MenuOption>
              ) : null}
            </MenuOptions>
          </Menu>
        )}
        {this.props.type != "mis_listas" && !this.props.hideMenu ? (
          <AnyadirALista
            visible={this.state.anyadirAListaVisible}
            hide={this.hideAnyadirALista}
            videoId={this.props.itemId}
          />
        ) : null}
      </RippleTouchable>
    );
  }
}
