import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";

import styles from "./styles";

const LoadingModal = props => {
	console.log(props.visible);
	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={props.visible}
				onRequestClose={() => null}
			>
				<View style={styles.container}>
					<ActivityIndicator size="large" />
				</View>
			</Modal>
		</View>
	);
};

export default LoadingModal;
