import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MappaPark, { MarkerData } from "./MappaPark";
import SearchComponent from "../searchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocatioUser } from "@/hooks/useUserLocatio";

const MappaScreen = () => {

  const [locationData, errorMsg, requestLocation] = useLocatioUser();
  const [gpsActivated, setGpsActivated] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [userMarker, setUserMarker] = useState<MarkerData | null>(null);

  const handleActivateGPS = async () => {
    await requestLocation();

    if (errorMsg) {
      alert(
        "Accesso alla posizione negato. Abilita il permesso di accesso alla posizione nelle impostazioni del dispositivo."
      );
      return;
    }

    setGpsActivated((prevActivated) => !prevActivated);

    if (!gpsActivated && userMarker) {
      setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.id !== "user")
      );
      setUserMarker(null);
    } else if (gpsActivated && locationData) {
      const newUserMarker: MarkerData = {
        id: "user",
        coordinate: {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        },
        title: "User Location",
        description: `Accuracy: ${locationData.coords.accuracy}`,
      };
      setUserMarker(newUserMarker);
      setMarkers((prevMarkers) => [newUserMarker, ...prevMarkers]);
    }
  };

  return (
    <View>
      <View style={styles.mapContainer}>
        <MappaPark markers={markers} />
        <View style={styles.search}>
          <SearchComponent />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleActivateGPS}>
        <MaterialIcons
          name="gps-fixed"
          size={24}
          color={!gpsActivated ? "blue" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    position: "relative",
    height: "100%",
  },

  search: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  button: {
    flex: 1,
    width: 48,
    height: 48,
    position: "absolute",
    bottom: 20,
    left: "80%",
    right: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MappaScreen;
