import React from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  ListView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import Descripcion from "../../components/Descripcion";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";
import Comentario from "../../components/Comentario";
import { headerHeight } from "../../constants";

import ApiClient from "swagger_unicast/dist/ApiClient";
import { VideoApi, VoteApi, CommentApi, UserApi } from "swagger_unicast";
import { isSignedIn, getUserToken, getUserId } from "../../config/Auth";

import BotonSeguirAsignatura from "../../components/BotonSeguirAsignatura/BotonSeguirAsignatura";

export default class ViendoVideo extends React.Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var vacio = [];
    var aux = {
      url:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      score: undefined
    };
    this.state = {
      comentarios: vacio,
      comentariosMostrar: vacio,
      seguida: false,
      texto: "Seguir asignatura",
      segundo: 0,
      dataSource: ds,
      largo: false,
      ultimoAñadido: -1,
      text: "",
      nombreUsuario: "Juan Asensio",
      video: aux,
      idUsuario: getUserId()
    };
    var SwaggerUnicast = require("swagger_unicast");
    this.videoApi = new SwaggerUnicast.VideoApi();

    this.commentApi = new SwaggerUnicast.CommentApi();
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    const id = 6;
    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      projection: "videoWithSubject" // String | Incluir si se quiere obtener tambien la universidad y/o la asignatura en la respuesta
    };
    this.videoApi.getVideo(id, opts, (error, data, response) => {
      if (error) {
        console.error(error);
        console.log(data);
      } else {
        const now = ApiClient.parseDate(response.headers.date);
        this.setState({
          video: data,
          timeNow: now
        });
        // Alert.alert(this.state.video.url);
        this.obtenerAsignaturaUni(data);
        this.obtenerComentarios(data);
      }
    });
  }

  obtenerComentarios(video) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      sort: ["asc"] // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
    };
    this.commentApi.getCommentsByVideo(
      video.id,
      opts,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data);

          let com = data._embedded.comments.map(c => {
            const t = c.secondsFromBeginning;
            const text = c.text;
            const user = "Juan Asensio";

            return {
              tiempo: t,
              cuerpoComentario: text,
              nombreUsuario: user
            };
          });
          console.log(com);
          this.setState({ comentarios: com });
        }
      }
    );
  }

  addComment(comment, time, id) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();
    this.commentApi.addComment(
      comment,
      Math.floor(time),
      id,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      }
    );
  }

  obtenerAsignaturaUni(video) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    };
    this.videoApi.getVideoSubject(video.id, opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        this.setState({ asig: data });
      }
    });
  }
  s;

  componentDidMount() {
    this.interval = setInterval(() => this.pasaSegundo(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTimePassed(date1, now) {
    const diffMs = now - date1;
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins > 60) {
      const diffHrs = Math.floor(diffMs / 3600000);
      if (diffHrs > 24) {
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffDays > 7) {
          const diffWeeks = Math.floor(diffMs / 604800000);
          if (diffWeeks > 4) {
            const diffMonths = Math.floor(diffMs / 2629800000);
            if (diffMonths > 12) {
              const diffYears = Math.floor(diffMs / 31556952000);
              return `${diffYears} años`;
            } else {
              return `${diffMonths} meses`;
            }
          } else {
            return `${diffWeeks} semanas`;
          }
        } else {
          return `${diffDays} días`;
        }
      } else {
        return `${diffHrs} horas`;
      }
    } else {
      return `${diffMins} minutos`;
    }
  }
  pasaSegundo() {
    this.setState({
      largo: Math.floor(this.VideoFlechaRef.devuelveDuracion() / 3600) > 0
    });
    var nuevo = this.VideoFlechaRef.devuelveEstado();
    nuevo = Math.floor(nuevo / 1000 + 0.5);
    this.setState({ segundo: nuevo });
    var añadir = this.state.comentariosMostrar;
    var i = this.state.ultimoAñadido + 1;

    if (i < this.state.comentarios.length) {
      while (
        i < this.state.comentarios.length &&
        this.state.comentarios[i].tiempo <= nuevo
      ) {
        añadir = [...añadir, this.state.comentarios[i]];

        i = i + 1;
      }
    }

    var ds = this.state.dataSource;
    this.setState({
      comentariosMostrar: añadir,
      ultimoAñadido: i - 1,
      dataSource: ds.cloneWithRows(añadir)
    });
  }

  comentar = () => {
    var añadidos = this.state.comentariosMostrar;
    var ds = this.state.dataSource;
    añadidos = [
      ...añadidos,
      {
        cuerpoComentario: this.state.text,
        tiempo: this.state.segundo,
        nombreUsuario: this.state.nombreUsuario
      }
    ];
    this.addComment(this.state.text, this.state.segundo, this.state.video.id);
    this.setState({
      text: "",
      dataSource: ds.cloneWithRows(añadidos),
      comentariosMostrar: añadidos
    });
  };
  boton = () => {
    if (this.state.text.length > 0) {
      return (
        <Text style={styles.enviar} onPress={() => this.comentar()}>
          Comentar
        </Text>
      );
    }
  };
  render() {
    return (
      /*
      
        <Text>TODO VIENDO VIDEO</Text>
        <Button
          title="ATRAS"
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("Asignatura", {
              title: "Una asignatura"
            })
          }
          title="IR ASIGNATURA"
        /> */
      //QUITO TODO LO ANTERIOR?????????
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={headerHeight - 80}
      >
        <View style={styles.videoContainer}>
          <VideoConSinFlechaAtras
            flechaSi={true}
            goBackDestination={""}
            navigation={this.props.navigation}
            source={this.state.video.url}
            thumbnail={this.state.video.thumbnailUrl}
            autoplay={true}
            ref={ref => {
              this.VideoFlechaRef = ref;
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: 105 }}>
            <CuadroValorar
              puntuacion={this.state.video.score}
              usuario={this.state.idUsuario}
              videoId={this.state.video.id}
              navigation={this.props.navigation}
              tituloVideo={this.state.video.title}
              tiempoPasado={
                "Subido hace " +
                this.getTimePassed(
                  this.state.video.timestamp,
                  this.state.timeNow
                )
              }
            />
          </View>
          <View style={styles.dejarDeSeguir}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
              activeOpacity={1}
              style={styles.asignaturaContainer}
            >
              <IconoAsignaturaUniversidad
                style={{
                  alignSelf: "flex-start"
                }}
                navigation={this.props.navigation}
                name="Proyecto Software"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 60 }}>
              <BotonSeguirAsignatura />
            </View>
          </View>
          <Descripcion
            texto={this.state.video.description}
            navigation={this.props.navigation}
          />
          <View style={{ flex: 1 }}>
            <View style={{ maxHeight: 300 }}>
              <ListView
                ref={ref => {
                  this.ListView_Ref = ref;
                }}
                onContentSizeChange={() =>
                  this.ListView_Ref.scrollToEnd({
                    animated: true
                  })
                }
                dataSource={this.state.dataSource}
                renderRow={rowData => (
                  <Comentario
                    nombreUsuario={rowData.nombreUsuario}
                    cuerpoComentario={rowData.cuerpoComentario}
                    tiempo={rowData.tiempo}
                    largo={this.state.largo}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.entradaTexto}>
            <TextInput
              placeholder="Escribe un Comentario"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline={true}
              style={[styles.textInput, { maxHeight: 80 }]}
            />
            {this.boton()}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
