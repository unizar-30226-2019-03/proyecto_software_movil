/**
 * @fileoverview Pantalla viendo video
 * @author Unicast
 * @requires ../../components/VideoConSinFlechaAtras:VideoConSinFlechaAtras
 * @requires ../../components/CuadroValorar:CuadroValorar
 * @requires ../../components/Descripcion:Descripcion
 * @requires ../../components/IconoAsignaturaUniversidad:IconoAsignaturaUniversidad
 * @requires ../../components/Comentario:Comentario
 * @requires swagger_unicast:ApiClient
 * @requires swagger_unicast:VideoApi
 * @requires swagger_unicast:VoteApi
 * @requires swagger_unicast:CommentApi
 * @requires swagger_unicast:UserApi
 * @requires swagger_unicast:DisplayApi
 * @requires swagger_unicast:SubjectApi
 * @requires ../../config/Auth:Auth
 * @requires ../../config/UnicastNotifications:UnicastNotifications
 * @requires ../../components/BotonSeguirAsignatura:BotonSeguirAsignatura
 * @requires ../../components/RippleTouchable:RippleTouchable
 *
 */
import React from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  Keyboard,
  ListView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Platform
} from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import Descripcion from "../../components/Descripcion";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";
import Comentario from "../../components/Comentario";
import { HeaderHeight } from "../../constants";

import ApiClient from "swagger_unicast/dist/ApiClient";
import {
  VideoApi,
  VoteApi,
  CommentApi,
  UserApi,
  DisplayApi,
  SubjectApi
} from "swagger_unicast";
import Auth from "../../config/Auth";

import UnicastNotifications from "../../config/UnicastNotifications";

import BotonSeguirAsignatura from "../../components/BotonSeguirAsignatura/BotonSeguirAsignatura";
import RippleTouchable from "../../components/RippleTouchable";
/**
 * Pantalla de ver video de la aplicacion
 * @module ViendoVideo
 */
