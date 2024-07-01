import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "profilo") {
            iconName = "person";
          } else if (route.name === "parcheggio") {
            iconName = "local-parking";
          } else if (route.name === "attivita") {
            iconName = "apps";
          }

          // Restituisce l'icona MaterialIcons con il nome corretto e colore specificato
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen options={{ title: "Profilo" }} name="profilo" />
      <Tabs.Screen options={{ title: "Parcheggio" }} name="parcheggio" />
      <Tabs.Screen options={{ title: "Attività" }} name="attivita" />
    </Tabs>
  );
};
