import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje";

import { headerHeight } from "../../constants";

export default class Chat extends React.Component {
  constructor() {
    super();
    var datos = [
      { texto: "PEEEEEEZ", tipo: "entrante" },
      { texto: "PEEEEEEEEEEEEZ", tipo: "saliente" },
      { texto: "PEEEEEEEEEEEEEEEEEEZ", tipo: "entrante" },
      { texto: "PEEEEEEEEEEEEEEEEEEEEEEZ", tipo: "saliente" },
      { texto: "PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEZ", tipo: "entrante" },
      {
        texto: "PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEZ",
        tipo: "saliente"
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
          navigation.navigate("VerPerfil", { title: "Perfil de Pedro", perfilPropioSi: false })
        }
        activeOpacity={0.6}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../../../test/imagenes/perfil.jpg")}
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

    nuevoDatos = [...this.state.datos, { texto: this.state.text, tipo: tipo }];
    this.setState({ datos: nuevoDatos });
    nuevoDs = this.state.dataSource.cloneWithRows(nuevoDatos);
    this.setState({ dataSource: nuevoDs });
    this.setState({ text: "" });
  };
  render() {
    return (
      <View style={styles.vista}>
        <KeyboardAvoidingView
          style={styles.vista}
          behavior="padding"
          enabled
          keyboardVerticalOffset={headerHeight}
        >
          <ListView
            style={styles.lista}
            keyboardShouldPersistTaps="never"
            ref={ref => {
              this.ListView_Ref = ref;
            }}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Mensaje tipo={rowData.tipo} mensaje={rowData.texto} />
            )}
            onContentSizeChange={() =>
              this.ListView_Ref.scrollToEnd({ animated: true })
            }
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
      </View>
    );
  }
}
