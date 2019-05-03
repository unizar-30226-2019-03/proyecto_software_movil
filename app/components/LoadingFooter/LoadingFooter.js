import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./styles";

const LoadingFooter = props => {
	return (
		<View>
			{props.show ? (
				<ActivityIndicator size="large" style={styles.footer} />
			) : null}
		</View>
	);
};

export default LoadingFooter;
