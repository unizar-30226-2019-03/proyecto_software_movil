import React from "react";

import { View, Text, TouchableHighlight, Modal } from "react-native";
import { Rating, Icon } from "react-native-elements";
import styles from "./styles";
import { ScreenWidth, GrisClaro } from "../../constants/constants";

export default class CuadroValorar extends React.Component {
  constructor() {
    super();
    this.state = {
      mostrar: false,
      guardado: false
    };
  }
  quitarPopUp() {
    this.setState({ mostrar: false });
  }
  cambiarIcono() {
    if (this.state.guardado == true) {
      this.setState({ guardado: false });
    } else {
      this.setState({ guardado: true });
    }
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
          <Text style={styles.fecha}> Subido hace 2 meses</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableHighlight
              onPress={() => this.setState({ mostrar: true })}
              style={styles.botonValorar}
            >
              <Text style={{ fontSize: 18 }}> Valorar vídeo</Text>
            </TouchableHighlight>
            <Icon
              name={[this.state.guardado == true ? "bookmark" : "bookmark-o"]}
              type="font-awesome"
              size={35}
              iconStyle={{ marginLeft: 100 }}
              onPress={() => this.cambiarIcono()}
              color={GrisClaro}
            />
            <Icon
              name="share-alt"
              type="font-awesome"
              size={35}
              iconStyle={{ marginLeft: 20 }}
              onPress={() => null}
              color={GrisClaro}
            />
          </View>
        </View>

        <Modal
          visible={this.state.mostrar}
          transparent={true}
          onRequestClose={() => null}
        >
          <View style={styles.popUp}>
            <View style={styles.apartados}>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Claridad</Text>
                <Rating
                  imageSize={ScreenWidth * 0.12}
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={5}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Calidad</Text>
                <Rating
                  imageSize={ScreenWidth * 0.12}
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={5}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Adecuación</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={ScreenWidth * 0.12}
                />
              </View>
              <View style={styles.apartado}>
                <Text style={styles.textoApartado}>Amenidad</Text>
                <Rating
                  imageSize={ScreenWidth * 0.12}
                  style={styles.RatingApartado}
                  type="star"
                  ratingCount={5}
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
