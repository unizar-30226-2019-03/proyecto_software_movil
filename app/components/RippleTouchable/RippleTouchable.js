import React from "react";

import {Platform, TouchableHighlight} from "react-native";

import { View, TouchableNativeFeedback } from "react-native";

export default class RippleTouchable extends React.Component {
	render() {
		let optional_props = {};
		if (this.props.round) {
			optional_props.background = TouchableNativeFeedback.Ripple("ThemeAttrAndroid", true);
		}
		if(Platform.OS==='android'){
			return (
				<TouchableNativeFeedback onPress={this.props.onPress} disabled={this.props.disabled} {...optional_props}>
					<View {...this.props}>{this.props.children}</View>
				</TouchableNativeFeedback>
			);	
		}
		else {
			return (
				<TouchableHighlight onPress={this.props.onPress} disabled={this.props.disabled} {...optional_props}>
					<View {...this.props}>{this.props.children}</View>
				</TouchableHighlight>
			);

		}
	}
}
