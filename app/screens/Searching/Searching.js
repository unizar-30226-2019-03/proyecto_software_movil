import React from "react";
import { View, ScrollView, FlatList, Text } from "react-native";

import { SearchBar, Button } from "react-native-elements";

import { VideoApi, SubjectApi, ApiClient } from "swagger_unicast";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";
import ThumbnailAsignatura from "../../components/ThumbnailAsignatura";

import { timeStampToFormat, secToDuration } from "../../components/Time";

import EntypoIcons from "react-native-vector-icons/Entypo";

import styles from "./styles";

export default class Searching extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      searchText: "",
      viewingVideos: true,
      currentDate: undefined,
      vidData: [],
      subData: [],
      onVidEndReachedManaged: false,
      onSubEndReachedManaged: false,
      loadingVid: true,
      loadingSub: true,
      fetchingNewVidData: false,
      fetchingNewSubData: false
    };

    this.videoApiInstance = new VideoApi();
    this.subjectApiInstance = new SubjectApi();
  }

  componentDidMount() {
		this.changeSearchText = this.changeSearchText.bind(this);
		this.getData = this.getData.bind(this);
    this.props.navigation.setParams({
			changeSearchText: this.changeSearchText,
			getData: this.getData,
      searchText: this.state.searchText
    });
  }

  getVideoData = () => {
    if (!this.state.onVidEndReachedManaged) {
      let opts = {
				title: this.state.searchText,
				projection: "videoWithSubjectAndUniversity"
      };
      this.videoApiInstance.findVideosContainingTitle(
        opts,
        (error, data, response) => {
          if (!error) {
            this.setState({
              vidData: data._embedded.videos,
              loadingVid: false,
              fetchingNewVidData: false,
							onVidEndReachedManaged: false,
							currentDate: ApiClient.parseDate(response.headers.date),
						});
          }
        }
      );
    } else {
      this.setState({ loadingVid: false, fetchingNewVidData: false });
    }
  };

  getSubjectData = () => {
    if (!this.state.onSubEndReachedManaged) {
      let opts = {
        name: this.state.searchText,
        projection: "subjectWithUniversity"
      };
      this.subjectApiInstance.findSubjectsContainingName(
        opts,
        (error, data, response) => {
          if (!error) {
            this.setState({
              subData: data._embedded.subjects,
              loadingSub: false,
              fetchingNewSubData: false,
							onSubEndReachedManaged: false,
						});
          } else {
          }
        }
      );
    } else {
      this.setState({ loadingSub: false, fetchingNewSubData: false });
    }
  };

  changeTabThenGetData = (viewingVideo) => {
    if (viewingVideo) {
      this.setState({
        viewingVideos: viewingVideo,
        fetchingNewVidData: true
      });
      if (this.state.searchText != "") {

        this.getVideoData();
      }
    } 
    else {
      this.setState({
        viewingVideos: viewingVideo,
        fetchingNewSubData: true
      });
      if (this.state.searchText != "") {

        this.getSubjectData(); 
      }
    }
  }

  getData = () => {
    if (this.state.viewingVideos) {
      this.setState({ fetchingNewVidData: true });
      if (this.state.searchText != "") this.getVideoData();
    } else {
      this.setState({ fetchingNewSubData: true });
      if (this.state.searchText != "") this.getSubjectData();
    }
  };

  static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

    return {
      headerTitle: (
        <View style={styles.headerContainer}>
          <SearchBar
            autoFocus
            value={params.searchText}
            placeholder="Buscar..."
            inputContainerStyle={styles.searchBarIn}
            searchIcon={false}
            containerStyle={styles.searchBarOut}
						onChangeText={text => params.changeSearchText(text)}
						onSubmitEditing={(event) => params.getData()}
          />
        </View>
      )
    };
  };

  changeSearchText = value => {
    this.setState({
      searchText: value
    });
    this.props.navigation.setParams({
      searchText: value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.buttonRow}>
            <Button
              title="Vídeos"
              containerStyle={styles.swapButton}
              type={this.state.viewingVideos ? "solid" : "clear"}
              onPress={() => this.changeTabThenGetData(true)}
            />
            <Button
              title="Asignaturas"
              containerStyle={styles.swapButton}
              type={this.state.viewingVideos ? "clear" : "solid"}
              onPress={() => this.changeTabThenGetData(false)}
            />
          </View>
          {this.state.viewingVideos ? (
            <FlatList
              data={this.state.vidData}
              onEndReached={() => this.getData()}
              renderItem={({ item }) => (
                <View style={styles.videoMargin}>
                  <FullScreenThumbnail
                    navigation={this.props.navigation}
                    image={{ uri: item.thumbnailUrl }}
                    likes={item.score}
                    duracion={secToDuration(item.seconds)}
                    title={item.title}
                    info={timeStampToFormat(
                      item.timestamp,
                      this.state.currentDate
                    )}
                    asignaturaIcon={{
                      uri:
                        item.university != null
                          ? item.university.photo
                          : "uri_nula"
                    }}
                    asignaturaName={item.subject.abbreviation}
                    asignaturaFullName={item.subject.name}
                    asignaturaId={item.subject.id}
                    videoId={item.id}
                  />
                </View>
              )}
            />
          ) : (
            <FlatList
              data={this.state.subData}
              onEndReached={() => this.getData()}
              renderItem={({ item }) => (
                <View style={styles.subjectMargin}>
                  <ThumbnailAsignatura
                    navigation={this.props.navigation}
                    icon={{
                      uri:
                        item.university != null
                          ? item.university.photo
                          : "uri_nula"
                    }}
                    name={item.name}
                    id={item.id}
                  />
                </View>
              )}
            />
          )}
          {/* <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Una asignatura con nombre largo"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Proyecto software"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="70%"
            duracion="1:10"
            title="Nombre bastante largo para ser un nombre de un video de prueba"
            info="Hece 3 meses"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Multiprocesadores"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Multiprocesadores"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="10%"
            duracion="1:10:60"
            title="Nombre corto"
            info="Hece 1 día"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="70%"
            duracion="0:50"
            title="Nombre largooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
            info="Hece 3 años"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <ThumbnailAsignatura
            navigation={this.props.navigation}
            icon={require("../../../test/imagenes/perfil_uni.jpg")}
            name="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          /> */}
        </ScrollView>
      </View>
    );
  }
}
