import React from "react";
import { Text, View, Picker, ActivityIndicator, Alert } from "react-native";

import { ImagePicker } from "expo";

import { Button, Input, Image } from "react-native-elements";

import { VideoApi, UserApi, ApiClient } from "swagger_unicast";

import Auth from "../../../config/Auth";

import UnicastNotifications from "../../../config/UnicastNotifications";

import VideoConSinFlechaAtras from "../../../components/VideoConSinFlechaAtras";
import InputFixer from "../../../components/InputFixer";
import LoadingModal from "../../../components/LoadingModal";
import HaOcurridoUnError from "../../../components/HaOcurridoUnError";

import styles from "./styles";

// const { State: TextInputState } = TextInput;

export default class SubirVideo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Subir vídeo"
  });

  constructor(props) {
    super(props);

    this.state = {
      asignatura: undefined,
      pickerData: [],
      video: undefined,
      thumbnail: "nula",
      titulo: "",
      descripción: "",
      noThumbnailErr: false,
      tituloErr: false,
      noVideoErr: false,
      noAsignaturaErr: false,
      loading: true,
      subiendoVideo: false
    };

    this.tituloErrText = "";

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = Auth.getUserToken();

    this.userApiInstance = new UserApi();
    this.videoApiInstance = new VideoApi();
  }

  componentDidMount = () => {
    this.getAsignaturas();
  };

  getAsignaturas = () => {
    let id = Auth.getUserId();
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.userApiInstance.getSubjectsAsProfessor(id, opts, (error, data, response) => {
      if (error) {
        if (error.status == 403) {
          Auth.signOut(this.props.navigation);
        } else {
          HaOcurridoUnError(this.getAsignaturas);
        }
      } else {
        this.setState({
          pickerData: [...this.state.pickerData, ...data._embedded.subjects],
          loading: false
        });

        if (this.state.pickerData && this.state.pickerData.length > 0) {
          this.setState({
            asignatura: data._embedded.subjects[0].id
          });
        }
      }
    });
  };

  pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Videos",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ video: result.uri, noVideoErr: false });
    }
  };

  pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ thumbnail: result.uri, noThumbnailErr: false });
    }
  };

  tryUpload = async () => {
    let someError = false;
    if (!this.state.video) {
      this.setState({ noVideoErr: true });
      someError = true;
    }
    if (this.state.titulo == "") {
      this.tituloErrText = "El título del vídeo no puede ser vacío";
      this.setState({ tituloErr: true });
      someError = true;
    }
    if (this.state.thumbnail == "nula") {
      this.setState({ noThumbnailErr: true });
      someError = true;
    }
    if (!this.state.asignatura) {
      this.setState({ noAsignaturaErr: true });
      someError = true;
    }

    if (!someError) {
      if (!this.state.subiendoVideo) {
        this.setState({
          subiendoVideo: true
        });

        const file = {
          uri: this.state.video,
          name: this.state.video.substring(this.state.video.lastIndexOf("/") + 1, this.state.video.length),
          type: "video/mp4"
        };
        const thumbnail = {
          uri: this.state.thumbnail,
          name: this.state.thumbnail.substring(this.state.thumbnail.lastIndexOf("/") + 1, this.state.thumbnail.length),
          type: "imagen/png"
        };
        let title = this.state.titulo;
        let description = this.state.descripción;
        let subjectId = this.state.asignatura;
        this.videoApiInstance.addVideo(file, thumbnail, title, description, subjectId, (error, data, response) => {
          this.setState({ subiendoVideo: false });
          if (error) {
            if (error.status == 403) {
              Auth.signOut(this.props.navigation);
            } else if (error.status == 500 || error.status == 400 || error.status == 409) {
              this.tituloErrText = "Ya existe un vídeo con este título";
              this.setState({ tituloErr: true });
            } else {
              HaOcurridoUnError(null);
            }
          } else {
            Alert.alert(
              "¡Bien!",
              "El vídeo ha sido subido con éxito",
              [
                {
                  text: "Vale",
                  onPress: () => this.props.navigation.goBack()
                }
              ],
              { cancelable: false }
            );
          }
        });
      }
    }
  };

  render() {
    let pickerItems = this.state.pickerData.map((s, i) => {
      return <Picker.Item key={i} value={s.id} label={s.name} />;
    });

    return (
      <View style={[styles.container, { justifyContent: this.state.loading ? "center" : "flex-start" }]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <InputFixer navigation={this.props.navigation} ref={InputFixer => (this.InputFixer = InputFixer)}>
            <View style={[styles.viewSelectVideo, { borderColor: this.state.noVideoErr ? "red" : "grey" }]}>
              {!this.state.video ? (
                <Button buttonStyle={styles.selectVideoButton} title="ELEGIR VÍDEO" onPress={this.pickVideo} />
              ) : (
                <VideoConSinFlechaAtras
                  flechaSi={false}
                  navigation={this.props.navigation}
                  source={this.state.video}
                  thumbnail={this.state.thumbnail}
                  autoplay={false}
                />
              )}
            </View>

            <View style={styles.viewSelectAsign}>
              <Text style={[styles.textAsignatura, { color: this.state.noAsignaturaErr ? "red" : "black" }]}>
                Asignatura:
              </Text>
              <Picker
                enabled={this.state.asignatura != undefined}
                mode="dialog"
                selectedValue={this.state.asignatura}
                style={styles.pickerAsign}
                onValueChange={value =>
                  this.setState({
                    asignatura: value
                  })
                }
              >
                {pickerItems}
              </Picker>
            </View>

            <View style={styles.viewInput}>
              <Input
                placeholder="Escriba un título..."
                label="Título"
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={text => this.setState({ titulo: text, tituloErr: false })}
                errorStyle={{ color: "red" }}
                errorMessage={this.state.tituloErr ? this.tituloErrText : null}
              />
            </View>

            <View style={styles.viewInput}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={text => this.InputFixer.onFocus() || this.setState({ descripción: text })}
                placeholder="Escriba una descripción..."
                multiline={true}
                label="Descripción"
              />
            </View>

            <View style={styles.viewSelectThumbnail}>
              {this.state.noThumbnailErr ? (
                <Text style={styles.imageErrText}>Falta una miniatura</Text>
              ) : (
                <Image source={{ uri: this.state.thumbnail }} style={styles.imageThumbnail} />
              )}
              <Button
                title="Elegir miniatura"
                onPress={this.pickThumbnail}
                containerStyle={styles.selectImageButton}
                buttonStyle={styles.selectThumbnail}
              />
            </View>

            <View style={styles.uploadButtonView}>
              <Button buttonStyle={styles.uploadButton} title="Subir vídeo" onPress={() => this.tryUpload()} />
            </View>
          </InputFixer>
        )}
        <LoadingModal visible={this.state.subiendoVideo} />
      </View>
    );
  }
}
