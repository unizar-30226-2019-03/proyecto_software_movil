import React from "react";
import { Text, View, Animated, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { ScreenWidth, GrisClaro } from "../../constants/constants";

export default class Descripcion extends React.Component {
  constructor() {
    super();
    this.state = {
      desplegado: false
    };
  }
  _animatedHeight = new Animated.Value(0);
  _animatedOpacity = new Animated.Value(0);
  alternarDescripcion = () => {
    this._listaProfesores.scrollTo({ x: 0, y: 0, animated: true });
    this._listaDescripcion.scrollTo({ x: 0, y: 0, animated: true });

    if (this.state.desplegado == false) {
      Animated.timing(this._animatedHeight, { toValue: 150 }).start();
      Animated.timing(this._animatedOpacity, { toValue: 1 }).start();
      this.setState({ desplegado: true });
    } else {
      Animated.timing(this._animatedHeight, { toValue: 0 }).start();
      Animated.timing(this._animatedOpacity, { toValue: 0 }).start();
      this.setState({ desplegado: false });
    }
  };
  render() {
    return (
      <View>
        <View style={styles.tituloBoton}>
          <Text style={styles.DescripcionTitulo}>Descripción</Text>

          <Icon
            name={[
              this.state.desplegado == false
                ? "keyboard-arrow-down"
                : "keyboard-arrow-up"
            ]}
            type="MaterialIcons"
            iconStyle={styles.IconoDescripcion}
            size={35}
            onPress={() => this.alternarDescripcion()}
            color={GrisClaro}
          />
        </View>
        <Animated.View
          style={[
            this.state.desplegado == false
              ? {
                  height: this._animatedHeight,
                  padding: 5,
                  borderWidth: 0,
                  opacity: this._animatedOpacity
                }
              : {
                  height: this._animatedHeight,
                  padding: 5,
                  borderBottomWidth: 1,
                  opacity: this._animatedOpacity
                }
          ]}
        >
          <ScrollView
            ref={ref => {
              this._listaDescripcion = ref;
            }}
          >
            <View>
              <Text style={styles.cuerpoDescripcion}>{this.props.texto}</Text>
            </View>
            <Text style={styles.profesoresTitulo}>
              Profesores de la asignatura
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <ScrollView
                style={styles.profesores}
                horizontal={true}
                ref={ref => {
                  this._listaProfesores = ref;
                }}
              >
                <View style={styles.iconAndNameView}>
                  <Image
                    source={require("../../../test/imagenes/perfil.jpg")}
                    style={styles.userIcon}
                    margin={20}
                  />
                  <Text style={styles.userName}>Recesvinto W.</Text>
                </View>
                <View style={styles.iconAndNameView}>
                  <Image
                    source={require("../../../test/imagenes/perfil.jpg")}
                    style={styles.userIcon}
                    margin={20}
                  />
                  <Text style={styles.userName}>Recesvinto W.</Text>
                </View>
                <View style={styles.iconAndNameView}>
                  <Image
                    source={require("../../../test/imagenes/perfil.jpg")}
                    style={styles.userIcon}
                    margin={20}
                  />
                  <Text style={styles.userName}>Recesvinto W.</Text>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
