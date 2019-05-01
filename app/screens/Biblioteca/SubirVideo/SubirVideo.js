import React from "react";
import { Text, View, Picker } from "react-native";

import { ImagePicker } from "expo";
import { Button, Input, Image } from "react-native-elements";

import VideoConSinFlechaAtras from "../../../components/VideoConSinFlechaAtras";
import InputFixer from "../../../components/InputFixer";

import styles from "./styles";

// const { State: TextInputState } = TextInput;

export default class SubirVideo extends React.Component {
  state = {
    videoIsChosen: 0,
    asignatura: undefined,
    video: undefined,
    thumbnail: "uri_nula"
  };

  pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Videos",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ video: result.uri, videoIsChosen: 1 });
    }
  };

  pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ thumbnail: result.uri });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Subir vídeo"
  });

  render() {
    const { thumbnail } = this.state;
    const { video } = this.state;

    return (
      <InputFixer         
        navigation={this.props.navigation}
        ref={InputFixer => this.InputFixer = InputFixer}
      >
        <View style={styles.viewSelectVideo}>
          {this.state.videoIsChosen == 0 ? (
            <Button
              buttonStyle={styles.selectVideoButton}
              title="ELEGIR VÍDEO"
              onPress={this.pickVideo}
            />
          ) : (
            <VideoConSinFlechaAtras
              flechaSi={false}
              navigation={this.props.navigation}
              source={video}
              thumbnail={thumbnail}
              autoplay={false}
            />
          )}
        </View>

        <View style={styles.viewSelectAsign}>
          <Text style={styles.textAsignatura}>Asignatura:</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.asignatura}
            style={styles.pickerAsign}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ asignatura: itemValue })
            }
          >
            <Picker.Item label="Unizar - Bioinformática" value="1" />
            <Picker.Item
              label="UC3 - Laboratorio de sistemas de información"
              value="2"
            />
          </Picker>
        </View>

        <View style={styles.viewInput}>
          <Input
            placeholder="Escriba un título..."
            label="Título"
            onFocus={() => this.InputFixer.onFocus()}
          />
        </View>

        <View style={styles.viewInput}>
          <Input
            onFocus={() => this.InputFixer.onFocus()}
            onChangeText={() => this.InputFixer.onFocus()}
            placeholder="Escriba una descripción..."
            multiline={true}
            label="Descripción"
          />
        </View>

        <View style={styles.viewSelectThumbnail}>
          <Button
            title="Elegir miniatura"
            onPress={this.pickThumbnail}
            buttonStyle={styles.selectThumbnail}
          />
          {thumbnail && (
            <Image source={{ uri: thumbnail }} style={styles.imageThumbnail} />
          )}
        </View>

        <View style={styles.uploadButtonView}>
          <Button buttonStyle={styles.uploadButton} title="Subir vídeo" />
        </View>
      </InputFixer>
    );
  }
}
