import React from "react";

import { View, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";

import { Video, ScreenOrientation } from "expo";

import { ScreenWidth, FullScreen16_9_Height } from "../../constants";

import styles from "./styles";

/*
 * PROPS:
 * source={uri} uri del video
 * thumbnail={uri} uri de la thumbnail
 * autoplay={true / false}
 * flechaSi={true / false} si el video tiene flecha para volver atrás o no
 * goBackDestination="destino" destino de navigation, en caso de que flechaSi == {true}
 * width, height: altura y anchura del vídeo.
 */
export default class VideoConSinFlechaAtras extends React.Component {
  state = {
    pantallaCompleta: false,
    orientationChangeSecondCall: false, // onFullscreenUpdate llama dos veces seguidas.
    posicion: 0,
    duracion: 0
  };

  orientationChange() {
    if (this.state.orientationChangeSecondCall) {
      this.setState({
        orientationChangeSecondCall: false,
        pantallaCompleta: !this.state.pantallaCompleta
      });

      this.state.pantallaCompleta
        ? ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT)
        : ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    } else {
      this.setState({
        orientationChangeSecondCall: true
      });
    }
  }
  devuelveEstado() {
    return this.state.posicion;
  }
  devuelveDuracion() {
    return this.state.duracion;
  }
  cambio(nuevo) {
    let posicion = nuevo.positionMillis;
    let duracion = Math.floor(nuevo.durationMillis / 1000 + 0.5);
    this.setState({ posicion: posicion, duracion: duracion });
  }
  render() {
    const maxWidth =
      this.props.width == undefined ? ScreenWidth : videoProps.width;

    const maxHeight =
      this.props.height == undefined
        ? FullScreen16_9_Height
        : videoProps.height;

    const screenRatio = maxWidth / maxHeight;
    let videoHeight = maxHeight;
    let videoWidth = videoHeight * screenRatio;
    if (videoWidth > maxWidth) {
      videoWidth = maxWidth;
      videoHeight = videoWidth / screenRatio;
    }
    return (
      <View style={{ backgroundColor: "black" }}>
        <Video
          ref={ref => {
            this.Video_ref = ref;
          }}
          posterSource={{ uri: this.props.thumbnail }}
          source={{ uri: this.props.source }}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="contain"
          useNativeControls={true}
          shouldPlay={this.props.autoplay}
          style={{ width: videoWidth, height: videoHeight }}
          onFullscreenUpdate={() => this.orientationChange()}
          progressUpdateIntervalMillis={1000}
          onPlaybackStatusUpdate={tiempo => this.cambio(tiempo)}
        />
        {this.props.flechaSi == true ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(this.props.goBackDestination)
            }
            style={styles.zonaFlechaAtras}
          >
            <Icon
              type="octicon"
              size={35}
              name="chevron-left"
              color="lightgrey"
              iconStyle={styles.flechaAtras}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
