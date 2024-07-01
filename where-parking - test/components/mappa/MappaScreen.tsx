import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MappaPark, { MarkerData } from "./MappaPark";
import SearchComponent from "../searchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocatioUser } from "@/hooks/useUserLocatio";
const carMarker: MarkerData = {
  id: "car",
  coordinate: {
    latitude: 45.50021260848525,
    longitude: 9.178587101036626,
  },
  title: "Car Location",
  color: "red",
};

const MappaScreen = () => {
  const [locationData, errorMsg, requestLocation] = useLocatioUser();
  const [gpsActivated, setGpsActivated] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([carMarker]);
  const [userMarker, setUserMarker] = useState<MarkerData | null>(null);

  const handleActivateGPS = async () => {
    console.info("GPS STATE", gpsActivated);
    if (gpsActivated) {
      setMarkers((prevMarkers: MarkerData[]) => {
        const newMarkers = prevMarkers.filter((marker) => marker.id !== "user");
        console.log("prevMarkers", newMarkers);
        return newMarkers;
      });
      setGpsActivated(false);
      setUserMarker(null);

      alert("GPS disattivato");
      return;
    }
    await requestLocation();

    if (errorMsg) {
      alert(errorMsg);
      setGpsActivated(false);
      return;
    }
    setGpsActivated(true);

    console.log("errorMsg", errorMsg);
    console.log("userMakrer", locationData);
    console.info("GPS STATE", gpsActivated);

    if (locationData) {
      const newUserMarker: MarkerData = {
        id: "user",
        coordinate: {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        },
        title: "User Location",
        description: `Accuracy: ${locationData.coords.accuracy}`,
        color: "blue",
      };
      setGpsActivated(true);
      setUserMarker(newUserMarker);
      setMarkers((prevMarkers) => [newUserMarker, ...prevMarkers]);
      console.log("GPS Markers", markers);
    }else{
      alert("Disattiva e  Attiva il GPS")
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
          color={gpsActivated ? "blue" : "black"}
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