export default class ViendoVideo extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let vacio = [];
    let aux = {
      url:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      score: undefined
    };
    this.state = {
      loading: true,
      comentarios: vacio,
      comentariosMostrar: vacio,
      profesores: false,
      dataSource: ds,
      largo: false,
      ultimoAñadido: -1,
      page: 0,
      obteniendoMas: false,
      obtenerMas: false,
      text: "",
      video: aux,
      focus: false,
      asig: {
        id: null,
        abbreviation: "dummy",
        university: {
          photo2: require("../../../test/imagenes/perfil_uni.jpg")
        }
      },
      photo: require("../../../test/imagenes/perfil_uni.jpg"),
      idUsuario: Auth.getUserId()
    };
  }
  /**
   * Obtiene el video a ver, la asignatura y universidad a la que pertenece
   * y todos sus comentarios
   */
  componentDidMount() {
    let SwaggerUnicast = require("swagger_unicast");
    this.videoApi = new SwaggerUnicast.VideoApi();

    this.commentApi = new SwaggerUnicast.CommentApi();
    let defaultClient = ApiClient.instance;

    this.subjectApi = new SwaggerUnicast.SubjectApi();

    this.userApi = new SwaggerUnicast.UserApi();
    this.userApi.getUser(
      this.state.idUsuario,
      opts,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({
            nombreUsuario: data.username
          });
        }
      }
    );

    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    id = this.props.navigation.getParam("id");

    //const id = 3;
    //console.log(id);
    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: "0"
    };

    this.videoApi.getVideo(id, opts, (error, data, response) => {
      if (error) {
        //// console.error(error);
        if (error.status === 403) {
          Auth.signOut(this.props.navigation);
        } else {
          Alert.alert("No se ha podido cargar el video");
          this.props.navigation.goBack(null);
        }
        //// //console.log(data);
      } else {
        const now = ApiClient.parseDate(response.headers.date);
        this.setState({
          video: data,
          timeNow: now
        });
        // Alert.alert(this.state.video.url);
        this.obtenerAsignaturaUni(id);
        this.obtenerComentarios(data);
      }
    });
  }
  /**
   * Sigue/Deja de seguir una asignatura
   */
  seguir() {
    if (this.state.seguida == true) {
      this.setState({ seguida: false });
      this.subjectApi.unfollowSubject(
        this.state.asig.id,
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            //console.log("Asignatura dejada de seguir");
          }
        }
      );
    } else {
      this.setState({ seguida: true });
      this.subjectApi.followSubject(
        this.state.asig.id,
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            //console.log("Asignatura seguida");
          }
        }
      );
    }
  }
  /**
   * Obtiene todos los comentarios del video
   * @param {Object} video Video
   */
  obtenerComentarios(video) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      sort: ["secondsFromBeginning"], // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
      projection: "commentWithUser"
    };
    this.commentApi.getCommentsByVideo(
      video.id,
      opts,
      (error, data, response) => {
        if (error) {
          //// console.error(error);
        } else {
          console.log(data);

          let com = data._embedded.comments.map(c => {
            t = c.secondsFromBeginning;

            const text = c.text;
            const user = c.user.username;

            return {
              tiempo: t,
              cuerpoComentario: text,
              nombreUsuario: user
            };
          });
          longitud = com.length;

          this.setState({ comentarios: com });
          if (longitud === 20) {
            this.setState({ obtenerMas: true, page: 1 });
          }

          console.log(com);
        }
      }
    );
  }
  /**
   * Si se requiere pide a la API mas comentarios
   */
  componentDidUpdate() {
    if (this.state.obtenerMas && !this.state.obteniendoMas) {
      this.setState({ obteniendoMas: true });
      this.obtenerComentariosPagina(this.state.video, this.state.page);
    }
  }
  /**
   * Pide la pagina page de comentarios del video
   * @param {Object} video
   * @param {Number} page pagina de comentarios a pedir
   */
  obtenerComentariosPagina(video, page) {
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      page: page,
      sort: ["secondsFromBeginning"], // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
      projection: "commentWithUser"
    };
    this.commentApi.getCommentsByVideo(
      video.id,
      opts,
      (error, data, response) => {
        if (error) {
        } else {
          let com = data._embedded.comments.map(c => {
            t = c.secondsFromBeginning;

            const text = c.text;
            const user = c.user.username;

            return {
              tiempo: t,
              cuerpoComentario: text,
              nombreUsuario: user
            };
          });
          this.setState({
            comentarios: [...this.state.comentarios, ...com],
            page: page + 1,
            obtenerMas: com.length === 20,
            obteniendoMas: false
          });
        }
      }
    );
  }
  /**
   * Añade un comentario
   * @param {String} comment comentario
   * @param {Number} time momento de tiempo en el que se ha producido
   * @param {Number} id id del video
   */
  addComment(comment, time, id) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();
    this.commentApi.addComment(
      comment,
      Math.floor(time),
      id,
      (error, data, response) => {
        if (error) {
          //console.error(error);
        } else {
          ////console.log(data);
        }
      }
    );
  }
  /**
   * Obtiene la asignatura y universidad de un video
   * @param {Number} id id del video
   */
  obtenerAsignaturaUni(id) {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    };
    this.videoApi.getVideoSubject(id, opts, (error, data, response) => {
      if (error) {
        //console.error(error);
      } else {
        //console.log(data);
        this.setState({ asig: data });
        console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
        console.log(data);
        this.userApi.getSubjectsOfUser(
          this.state.idUsuario,
          opts,
          (error, data, response) => {
            if (error) {
              //console.log(error);
            } else {
              //console.log(data);
              const found = data._embedded.subjects.find(s => {
                return s.id === this.state.asig.id;
              });
              //Si no la ha encontrado -> No sigue la asignatura
              this.setState({
                seguida: found === undefined ? false : true
              });
            }
          }
        );
        this.subjectApi.getProfessorsFromSubject(
          this.state.asig.id,
          opts,
          (error, data, response) => {
            if (error) {
              console.error(error);
            } else {
              let prof = data._embedded.users.map(c => {
                t = c.secondsFromBeginning;
                const id = c.id;
                const name = c.name;
                const photo = c.photo;
                const surnames = c.surnames;

                return {
                  nombre: name,
                  foto: photo,
                  apellidos: surnames,
                  id: id
                };
              });
              this.setState({
                profesores: prof,
                loading: false
              });
              this.interval = setInterval(() => this.pasaSegundo(), 1000);
            }
          }
        );
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   *
   * @param {Number} date1 instante anterior
   * @param {Number} now instante actual
   * @return {String} Devuelve el tiempo pasado
   */
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
  /**
   * Callback invocado cada vez que pasa un segundo del video
   * Busca los comentarios con una marca de tiempo igual o inferior a ese instante para mostrarlos por pantalla
   */
  pasaSegundo() {
    this.setState({
      largo: Math.floor(this.VideoFlechaRef.devuelveDuracion() / 3600) > 0
    });
    let nuevo = this.VideoFlechaRef.devuelveEstado();
    nuevo = Math.floor(nuevo);
    //console.log("Nuevo");
    //console.log(nuevo);
    this.setState({ segundo: nuevo });
    let añadir = this.state.comentariosMostrar;
    let i = this.state.ultimoAñadido + 1;

    if (i < this.state.comentarios.length) {
      while (
        i < this.state.comentarios.length &&
        this.state.comentarios[i].tiempo <= nuevo
      ) {
        añadir = [...añadir, this.state.comentarios[i]];

        i = i + 1;
      }
    }
    //console.log(añadir);
    let ds = this.state.dataSource;
    this.setState({
      comentariosMostrar: añadir,
      ultimoAñadido: i - 1,
      dataSource: ds.cloneWithRows(añadir)
    });
  }
  /**
   * Funcion llamada al presionar el boton de comentar
   * añade el comentario al video
   */
  comentar = () => {
    let añadidos = this.state.comentariosMostrar;
    let ds = this.state.dataSource;
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
  /**
   * Renderiza el boton de comentar si el usuario ha introducido texto
   */
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
      <View
        style={{
          flex: 1,
          justifyContent: this.state.loading ? "center" : "flex-start"
        }}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS == "ios" ? 30 : 0}
          >
            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="never">
              <View style={styles.videoContainer}>
                <VideoConSinFlechaAtras
                  flechaSi={true}
                  goBackDestination={""}
                  navigation={this.props.navigation}
                  source={this.state.video.url}
                  duracion={this.state.video.seconds}
                  thumbnail={this.state.video.thumbnailUrl}
                  autoplay={true}
                  ref={ref => {
                    this.VideoFlechaRef = ref;
                  }}
                  videoId={this.props.navigation.getParam("id")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ height: 120 }}>
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
                  <RippleTouchable
                    onPress={() =>
                      this.props.navigation.navigate("Asignatura", {
                        title: this.state.asig.name,
                        id: this.state.asig.id
                      })
                    }
                    style={styles.asignaturaContainer}
                  >
                    <IconoAsignaturaUniversidad
                      style={{
                        alignSelf: "flex-start"
                      }}
                      navigation={this.props.navigation}
                      name={this.state.asig.abbreviation}
                      image={{
                        uri: this.state.asig.university.photo
                      }}
                    />
                  </RippleTouchable>
                  <View style={{ marginLeft: 60 }}>
                    <BotonSeguirAsignatura
                      onRef={ref => (this.botonSeguir = ref)}
                      asignaturaSeguida={this.state.seguida}
                      callback={() => this.seguir()}
                    />
                  </View>
                </View>
                <Descripcion
                  texto={this.state.video.description}
                  navigation={this.props.navigation}
                  profesores={this.state.profesores}
                  focus={this.state.focus}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ maxHeight: 260 }}>
                    <ListView
                      ref={ref => {
                        this.ListView_Ref = ref;
                      }}
                      onContentSizeChange={() =>
                        this.ListView_Ref.scrollToEnd({
                          animated: true
                        })
                      }
                      enableEmptySections={true}
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
              </View>
            </ScrollView>
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
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
