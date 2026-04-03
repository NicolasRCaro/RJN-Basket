import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Lista from './Lista';
import Original from './Original';

function Navegacion() {
  const [pantalla, setPantalla] = useState('Lista');

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Lista" onPress={() => setPantalla('Lista')} />
        <Button title="Original" onPress={() => setPantalla('Original')} />
      </View>
      <View style={styles.content}>
        {pantalla === 'Lista' && <Lista/>}
        {pantalla === 'Original' && <Original/>}
      </View>
    </View>
  );
}
export default Navegacion;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#000000",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    minWidth: 100
  },
  activeButton: {
    backgroundColor: "#666"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});