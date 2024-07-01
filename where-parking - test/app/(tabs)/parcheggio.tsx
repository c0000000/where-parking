import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MappaScreen from "@/components/mappa/MappaScreen";

const parcheggio = () => {
  return (
    <View>
      <MappaScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  maps: {
    width: "100%",
    height: "100%",
  },
});

export default parcheggio;
