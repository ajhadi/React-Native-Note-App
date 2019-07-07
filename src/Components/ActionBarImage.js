import React, { Component } from 'react'; 
import { StyleSheet, View, Text, Image } from 'react-native';
 
export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri:
              'https://obs.line-scdn.net/0hHRus-RwKF31ICjimgRNoKnJcFBJ7ZgR-LDxGYxhkSUltaQJ5cWkMGz9fQERnO1AjJjxbHmUIDExibVl_J24M/w644',
          }}
          style={{
            width: 35,
            height: 35,
            borderRadius: 40 / 2,
          }}
        />
      </View>
    );
  }
}

