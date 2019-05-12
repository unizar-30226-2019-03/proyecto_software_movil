import React from "react";
import { Text, View, TouchableOpacity, Image, ListView, TextInput, KeyboardAvoidingView } from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje";

import Auth from "../../config/Auth"; // QUITAR CUANDO SE INTEGRE ESTA PANTALLA

import { HeaderHeight } from "../../constants";

export default class Chat extends React.Component {
  constructor() {
    super();
    var datos = [
      { texto: "PEEEEEEZ", tipo: "entrante", fecha: "22/02/1998 18:50" },
      { texto: "PEEEEEEEEEEEEZ", tipo: "saliente", fecha: "22/02/1998 18:52" },
      {
        texto: "PEEEEEEEEEEEEEEEEEEZ",
        tipo: "entrante",
        fecha: "22/02/1998 9:50"
      },
      {
        texto: "PEEEEEEEEEEEEEEEEEEEEEEZ",
        tipo: "saliente",
        fecha: "ayer 18:50"
      },
      {
        texto: "PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEZ",
        tipo: "entrante",
        fecha: "18:50"
      },
      {
        texto: "PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEZ",
        tipo: "saliente",
        fecha: "22:30"
      }
    ];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      datos: datos,
      dataSource: ds.cloneWithRows(datos),
      text: ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VerPerfil", {
            name: "Pedro",
            userId: Auth.getUserId() // Cambiar cuando se integre esta pantalla
          })
        }
        activeOpacity={0.6}
      >
        <View style={styles.headerContainer}>
          <Image source={require("../../../test/imagenes/perfil.jpg")} style={styles.userIcon} />
          <Text style={styles.userName}>{navigation.getParam("title")}</Text>
        </View>
      </TouchableOpacity>
    )
  });

  boton = () => {
    if (this.state.text.length > 0) {
      return (
        <Text style={styles.enviar} onPress={() => this.enviarMensaje()}>
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

    nuevoDatos = [...this.state.datos, { texto: this.state.text, tipo: tipo, fecha: date }];
    this.setState({ datos: nuevoDatos });
    nuevoDs = this.state.dataSource.cloneWithRows(nuevoDatos);
    this.setState({ dataSource: nuevoDs });
    this.setState({ text: "" });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.vista} behavior="padding" keyboardVerticalOffset={HeaderHeight}>
        <ListView
          style={styles.lista}
          keyboardShouldPersistTaps="never"
          ref={ref => {
            this.ListView_Ref = ref;
          }}
          dataSource={this.state.dataSource}
          renderRow={rowData => <Mensaje tipo={rowData.tipo} mensaje={rowData.texto} fecha={rowData.fecha} />}
          onContentSizeChange={() => this.ListView_Ref.scrollToEnd({ animated: true })}
        />
        <View style={styles.entradaTexto}>
          <TextInput
            placeholder="Escribe un mensaje"
            onChangeText={text => this.setState({ text })}
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
