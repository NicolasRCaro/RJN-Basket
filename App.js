import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Lista from './Lista';
import Original from './Original';

function App() {
  const [pantalla, setPantalla] = useState('Lista');

  return (
    <View style={styles.container}>

      {/* 🔥 NAV */}
      <View style={styles.nav}>
        <Button title="Lista" onPress={() => setPantalla('Lista')} />
        <Button title="Original" onPress={() => setPantalla('Original')} />
      </View>

      {/* 🔥 CONTENIDO */}
      <View style={styles.content}>
        {pantalla === 'Lista' && <Lista />}
        {pantalla === 'Original' && <Original />}
      </View>

    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111"
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },

  content: {
    flex: 1  // 🔥 ESTA LÍNEA ARREGLA TODO
  }
});