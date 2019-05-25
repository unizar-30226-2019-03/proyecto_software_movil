import React from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ListView
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { ScreenWidth, GrisClaro } from "../../constants/constants";

export default class Descripcion extends React.Component {
  constructor() {
    super();

    this.setState({ desplegado: false });
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    vacio = [];
    this.setState({ dataSource: ds.cloneWithRows(vacio) });
  }

  componentWillReceiveProps(props) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log(props);
    if (props.profesores) {
      this.setState({ dataSource: ds.cloneWithRows(props.profesores) });
    }
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
  profesor = profesor => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Chat", {
            title: profesor.nombre,
            photo: profesor.foto,
            id: profesor.id
          })
        }
      >
        <View style={styles.iconAndNameView}>
          <Image
            source={{ uri: profesor.foto }}
            style={styles.userIcon}
            margin={20}
          />
          <Text style={styles.userName}>
            {profesor.nombre + " " + profesor.apellidos}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  icono() {
    if (this.state.desplegado) {
      return (
        <Icon
          name={"keyboard-arrow-up"}
          type="MaterialIcons"
          iconStyle={styles.IconoDescripcion}
          size={35}
          onPress={() => this.alternarDescripcion()}
          color={GrisClaro}
        />
      );
    } else {
      return (
        <Icon
          name={"keyboard-arrow-down"}
          type="MaterialIcons"
          iconStyle={styles.IconoDescripcion}
          size={35}
          onPress={() => this.alternarDescripcion()}
          color={GrisClaro}
        />
      );
    }
  }
  render() {
    return (
      <View>
        <View style={styles.tituloBoton}>
          <Text style={styles.DescripcionTitulo}>Descripción</Text>
          {this.icono()}
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

            <ListView
              style={styles.profesores}
              horizontal={true}
              ref={ref => {
                this._listaProfesores = ref;
              }}
              dataSource={this.state.dataSource}
              renderRow={rowData => this.profesor(rowData)}
            />
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
