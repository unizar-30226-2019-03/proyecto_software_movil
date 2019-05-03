import React from "react";

import { View, Text } from "react-native";
import styles from "./styles";

export default class Comentario extends React.Component {
  generarColor(nombreUsuario) {
    var hash = 0;
    if (nombreUsuario.length === 0) return hash;
    for (let i = 0; i < nombreUsuario.length; i++) {
      hash = this.props.nombreUsuario.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    var color = "#";
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }

  generarTextoTiempo(tiempo, largo) {
    var hora = Math.floor(tiempo / 3600);
    var minuto = Math.floor((tiempo - hora * 3600) / 60);
    var segundo = Math.floor((tiempo - hora * 3600 - minuto * 60) % 60);
    var texto = "";
    if (largo == true) {
      texto = hora.toString();
      if (texto.length == 1) {
        texto = "0" + texto;
      }
      texto += ":";
    }
    var minutoS = minuto.toString();
    var segundoS = segundo.toString();
    if (minutoS.length == 1) {
      minutoS = "0" + minutoS;
    }
    if (segundoS.length == 1) {
      segundoS = "0" + segundoS;
    }
    texto += minutoS;
    texto += ":";
    texto += segundoS;
    return texto;
  }
  render() {
    return (
      <View style={styles.todoElTexto}>
        <Text style={styles.tiempo}>
          {this.generarTextoTiempo(this.props.tiempo, this.props.largo)}
        </Text>
        <View
          style={{
            marginRight: 5,
            flexDirecion: "row",
            flexWrap: "wrap",
            width: 300
          }}
        >
          <Text
            style={[
              { color: this.generarColor(this.props.nombreUsuario) },
              styles.nombreUsuario
            ]}
          >
            {this.props.nombreUsuario + ": "}
            <Text style={styles.cuerpoComentario}>
              {this.props.cuerpoComentario}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
