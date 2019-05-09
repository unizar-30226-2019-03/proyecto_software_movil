import React from "react";

import { View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

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
 * width, height: altura y anchura del vídeo.
 */
export default class VideoConSinFlechaAtras extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantallaCompleta: false,
      orientationChangeSecondCall: false, // onFullscreenUpdate llama dos veces seguidas.
      posicion: 0,
      duracion: 0,
      showControls: false
    };

    this.controlTimeout = null;
  }

  showControls = () => {
    this.clearTimeout();
    this.setState({ showControls: true });
    this.setControlTimeout();
  };

  setControlTimeout = () => {
    this.controlTimeout = setTimeout(() => {
      this.setState({ showControls: false });
    }, 2200);
  };

  clearTimeout = () => {
    if (this.controlTimeout != null) {
      clearTimeout(this.controlTimeout);
    }
  };

  clearControlTimeout = () => {
    this.clearTimeout();
  };

  componentWillUnmount = () => {
    this.clearTimeout();
  };

  orientationChange = () => {
    if (this.state.orientationChangeSecondCall) {
      this.setState({
        orientationChangeSecondCall: false,
        pantallaCompleta: !this.state.pantallaCompleta
      });

      if (this.state.pantallaCompleta) {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
        this.setState({
          showControls: false
        });
      } else {
        this.clearTimeout();
        this.setState({
          showControls: true
        });
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
      }
    } else {
      this.setState({
        orientationChangeSecondCall: true
      });
    }
  };

  devuelveEstado = () => {
    return this.state.posicion;
  };

  devuelveDuracion = () => {
    return this.state.duracion;
  };

  cambio = nuevo => {
    let posicion = nuevo.positionMillis;
    let duracion = Math.floor(nuevo.durationMillis / 1000 + 0.5);
    this.setState({ posicion: posicion, duracion: duracion });
  };

  render() {
    const maxWidth = this.props.width == undefined ? ScreenWidth : videoProps.width;

    const maxHeight = this.props.height == undefined ? FullScreen16_9_Height : videoProps.height;

    const screenRatio = maxWidth / maxHeight;
    let videoHeight = maxHeight;
    let videoWidth = videoHeight * screenRatio;
    if (videoWidth > maxWidth) {
      videoWidth = maxWidth;
      videoHeight = videoWidth / screenRatio;
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.showControls()}>
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
            useNativeControls={!this.props.flechaSi || (this.props.flechaSi && this.state.showControls)}
            shouldPlay={this.props.autoplay}
            style={{ width: videoWidth, height: videoHeight }}
            onFullscreenUpdate={() => this.orientationChange()}
            progressUpdateIntervalMillis={1000}
            onPlaybackStatusUpdate={tiempo => this.cambio(tiempo)}
          />
          {this.props.flechaSi && this.state.showControls ? (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.zonaFlechaAtras}>
              <Icon type="octicon" size={35} name="chevron-left" color="white" iconStyle={styles.flechaAtras} />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
