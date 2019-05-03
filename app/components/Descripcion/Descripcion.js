import React from "react";
import { Text, View, Animated } from "react-native";
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
  alternarDescripcion = () => {
    if (this.state.desplegado == false) {
      Animated.timing(this._animatedHeight, { toValue: 150 }).start();
      this.setState({ desplegado: true });
    } else {
      Animated.timing(this._animatedHeight, { toValue: 0 }).start();
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
        <Animated.ScrollView
          style={[
            this.state.desplegado == false
              ? {
                  height: this._animatedHeight,
                  padding: 5,
                  borderWidth: 0
                }
              : { height: this._animatedHeight, padding: 5, borderWidth: 1 }
          ]}
        >
          <View>
            <Text style={styles.cuerpoDescripcion}>
              Esto es la descripción de un vídeo en el que se explica como
              escribir una descripción para un vídeo, lo primero obviamente será
              grabar un vídeo que se pueda describir; no me seas tolai y me
              hagas un vídeo friendo un huevo porque ahí poco se puede
              describir, torpe, que es que eres torpe.
            </Text>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
