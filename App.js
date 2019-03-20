import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DownMenu from './components/DownMenu';

export default class App extends React.Component {  
  getUserLocationHandler = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <DownMenu onGetLocation={this.getUserLocationHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
