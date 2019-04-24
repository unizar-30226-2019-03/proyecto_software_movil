import React from "react";

import { View, Text, TouchableHighlight, Modal } from "react-native";
import { Rating, Icon } from "react-native-elements";
import styles from "./styles";

export default class CuadroValorar extends React.Component {
  constructor() {
    super();
    this.state = {
      mostrar: true
    };
  }
  quitarPopUp() {
    this.setState({ mostrar: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.valorar}>
          <View style={styles.titulo}>
            <Text style={{ flex: 0.8, fontSize: 20 }}>
              Proyecto Software clase 2
            </Text>
            <Text style={styles.valoracion}> 98%</Text>
          </View>
        </View>
        <View style={styles.dejarSeguir}>
          <Text>HOLA</Text>
        </View>
        <Modal
          visible={this.state.mostrar}
          transparent={true}
          onRequestClose={() => null}
        >
          <View style={styles.popUp}>
            <View style={styles.apartados}>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Apartado 1</Text>
                <Rating
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={3}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Apartado 2</Text>
                <Rating
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={3}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Apartado 3</Text>
                <Rating
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={3}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Apartado 4</Text>
                <Rating
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={3}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Apartado 5</Text>
                <Rating
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={3}
                />
              </View>
              <TouchableHighlight onPress={() => this.quitarPopUp()}>
                <Text style={styles.valorarTexto}>Valorar</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.quitarPopUp()}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
