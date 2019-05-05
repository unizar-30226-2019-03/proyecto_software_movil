import React from "react";
import { Text, View, Picker, ActivityIndicator, Alert } from "react-native";

import { ImagePicker, FileSystem } from "expo";

import { Button, Input, Image } from "react-native-elements";

import { VideoApi, UserApi, ApiClient } from "swagger_unicast";
import { Buffer } from "buffer";
import { getUserToken, getUserId } from "../../../config/Auth";

import VideoConSinFlechaAtras from "../../../components/VideoConSinFlechaAtras";
import InputFixer from "../../../components/InputFixer";

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
      thumbnail: undefined,
      titulo: "",
      descripción: "",
      noThumbnailErr: false,
      tituloVacioErr: false,
      noVideoErr: false,
      noAsignaturaErr: false,
      loading: true
    };

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    this.userApiInstance = new UserApi();
    this.videoApiInstance = new VideoApi();

    let id = getUserId();
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.userApiInstance.getSubjectsOfUser(
      id,
      opts,
      (error, data, response) => {
        if (!error) {
          this.setState({
            pickerData: [...this.state.pickerData, ...data._embedded.subjects],
            loading: false
          });

          console.log(data._embedded.subjects[0]);

          if (this.state.pickerData && this.state.pickerData.length > 0) {
            this.setState({
              asignatura: data._embedded.subjects[0].id
            });
          }
        }
      }
    );
  }

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
      console.log(result);
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
      this.setState({ tituloVacioErr: true });
      someError = true;
    }
    if (!this.state.thumbnail) {
      this.setState({ noThumbnailErr: true });
      someError = true;
    }
    if (!this.state.asignatura) {
      this.setState({ noAsignaturaErr: true });
      someError = true;
    }

    if (!someError) {
      const data = new FormData();

      data.append("title", this.state.titulo);
      data.append("description", this.state.descripción);
      data.append("subject_id", this.state.asignatura);
      data.append("file", {
        uri: this.state.video,
        type: "video/mp4",
        name: this.state.video.substring(
          this.state.video.lastIndexOf("/") + 1,
          this.state.video.length
        )
      });
      data.append("thumbnail", {
        uri: this.state.thumbnail,
        type: "image/jpeg",
        name: this.state.thumbnail.substring(
          this.state.thumbnail.lastIndexOf("/") + 1,
          this.state.thumbnail.length
        )
      });

      fetch(
        "http://ec2-35-181-26-7.eu-west-3.compute.amazonaws.com:8080/api/upload/video",
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + getUserToken()
          },
          body: data
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert(
            "Bien!",
            "El vídeo ha sido subido con éxito",
            [{ text: "Vale", onPress: () => this.props.navigation.goBack() }],
            { cancelable: false }
          );
        })
        .catch(error => {
          console.log(responseJson);
          Alert.alert(
            "Error!",
            "Error al subir el vídeo, vuelve a intentarlo",
            [{ text: "Vale" }],
            { cancelable: false }
          );
        });
    }
  };

  render() {
    let pickerItems = this.state.pickerData.map((s, i) => {
      return <Picker.Item key={i} value={s.id} label={s.name} />;
    });

    return (
      <View
        style={[
          styles.container,
          { justifyContent: this.state.loading ? "center" : "flex-start" }
        ]}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <InputFixer
            navigation={this.props.navigation}
            ref={InputFixer => (this.InputFixer = InputFixer)}
          >
            <View
              style={[
                styles.viewSelectVideo,
                { borderColor: this.state.noVideoErr ? "red" : "grey" }
              ]}
            >
              {!this.state.video ? (
                <Button
                  buttonStyle={styles.selectVideoButton}
                  title="ELEGIR VÍDEO"
                  onPress={this.pickVideo}
                />
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
              <Text
                style={[
                  styles.textAsignatura,
                  { color: this.state.noAsignaturaErr ? "red" : "black" }
                ]}
              >
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
                onChangeText={text =>
                  this.setState({ titulo: text, tituloVacioErr: false })
                }
                errorStyle={{ color: "red" }}
                errorMessage={
                  this.state.tituloVacioErr
                    ? "El título no puede ser vacío"
                    : null
                }
              />
            </View>

            <View style={styles.viewInput}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={text =>
                  this.InputFixer.onFocus() ||
                  this.setState({ descripción: text })
                }
                placeholder="Escriba una descripción..."
                multiline={true}
                label="Descripción"
              />
            </View>

            <View style={styles.viewSelectThumbnail}>
              {this.state.noThumbnailErr ? (
                <Text style={styles.imageErrText}>Falta una miniatura</Text>
              ) : (
                <Image
                  source={{ uri: this.state.thumbnail }}
                  style={styles.imageThumbnail}
                />
              )}
              <Button
                title="Elegir miniatura"
                onPress={this.pickThumbnail}
                containerStyle={styles.selectImageButton}
                buttonStyle={styles.selectThumbnail}
              />
            </View>

            <View style={styles.uploadButtonView}>
              <Button
                buttonStyle={styles.uploadButton}
                title="Subir vídeo"
                onPress={() => this.tryUpload()}
              />
            </View>
          </InputFixer>
        )}
      </View>
    );
  }
}
