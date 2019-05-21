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
      comentarios: vacio,
      comentariosMostrar: vacio,
      seguida: false,

      dataSource: ds,
      largo: false,
      ultimoAñadido: -1,
      text: "",
      nombreUsuario: "Juan Asensio",
      video: aux,
      asig: {
        abbreviation: "dummy",
        university: { photo2: require("../../../test/imagenes/perfil_uni.jpg") }
      },
      photo: require("../../../test/imagenes/perfil_uni.jpg"),
      idUsuario: Auth.getUserId()
    };

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
          this.setState({ nombreUsuario: data.username });
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
        //// //console.log(data);
      } else {
        const now = ApiClient.parseDate(response.headers.date);
        this.setState({
          video: data,
          timeNow: now
        });
        // Alert.alert(this.state.video.url);

        this.obtenerComentarios(data);
      }
    });
  }
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
              this.setState({ seguida: found === undefined ? false : true });
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

                const name = c.name;
                const photo = c.photo;
                const surnames = c.surnames;

                return {
                  nombre: name,
                  foto: photo,
                  apellidos: surnames
                };
              });
              this.setState({ profesores: prof });
            }
          }
        );
      }
    });
  }

  componentWillMount() {
    id = this.props.navigation.getParam("id");
    this.obtenerAsignaturaUni(id);
  }
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
    let nuevo = this.VideoFlechaRef.devuelveEstado();
    nuevo = Math.floor(nuevo);
    console.log("Nuevo");
    console.log(nuevo);
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
        keyboardVerticalOffset={HeaderHeight - 50}
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
            videoId={this.state.video.id}
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
                name={this.state.asig.abbreviation}
                image={this.state.asig.photo}
              />
            </TouchableOpacity>
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
