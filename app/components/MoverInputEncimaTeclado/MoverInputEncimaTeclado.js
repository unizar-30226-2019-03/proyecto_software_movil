import React from "react";
import {
	Animated,
	Dimensions,
	Keyboard,
	UIManager,
	TextInput
} from "react-native";

const { State: TextInputState } = TextInput;

export default class MoverInputEncimaTeclado {
	constructor() {
		this.state = {
			lastKeyboardHeight: 0,
			shift: new Animated.Value(0),
			currentInput: null
		};

		this.keyboardDidShowSub = Keyboard.addListener(
			"keyboardDidShow",
			this.handleKeyboardDidShow
		);
		this.keyboardDidHideSub = Keyboard.addListener(
			"keyboardDidHide",
			this.handleKeyboardDidHide
		);
	}

	delete() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	getShift() {
		return this.state.shift;
	}

	onFocus() {
		if (this.state.lastKeyboardHeight == 0) {
			return;
		}
		const { height: windowHeight } = Dimensions.get("window");
		const currentlyFocusedField = TextInputState.currentlyFocusedField();
		UIManager.measure(
			currentlyFocusedField,
			(originX, originY, width, height, pageX, pageY) => {
				const gap = this.state.lastKeyboardHeight - (pageY - height);
				if (gap >= 0) {
					return;
				}
				Animated.timing(this.state.shift, {
					toValue: gap,
					duration: 100,
					useNativeDriver: true
				}).start();
			}
		);
	}

	handleKeyboardDidShow = event => {
		this.state.lastKeyboardHeight = event.endCoordinates.height;
		const newInput = TextInputState.currentlyFocusedField();

		if (this.state.currentInput != newInput) {
			this.onFocus()
		}
	};

	handleKeyboardDidHide = () => {
		Animated.timing(this.state.shift, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start();
	};
}
