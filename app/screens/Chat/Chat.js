import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Mensaje from "../../components/Mensaje";

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
      dataSource: ds.cloneWithRows(datos)
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VerPerfil", { title: "Perfil de Pedro" })
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

  render() {
    return (
      <View style={styles.vista}>
        <KeyboardAvoidingView
          style={styles.vista}
          behavior="padding"
          enabled
          keyboardVerticalOffset={height * 0.13}
        >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Mensaje tipo={rowData.tipo} mensaje={rowData.texto} />
            )}
          />
          <TextInput style={styles.entradaTexto} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
