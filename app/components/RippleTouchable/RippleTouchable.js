import React from "react";

import { View, TouchableNativeFeedback } from "react-native";

export default class RiplleTouchable extends React.Component {
	render() {
		let optional_props = {};
		if (this.props.round) {
			optional_props.background = TouchableNativeFeedback.Ripple("ThemeAttrAndroid", true);
		}
		return (
			<TouchableNativeFeedback onPress={this.props.onPress} {...optional_props}>
				<View {...this.props}>{this.props.children}</View>
			</TouchableNativeFeedback>
		);
	}
}
