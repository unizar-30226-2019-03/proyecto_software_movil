import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Platform
} from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje";

import RippleTouchable from "../../components/RippleTouchable";

import UnicastNotifications from "../../config/UnicastNotifications";
import Auth from "../../config/Auth";
import { HeaderHeight } from "../../constants";
import UserApi from "swagger_unicast";
import {
  getMessagesToReceiver,
  getMessagesFromSender,
  addMessage
} from "../../config/MessageApi";

export default class Chat extends React.Component {
  constructor() {
    super();
    var datos = [];

    this.state = {
      loading: true,
      datos: datos,
      mensajes: [],
      text: "",
      receivedMessages: [],
      sentMessages: [],
      messages: [],
      mostrar: [],
      update: false,
      puedeHablar: false
    };
    this.getNewMessages = this.getNewMessages.bind(this);
    this.getAllFromSender = this.getAllFromSender.bind(this);
    this.getAllSent = this.getAllSent.bind(this);
    this.mergeMessages = this.mergeMessages.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
  }
  componentWillUnmount = () => {
    this.pararReloj();
  };
  componentWillMount = () => {
    let SwaggerUnicast = require("swagger_unicast");
    this.userApi = new SwaggerUnicast.UserApi();
    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: "0"
    };
    idUsuario = Auth.getUserId();
    idProfesor = this.props.navigation.getParam("id");

    if (Auth.isProfesor()) {
      aux = idUsuario;
      idUsuario = idProfesor;
      idProfesor = aux;
    }

