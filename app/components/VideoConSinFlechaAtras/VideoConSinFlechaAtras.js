import React from "react";

import { View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import { Icon } from "react-native-elements";

import { Video, ScreenOrientation } from "expo";

import { ScreenWidth, FullScreen16_9_Height } from "../../constants";

import ApiClient from "swagger_unicast/dist/ApiClient";
import Auth from "../../config/Auth";
import { DisplayApi } from "swagger_unicast";
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
      showControls: false
    };

    this.orientationChangeSecondCall = false; // onFullscreenUpdate llama dos veces seguidas.
    let SwaggerUnicast = require("swagger_unicast");
    this.displayApi = new SwaggerUnicast.DisplayApi();
    let defaultClient = ApiClient.instance;

    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();
    this.controlTimeout = null;
    this.duracion = this.props.duracion;
    this.posicion = 0;
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

  devuelveEstado = () => {
    return this.posicion;
  };

  devuelveDuracion = () => {
    return this.duracion;
  };

  devuelvePosicion = () => {
    return this.posicion;
  };

  componentWillUnmount = () => {
    let posicionAux = this.devuelvePosicion();
    if (posicionAux >= this.devuelveDuracion()) {
      posicionAux = 0;
    }
    if (this.props.videoId) {
      this.displayApi.updateDisplay(posicionAux, this.props.videoId);
    }
    this.clearTimeout();
  };

  orientationChange = () => {
    if (this.orientationChangeSecondCall) {
      this.orientationChangeSecondCall = false;
      if (this.state.pantallaCompleta) {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
        this.setState({
          pantallaCompleta: false,
          showControls: false
        });
      } else {
        this.clearTimeout();
        this.setState({
          pantallaCompleta: true,
          showControls: true
        });
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
      }
    } else {
      this.orientationChangeSecondCall = true;
    }
  };

  cambio = nuevo => {
    let posicion = Math.floor(nuevo.positionMillis / 1000);

    this.posicion = posicion;
  };

  componentDidMount = () => {
    let id = this.props.videoId;
    if (id) {
      const opts2 = {
        cacheControl: "no-cache, no-store, must-revalidate",
        pragma: "no-cache",
        expires: "0",
        projection: "displayWithVideo"
      };
      this.displayApi.findByUserIdAndVideoId(
        id,
        opts2,
        (error, data, response) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            if (data.secsFromBeg == this.props.duracion) {
              this.Video_ref.playFromPositionAsync(0);
            } else {
              this.Video_ref.playFromPositionAsync(data.secsFromBeg * 1000);
            }
          }
        }
      );
    }
  };
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
      <TouchableWithoutFeedback onPress={() => this.showControls()}>
        <View style={{ backgroundColor: "black" }}>
          <Video
            ref={ref => {
              this.Video_ref = ref;
            }}
            posterSource={{
              uri: this.props.thumbnail
            }}
            source={{ uri: this.props.source }}
            rate={1.0}
            volume={1.0}
            muted={false}
            resizeMode="contain"
            useNativeControls={
              !this.props.flechaSi ||
              (this.props.flechaSi && this.state.showControls)
            }
            shouldPlay={this.props.autoplay}
            style={{
              width: videoWidth,
              height: videoHeight
            }}
            onFullscreenUpdate={() => this.orientationChange()}
            progressUpdateIntervalMillis={1000}
            onPlaybackStatusUpdate={tiempo => this.cambio(tiempo)}
          />
          {this.props.flechaSi && this.state.showControls ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.goBack()}
              style={styles.zonaFlechaAtras}
            >
              <Icon
                type="octicon"
                size={35}
                name="chevron-left"
                color="white"
                iconStyle={styles.flechaAtras}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
