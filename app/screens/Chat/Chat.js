import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje";

import UnicastNotifications from "../../config/UnicastNotifications";

import { HeaderHeight } from "../../constants";

import {
  getMessagesToReceiver,
  getMessagesFromSender,
  addMessage
} from "../../config/MessageApi";

export default class Chat extends React.Component {
  constructor() {
    super();
    var datos = [];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      datos: datos,
      dataSource: ds.cloneWithRows(datos),
      text: "",
      receivedMessages: [],
      sentMessages: [],
      messages: [],
      update: false
    };
    this.getNewMessages = this.getNewMessages.bind(this);
    this.getAllFromSender = this.getAllFromSender.bind(this);
    this.getAllSent = this.getAllSent.bind(this);
    this.mergeMessages = this.mergeMessages.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
  }

  componentWillMount = () => {
    this.getAllFromSender(0, []);
    this.getAllSent(0, []);
    this.iniciarReloj();
  };
  componentDidUpdate = () => {
    if (this.state.update) {
      this.mergeMessages();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      console.log("Mensajes", this.state.messages);
      ds.cloneWithRows(this.state.mesagges);
      this.setState({ dataSource: ds });
    }
  };
  componentDidMount = () => {
    //lamar aqui a get data NUNCA EN EL CONSTRUCTOR
    UnicastNotifications.fireSingleton();
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
    const messages = this.mergeSortedArray(sent, received).reverse();
    if (this._isMounted) {
      this.setState({
        messages: messages,
        update: false
      });
    }
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
            }
          }
        );
      }
    );
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  sendHandler(message) {
    this.addMessage(message);
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
      <TouchableOpacity
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
      </TouchableOpacity>
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
    nuevoDs = this.state.dataSource.cloneWithRows(nuevoDatos);
    this.setState({ dataSource: nuevoDs });
    this.setState({ text: "" });
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.vista}
        behavior="padding"
        keyboardVerticalOffset={HeaderHeight}
      >
        <ListView
          style={styles.lista}
          keyboardShouldPersistTaps="never"
          ref={ref => {
            this.ListView_Ref = ref;
          }}
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <Mensaje
              esMio={rowData.fromMe}
              mensaje={rowData.text}
              fecha={rowData.timestamp}
            />
          )}
          onContentSizeChange={() =>
            this.ListView_Ref.scrollToEnd({
              animated: true
            })
          }
        />
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
      </KeyboardAvoidingView>
    );
  }
}
