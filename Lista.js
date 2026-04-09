import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function Lista() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  // 🔥 CARGA INICIAL
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(
        "https://api.balldontlie.io/v1/players?per_page=10",
        {
          headers: {
            Authorization: "63365c64-f024-42e5-bf26-56d1e6600ca0",
          },
        }
      );

      const data = await res.json();
      setPlayers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔍 SUGERENCIAS
  useEffect(() => {
    if (search.length < 2) {
      setSugerencias([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.balldontlie.io/v1/players?search=${search}`,
          {
            headers: {
              Authorization: "63365c64-f024-42e5-bf26-56d1e6600ca0",
            },
          }
        );

        const data = await res.json();
        setSugerencias(data.data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <View style={styles.container}>

      {/* 🔍 INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Buscar jugador..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setJugadorSeleccionado(null);
        }}
      />

      {/* 💡 SUGERENCIAS */}
      {sugerencias.length > 0 && !jugadorSeleccionado && (
        <FlatList
          data={sugerencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const nombre = item.first_name + " " + item.last_name;

            return (
              <TouchableOpacity
                style={styles.suggestion}
                onPress={() => {
                  setJugadorSeleccionado(item);
                  setSearch(nombre);
                  setSugerencias([]);
                }}
              >
                <Text style={styles.suggestionText}>{nombre}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* 👤 JUGADOR SELECCIONADO */}
      {jugadorSeleccionado ? (
        <View style={styles.card}>
          <Text style={styles.name}>
            {jugadorSeleccionado.first_name}{" "}
            {jugadorSeleccionado.last_name}
          </Text>
          <Text style={styles.info}>
            {jugadorSeleccionado.team.full_name}
          </Text>
          <Text style={styles.info}>
            Posición: {jugadorSeleccionado.position || "N/A"}
          </Text>
        </View>
      ) : (
        // 📋 LISTA INICIAL
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.info}>
                {item.team.full_name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 15,
  },
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: "#333",
    padding: 10,
    marginVertical: 2,
    borderRadius: 6,
  },
  suggestionText: {
    color: "white",
  },
  item: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#aaa",
    fontSize: 14,
  },
});