    this.userApi.getSubjectsAsProfessor(
      idProfesor,
      opts,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({ profe: data });
          this.userApi.getSubjectsOfUser(
            idUsuario,
            opts,
            (error, data, response) => {
              if (error) {
                console.error(error);
              } else {
                asignaturasAlumno = data._embedded.subjects;
                asignaturasProfe = this.state.profe._embedded.subjects;
                encontrado = false;
                for (i = 0; i < asignaturasAlumno.length && !encontrado; i++) {
                  for (j = 0; j < asignaturasProfe.length && !encontrado; j++) {
                    encontrado =
                      asignaturasAlumno[i].id == asignaturasProfe[j].id;
                  }
                }

                if (encontrado && idProfesor != idUsuario) {
                  this._isMounted = true;
                  this.getAllFromSender(0, []);
                  this.getAllSent(0, []);
                  this.iniciarReloj();
                }
                this.setState({ loading: false, puedeHablar: encontrado });
              }
            }
          );
        }
      }
    );
  };
  containsObject(obj, list) {
    var x;
    for (x in list) {
      //Alert.alert(list[x].id.toString());
      if (list[x].id === obj.id) {
        return true;
      }
    }

    return false;
  }
  componentDidUpdate = () => {
    if (this.state.update) {
      this.mergeMessages();
    }
  };
  componentDidMount = () => {
    //lamar aqui a get data NUNCA EN EL CONSTRUCTOR
  };

  getAllFromSender(page, messages) {
    if (messages.length < 20 * page) {
      if (this._isMounted) {
        this.setState({
          receivedMessages: messages
        });
      }
    } else {
      getMessagesFromSender(
        parseInt(this.props.navigation.getParam("id")),
        page,
        dataReceived => {
          const received = dataReceived.map(el => {
            el.fromMe = false;
            return el;
          });
          const newData = [...messages, ...received];
          this.getAllFromSender(page + 1, newData);
        }
      );
    }
  }

  getAllSent(page, messages) {
    if (messages.length < 20 * page) {
      if (this._isMounted) {
        this.setState({
          sentMessages: messages,
          update: true
        });
      }
    } else {
      getMessagesToReceiver(
        parseInt(this.props.navigation.getParam("id")),
        page,
        dataSent => {
          const sent = dataSent.map(el => {
            el.fromMe = true;
            return el;
          });
          const newData = [...messages, ...sent];
          this.getAllSent(page + 1, newData);
        }
      );
    }
  }

  mergeMessages() {
    const sent = this.state.sentMessages.slice();
    const received = this.state.receivedMessages.slice();
    messages = this.mergeSortedArray(sent, received).reverse();
    //Alert.alert(messages.length.toString());

    //Alert.alert("Mensajes");
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(messages);
    n = messages.length;
    //Alert.alert(n.toString());
    this.setState({
      nMensajes: n,
      indice: n - 10,
      messages: messages
    });
    indice = n;
    let mess = messages.map(c => {
      t = c.secondsFromBeginning;

      const text = c.text;
      const fromMe = c.fromMe;
      const timestamp = c.timestamp;

      return {
        text: text,
        fromMe: fromMe,
        timestamp: timestamp
      };
    });
    aux = [];
    for (i = 1; i <= 9 && indice - i >= 1; i++) {
      aux = aux.concat(mess[indice - i]);
    }
    aux = aux.reverse();
    aux = this.state.mostrar.concat(aux);
    this.setState({ mostrar: aux });
    if (this._isMounted) {
      this.setState({
        update: false
      });
    }
  }
  carga10() {
    aux = [];

    indice = this.state.indice;
    todos = this.state.messages;

    for (i = 1; i <= 9 && indice - i >= 1; i++) {
      aux = aux.concat(todos[indice - i]);
    }
    aux = aux.reverse();
    aux = aux.concat(this.state.mostrar);
    this.setState({ mostrar: aux, indice: indice - 10 });
  }
  getNewMessages() {
    getMessagesFromSender(
      parseInt(this.props.navigation.getParam("id")),
      0,
      dataReceived => {
        let received = dataReceived.map(el => {
          el.fromMe = false;
          return el;
        });
        const newReceived = this.parseNewMessages(
          received,
          this.state.receivedMessages
        );
        if (
          this._isMounted &&
          newReceived.length !== this.state.receivedMessages.length
        ) {
          this.setState({
            receivedMessages: newReceived,
            update: true
          });
        }
        getMessagesToReceiver(
          parseInt(this.props.navigation.getParam("id")),
          0,
          dataSent => {
            const sent = dataSent.map(el => {
              el.fromMe = true;
              return el;
            });
            const newSent = this.parseNewMessages(
              sent,
              this.state.sentMessages
            );
            if (
              this._isMounted &&
              newSent.length !== this.state.sentMessages.length
            ) {
              this.setState({
                sentMessages: newSent,
                update: true
              });
              this.ListView_Ref.scrollToEnd({
                animated: true
              });
            }
          }
        );
      }
    );
  }

  sendHandler() {
    this.addMessage(this.state.text);
    this.setState({ text: "" });
  }

  addMessage(message) {
    // Append the message to the component state
    const receiver = parseInt(this.props.navigation.getParam("id"));
    addMessage(receiver, message, data => {
      if (data !== false) {
        data.fromMe = true;
        let newMessages = this.state.messages.slice();
        newMessages.push(data);
        this.setState({ messages: newMessages });
      }
    });
  }

  iniciarReloj() {
    this.timerID = setInterval(() => this.getNewMessages(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }
  /**
   * Mezcla los dos arrays de forma ordenada descendiente por timestamps
   * @param {Array} a Array ordenada por timestamps A
   * @param {Array} b Array ordenada por timestamps B
   */
  mergeSortedArray(a, b) {
    var tempArray = [];
    var ia = 0,
      ib = 0;
    while (ia < a.length || ib < b.length) {
      if (typeof a[ia] === "undefined") {
        tempArray.push(b[ib++]);
      } else if (typeof b[ib] === "undefined") {
        tempArray.push(a[ia++]);
      } else if (a[ia].timestamp < b[ib].timestamp) {
        tempArray.push(b[ib++]);
      } else {
        tempArray.push(a[ia++]);
      }
    }
    return tempArray;
  }

  /**
   * Añade los nuevos mensajes a los mensajes del chat
   * @param {Array} newMessages Nuevos mensajes recibidos
   * @param {Array} oldMessages Mensajes del chat
   * @returns {Array} Mensajes nuevos y antiguos
   */
  parseNewMessages(newMessages, oldMessages) {
    if (oldMessages.length === 0 && newMessages.length === 0) {
      return [];
    }
    if (oldMessages.length === 0 && newMessages.length > 0) {
      return newMessages;
    }
    if (newMessages[0].id === oldMessages[0].id) {
      return oldMessages;
    } else {
      let i = 0;
      var aux = [];
      while (newMessages[i].id !== oldMessages[0].id) {
        aux.push(newMessages[i]);
        i++;
      }
      return [...aux, ...oldMessages];
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <RippleTouchable
        onPress={() =>
          navigation.navigate("VerPerfil", {
            name: navigation.getParam("title"),
            userId: navigation.getParam("id")
          })
        }
        activeOpacity={0.6}
      >
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: navigation.getParam("photo")
            }}
            style={styles.userIcon}
          />
          <Text style={styles.userName}>{navigation.getParam("title")}</Text>
        </View>
      </RippleTouchable>
    )
  });

  boton = () => {
    if (this.state.text.length > 0) {
      return (
        <Text style={styles.enviar} onPress={() => this.sendHandler()}>
          Enviar
        </Text>
      );
    }
  };

  entradaTexto = () => {
    if (this.state.puedeHablar) {
      return (
        <View style={styles.entradaTexto}>
          <TextInput
            placeholder="Escribe un mensaje"
            onChangeText={texto => this.setState({ text: texto })}
            value={this.state.text}
            multiline={true}
            style={[styles.textInput, { maxHeight: 80 }]}
          />
          {this.boton()}
        </View>
      );
    }
  };
  aviso = () => {
    if (!this.state.puedeHablar) {
      return (
        <View style={styles.aviso}>
          <Text style={{ fontSize: 20 }}>
            Debes seguir una asignatura para poder hablar con sus profesores
          </Text>
        </View>
      );
    }
  };
  enviarMensaje = () => {
    if (this.state.text.length % 2 == 0) {
      tipo = "entrante";
    } else {
      tipo = "saliente";
    }

    var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var date = "" + hours + ":" + mins;

    nuevoDatos = [
      ...this.state.datos,
      {
        texto: this.state.text,
        tipo: tipo,
        fecha: date
      }
    ];
    this.setState({ datos: nuevoDatos });

    this.setState({ mensajes: nuevoDatos });
    this.setState({ text: "" });
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
            style={styles.vista}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS == "ios" ? 30 : HeaderHeight}
          >
            {this.aviso()}
            <FlatList
              refreshing={this.state.loading}
              style={styles.lista}
              keyboardShouldPersistTaps="never"
              ref={ref => {
                this.ListView_Ref = ref;
              }}
              data={this.state.mostrar}
              renderItem={({ item }) => (
                <Mensaje
                  esMio={item.fromMe}
                  mensaje={item.text}
                  fecha={item.timestamp.toISOString()}
                />
              )}
              onRefresh={() => {
                this.carga10();
              }}
            />
            {this.entradaTexto()}
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
