import React from "react";
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, ActivityIndicator } from "react-native";

import { Input } from "react-native-elements";

import { Azul } from "../../constants";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import LoadingFooter from "../../components/LoadingFooter";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";
import HaOcurridoUnError from "../../components/HaOcurridoUnError";

import styles from "./styles";

export default class AnyadirLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevaListaInput: "",
      showInputError: false,
      addingLista: false
    };

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new ReproductionListApi();
  }

  crearLista = () => {
    if (!this.state.addingLista) {
      this.setState({ addingLista: true });
      let name = this.state.nuevaListaInput;
      this.apiInstance.addReproductionList(name, (error, data, response) => {
        this.setState({ addingLista: false });
        if (error) {
          if (error.status == 403) {
            this.props.hide();
            Auth.signOut(this.props.navigation);
          } else if (error.status == 500 || error.status == 400 || error.status == 409) {
            this.setState({ showInputError: true });
          } else {
            this.props.hide();
            HaOcurridoUnError(null);
          }
        } else {
          this.props.hide();
          if (this.props.onListaAdded) {
            this.props.onListaAdded(data ? data.id : null);
          }
        }
      });
    }
  };

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.hide}
          onBackdropPress={this.props.hide}
        >
          <TouchableOpacity style={styles.container} onPress={this.props.hide} activeOpacity={1}>
            <TouchableWithoutFeedback>
              <View style={styles.anyadirListaContainer}>
                <View style={styles.row}>
                  <Text style={styles.nuevaListaModalTexto}>Nueva lista</Text>
                  {this.state.addingLista ? (
                    <View style={styles.activityIndicator}>
                      <ActivityIndicator size="small" />
                    </View>
                  ) : null}
                </View>
                <View style={styles.nuevaListaInputContainer}>
                  <Input
                    placeholder="Nombre"
                    autoFocus
                    onChangeText={nuevaListaInput =>
                      this.setState({ nuevaListaInput: nuevaListaInput, showInputError: false })
                    }
                    errorStyle={{ color: "red" }}
                    errorMessage={this.state.showInputError ? "Ya existe una lista con este nombre" : null}
                  />
                </View>
                <View style={styles.crearCancelarContainer}>
                  <RippleTouchable
                    onPress={() => this.setState({ showInputError: false }) || this.props.hide()}
                    style={styles.cancelar}
                    activeOpacity={1}
                  >
                    <Text style={styles.nuevaListaTexto}>CANCELAR</Text>
                  </RippleTouchable>
                  <RippleTouchable
                    onPress={() => this.crearLista()}
                    disabled={!(this.state.nuevaListaInput.length > 0)}
                    activeOpacity={1}
                  >
                    <Text
                      style={[
                        styles.nuevaListaTexto,
                        {
                          color: this.state.nuevaListaInput.length > 0 ? Azul : "gray"
                        }
                      ]}
                    >
                      CREAR
                    </Text>
                  </RippleTouchable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
