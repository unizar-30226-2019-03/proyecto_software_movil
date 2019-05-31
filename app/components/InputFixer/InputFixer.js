/**
 * @fileoverview ScrollView con comportamiento mejorado al ser utilizado junto con un componente Input
 * @author Unicast
 * @requires ../../constants:ScreenhHeight
 */
import React from "react";
import {
  Keyboard,
  UIManager,
  TextInput,
  View,
  ScrollView,
  StyleSheet
} from "react-native";

import { ScreenhHeight, HeaderHeight } from "../../constants";

const { State: TextInputState } = TextInput;
/**
 * @param {Object} props props para renderizar el componente
 * 		props.children Contenido a mostrar dentro de la ScrolLView
 * 		props.style Estilo
 * @module InputFixer
 *
 */
export default class InputFixer extends React.Component {
  state = {
    keyboardHeight: 0,
    keyboardOpen: false,
    scrollY: 0
  };

  heightUsed = false;
  _frame = 0;

  componentWillMount = () => {
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.handleDidFocus
    );
    this.blurListener = this.props.navigation.addListener(
      "didBlur",
      this.handleDidBlur
    );
  };

  componentWillUnmount = () => {
    this.pause();
    if (this.focusListener) {
      this.focusListener.remove();
    }
    if (this.blurListener) {
      this.blurListener.remove();
    }
  };
  /**
   * Callback cuando se usa el teclado
   */
  handleDidFocus = () => {
    this.resume();
  };
  /**
   * Callback cuando se pulsa una zona de la pantalla que no es el teclado
   */
  handleDidBlur = () => {
    this.pause();
  };
  /**
   * Calback cuando se muestra el teclado
   * @param {Event} event Evento del teclado
   */
  handleKeyboardDidShow = event => {
    this.setState({
      keyboardHeight: event.endCoordinates.height,
      keyboardOpen: true
    });
    this.onFocus();
  };
  /**
   * Callback cuando el teclado desaparece
   */
  handleKeyboardDidHide = () => {
    this.setState({ keyboardHeight: 0, keyboardOpen: false });
  };
  /**
   * Añade los listener necesarios a eventos del teclado
   */
  resume() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }
  /**
   * Elimina los listener del teclado
   */
  pause() {
    this.setState({ scrollY: 0, keyboardOpen: false });
    if (this.keyboardDidShowSub) {
      this.keyboardDidShowSub.remove();
    }
    if (this.keyboardDidHideSub) {
      this.keyboardDidHideSub.remove();
    }
  }

  _onLayout = (event: ViewLayoutEvent) => {
    if (!this.heightUsed) {
      this._frame = event.nativeEvent.layout;
      this.heightUsed = true;
    }
  };
  /**
   * Callback al hacer scroll en la ScrollView
   */
  handleScroll = (event: Object) => {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y });
  };

  /**
   * Adapta la ScrollView para que se vea igual al abrirse el teclado
   */
  onFocus() {
    if (!this.state.keyboardOpen) {
      return;
    }
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const gap =
          ScreenhHeight - this.state.keyboardHeight - (pageY + height + 10);
        if (gap >= 0) {
          return;
        }
        this.scrollView.scrollTo({ y: this.state.scrollY - gap });
      }
    );
  }

  render() {
    heightStyle = {
      height: this._frame.height - this.state.keyboardHeight,
      flex: this.heightUsed ? 0 : 1
    };

    return (
      <View
        style={StyleSheet.compose(
          this.props.style,
          heightStyle
        )}
        onLayout={this._onLayout}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollView => (this.scrollView = scrollView)}
          onScroll={this.handleScroll}
          onUpdate={this.hola}
          keyboardShouldPersistTaps={"handled"}
        >
          {this.props.children}

          {this.state.keyboardOpen ? (
            <View style={{ marginBottom: 15 }} />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}
