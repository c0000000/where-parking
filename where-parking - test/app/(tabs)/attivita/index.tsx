import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ActivityScreen({ navigation }) {
  const router = useRouter();
  const handleStoricoParcheggioPress = () => {
    router.push("/attivita/storicoParcheggio");
  };

  const handleStatisticaParcheggioPress = () => {
    router.push("/attivita/statisticaParcheggio");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Attività</Text>
      <Text style={styles.subtitle}>Statistiche</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("In fase di sviluppo");
        }}
      >
        <Text style={styles.buttonText}>Grafico prezzi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("In fase di sviluppo");
        }}
      >
        <Text style={styles.buttonText}>Grafico frequenza parcheggi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStatisticaParcheggioPress}
      >
        <Text style={styles.buttonText}>Grafico statistiche per città</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStoricoParcheggioPress}
      >
        <Text style={styles.buttonText}>Storico parcheggi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
