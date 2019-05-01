import React from "react";
import {
	Keyboard,
	UIManager,
	TextInput,
	View,
	ScrollView,
	StyleSheet
} from "react-native";

import { ScreenhHeight, headerHeight } from "../../constants";

const { State: TextInputState } = TextInput;

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
		this.focusListener.remove();
		this.blurListener.remove();
	};

	handleDidFocus = () => {
		this.resume();
	};

	handleDidBlur = () => {
		this.pause();
	};

	handleKeyboardDidShow = event => {
		this.setState({
			keyboardHeight: event.endCoordinates.height,
			keyboardOpen: true
		});
		this.onFocus();
	};

	handleKeyboardDidHide = () => {
		this.setState({ keyboardHeight: 0, keyboardOpen: false });
	};

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

	pause() {
		this.setState({ scrollY: 0, keyboardOpen: false });
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	_onLayout = (event: ViewLayoutEvent) => {
		if (!this.heightUsed) {
			this._frame = event.nativeEvent.layout;
			this.heightUsed = true;
		}
	};

	update = () => {
	}

	handleScroll = (event: Object) => {
		this.setState({ scrollY: event.nativeEvent.contentOffset.y });
	};

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
					ref={scrollView => (this.scrollView = scrollView)}
					onScroll={this.handleScroll}
					onUpdate={this.hola}
				>
					{this.props.children}
					
					{this.state.keyboardOpen ? <View style={{marginBottom: 15}}/> : null}
				</ScrollView>
			</View>
		);
	}
}
