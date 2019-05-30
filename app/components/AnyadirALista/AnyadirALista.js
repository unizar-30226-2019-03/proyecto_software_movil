/**
 * @fileoverview Cuadro que aparece para añadir un video a una lista
 *
 * @author Unicast
 *
 * @requires swagger_unicast:ReproductionListApi
 * @requires swagger_unicast:ApiClient
 * @requires ../../config/Auth:Auth
 * @requires ../../components/AnyadirALista:AnyadirAlista
 * @requires ../../components/RippleTouchable:RippleTouchable
 * @requires ../../components/LoadingModal:LoadingModal
 */

import React from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator
} from "react-native";

import { Input, CheckBox } from "react-native-elements";

import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Azul } from "../../constants";

import { ReproductionListApi, ApiClient } from "swagger_unicast";

import Auth from "../../config/Auth";

import { Divider } from "react-native-elements";

import AnyadirLista from "../../components/AnyadirLista";
import RippleTouchable from "../../components/RippleTouchable";
import LoadingModal from "../../components/LoadingModal";

import styles from "./styles";
/**
 * Renderiza el modal que permite añadir un video a una
 * lista de reproducción.
 * También permite crear una nueva lista de reproducción
 *
 * @extends React.Component
 *
 */
export default class AnyadirALista extends React.Component {
  /**
   *
   * @param {Object} props Propiedades para inicializar el componente
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataChanging: [],
      loading: false,
      addingVideoToNewList: false,
      nuevaListaModalVisible: false
    };

    this.listsVideoIn = [];

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.apiInstance = new ReproductionListApi();
  }

  onHide = () => {
    this.setState({
      nuevaListaModalVisible: false,
      loading: true
    });
    this.props.hide();
  };

  onShow = () => {
    this.listsVideoIn = [];
    this.setState({
      loading: true,
      data: [],
      dataChanging: []
    });
    this.getDataFull();
  };
  /**
   * Añade o quita un video de una lista de reproducción
   * @param {Number} idx Indice de la lista de reproducción
   *
   */
  changeCheckBox = idx => {
    if (!this.state.dataChanging[idx]) {
      let tempDataChanging = [...this.state.dataChanging];
      tempDataChanging[idx] = true;
      this.setState({
        dataChanging: tempDataChanging
      });

      let reproListId = this.state.data[idx].lista.id;
      let videoId = this.props.videoId;
      if (!this.state.data[idx].check) {
        this.apiInstance.addVideotoReproductionList(
          reproListId,
          videoId,
          (error, data, response) => {
            console.log("DAWDAWDAWDAWDAWD");
            console.log(data);
            console.log(error);
            let tempData = [...this.state.data];
            if (!error) {
              console.log("SIIIII");
              tempData[idx].check = true;
            }
            tempDataChanging = [...this.state.dataChanging];
            tempDataChanging[idx] = false;
            this.setState({
              data: [...tempData],
              dataChanging: [...tempDataChanging]
            });
          }
        );
      } else {
        this.apiInstance.deleteVideoFromReproductionList(
          reproListId,
          videoId,
          (error, data, response) => {
            let tempData = [...this.state.data];
            console.log(data);
            console.log(error);
            if (!error) {
              tempData[idx].check = false;
            }
            tempDataChanging = [...this.state.dataChanging];
            tempDataChanging[idx] = false;
            this.setState({
              data: [...tempData],
              dataChanging: [...tempDataChanging]
            });
          }
        );
      }
    }
  };
  /**
   * Obtiene las listas de reproducción en las que está un vídeo
   * y llama a la función para obtener las listas de reproducción
   * de un usuario
   */
  getDataFull = () => {
    let videoId = this.props.videoId;
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.apiInstance.getReproductionListVideoIn(
      videoId,
      opts,
      (error, data, response) => {
        if (error) {
          if (error.status == 403) {
            Auth.signOut(this.props.navigation);
          } else {
            HaOcurridoUnError(this.onHide);
          }
        } else {
          this.listsVideoIn = data._embedded.reproductionLists;
          this.getData();
        }
      }
    );
  };
  /**
   * Obtiene las listas de reproducción de un usuario
   *
   */
  getData = () => {
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0,
      page: this.offset
    };
    this.apiInstance.getUserReproductionLists(opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.onHide);
        }
      } else {
        let tempDataChanging = data._embedded.reproductionLists.map(lista => {
          return false;
        });

        let tempData = data._embedded.reproductionLists.map(lista => {
          let listaVideo = this.listsVideoIn.find(lv => lv.id === lista.id);
          return listaVideo ? { lista, check: true } : { lista, check: false };
        });
        this.setState({
          loading: false,
          data: [...this.state.data, ...tempData],
          dataChanging: [...this.state.dataChanging, ...tempDataChanging]
        });

        console.log(this.state.data);
      }
    });
  };

  /**
   * Oculta el modal para crear una nueva lista
   */
  hideAnyadirLista = () => {
    this.setState({
      nuevaListaModalVisible: false
    });
  };
  /**
   * Muestra el modal para crear una nueva lista
   */
  hideAnyadirAListaShowNuevaLista = () => {
    this.onHide();
    this.setState({
      nuevaListaModalVisible: true
    });
  };

  /**
   * Rutina llamada al añadir una nueva lista de reproducción.
   * Añade un video a dicha lista
   * @param {Number} id_lista id de la nueva lista de reproducción
   */
  onListaAdded = id_lista => {
    if (id_lista) {
      this.setState({
        addingVideoToNewList: true
      });
      let videoId = this.props.videoId;
      this.apiInstance.addVideotoReproductionList(
        id_lista,
        videoId,
        (error, data, response) => {
          if (error) {
            if (error.status == 403) {
              Auth.signOut(this.props.navigation);
            } else {
              HaOcurridoUnError(null);
            }
          }
          this.setState({
            addingVideoToNewList: false
          });
        }
      );
    }
  };

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.onHide}
          onBackdropPress={this.onHide}
          onShow={this.onShow}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.container}
            onPress={this.onHide}
            activeOpacity={1}
          >
            <TouchableWithoutFeedback>
              <View style={styles.anyadirAListaContainer}>
                <View style={styles.guardarYNuevaListaContainer}>
                  <Text style={styles.texto}>Guardar vídeo en...</Text>
                  <RippleTouchable
                    onPress={() => this.hideAnyadirAListaShowNuevaLista()}
                    style={styles.nuevaListaContainer}
                  >
                    <Text style={styles.nuevaListaTexto}>+NUEVA LISTA</Text>
                  </RippleTouchable>
                </View>
                <Divider style={styles.divider} />
                {this.state.loading ? (
                  <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                      <RippleTouchable
                        onPress={() => this.changeCheckBox(index)}
                        style={styles.checkBoxView}
                      >
                        <CheckBox
                          Component={View}
                          checked={item.check}
                          title={item.lista.name}
                          checkedIcon="check-square"
                          uncheckedIcon="square-o"
                          containerStyle={styles.checkBoxContainer}
                          textStyle={styles.texto}
                        />
                      </RippleTouchable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
                <Divider style={styles.divider} />
                <RippleTouchable
                  onPress={() => this.onHide()}
                  disabled={this.state.loading}
                  style={styles.listoContainer}
                >
                  <FontAwesomeIcons name={"check"} style={styles.texto} />
                  <Text style={styles.listoTexto}>Listo</Text>
                </RippleTouchable>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <AnyadirLista
          visible={this.state.nuevaListaModalVisible}
          hide={this.hideAnyadirLista}
          videoId={this.props.videoId}
          onListaAdded={this.onListaAdded}
        />
        <LoadingModal visible={this.state.addingVideoToNewList} />
      </View>
    );
  }
}
