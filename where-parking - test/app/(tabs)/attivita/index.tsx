import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const Attivita = () => {
  const router = useRouter();

  const handleStoricoParcheggioPress = () => {
    router.push("/attivita/storicoParcheggio");
  };

  const handleStatisticaParcheggioPress = () => {
    router.push("/attivita/statisticaParcheggio");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attività</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStoricoParcheggioPress}
      >
        <Text style={styles.buttonText}>Storico Parcheggio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStatisticaParcheggioPress}
      >
        <Text style={styles.buttonText}>Statistica Parcheggio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "none", // Rimuove sottolineatura di default del Link
  },
});

export default Attivita;
