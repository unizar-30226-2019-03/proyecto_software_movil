import React from "react";
import { Text, View, Picker } from "react-native";

import { ImagePicker } from "expo";
import { Button, Input, Image } from "react-native-elements";

import VideoConSinFlechaAtras from "../../../components/VideoConSinFlechaAtras";
import InputFixer from "../../../components/InputFixer";

import styles from "./styles";

// const { State: TextInputState } = TextInput;

export default class SubirVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      asignatura: undefined,
      pickerData: ['wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa', 'wdadawdawdawdaa','dwadawdawdawdawdawdawdawdawdawdawddadawdawdawdawdadawdawdawdawdawdawdawdawdawdaawdawdab', 'dadawdawdac', 'dawdawdawd', 'dawdawdawe', 'dawdawdawe', 'dawdawdawe', 'dawdawdawe'],
      video: undefined,
      thumbnail: undefined,
      titulo: "",
      descripción: "",
      noThumbnailErr: false,
      tituloVacioErr: false,
      noVideoErr: false
    };

    //api
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
      this.setState({ thumbnail: result.uri, noThumbnailErr: false });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Subir vídeo"
  });

  tryUpload = () => {
    let someError = false;
    if (!this.state.video) {
      this.setState({ noVideoErr: true })
      someError = true
    }
    if (this.state.titulo == "") {
      this.setState({ tituloVacioErr: true })
      someError = true
    }
    if (!this.state.thumbnail) {
      this.setState({ noThumbnailErr: true })
      someError = true
    }
    if (!this.state.video) {
      someError = true
    }

    if (!someError) {
      // api
    }
  }

  render() {
    let pickerItems = this.state.pickerData.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
    });

    return (
      <InputFixer         
        navigation={this.props.navigation}
        ref={InputFixer => this.InputFixer = InputFixer}
      >
        <View style={[styles.viewSelectVideo, { borderColor: this.state.noVideoErr ? "red" : "grey"}]}>
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
          <Text style={styles.textAsignatura}>Asignatura:</Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.asignatura}
            style={styles.pickerAsign}
            onValueChange={(asignatura) =>
              this.setState({ asignatura: asignatura })
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
            onChangeText={(text) => this.InputFixer.onFocus() || this.setState({ descripción: text })}
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
          <Button buttonStyle={styles.uploadButton} title="Subir vídeo" onPress={() => this.tryUpload()}/>
        </View>
      </InputFixer>
    );
  }
}
