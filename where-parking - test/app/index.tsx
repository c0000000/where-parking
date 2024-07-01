import { Redirect } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
const App: React.FC = () => {
  return <Redirect href="/parcheggio" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default App;
