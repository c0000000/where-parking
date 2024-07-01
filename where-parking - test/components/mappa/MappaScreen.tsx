import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MappaPark, { MarkerData } from "./MappaPark";
import SearchComponent from "../searchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocatioUser } from "@/hooks/useUserLocatio";
import { getComuni } from "../useBase";

const MappaScreen = () => {
  const [locationData, errorMsg, loading, requestLocation] = useLocatioUser();
  const [gpsActivated, setGpsActivated] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [userMarker, setUserMarker] = useState<MarkerData | null>(null);

  const trovaAuto = async () => {
    if (!gpsActivated) {
      if (errorMsg) {
        setGpsActivated(false);
        alert(
          "GPS è disattivato. \n Insrire manualemnte la via in cui ti trovi"
        );
        return;
      }
    }
    if (markers.find((m) => m.id === "car")) {
      if (gpsActivated) {
        alert("Ricerca percorso migliore");
      } else {
        alert("Attiva il GPS");
      }
    } else {
      alert("Non hai ancora salvato un parcheggio");
    }
  };
  const createMarkerCar = async () => {
    await getComuni();
    const carMarker: MarkerData = {
      id: "car",
      coordinate: {
        latitude: 45.50021260848525,
        longitude: 9.178587101036626,
      },
      title: "Car Location",
      color: "red",
    };

    setMarkers((prevMarkers) => {
      const filteredMarkers = prevMarkers.filter(
        (marker) => marker.id !== "car"
      );
      return [carMarker, ...filteredMarkers];
    });
  };
  const handleActivateGPS = () => {
    console.log("callback start");
    // if (gpsActivated) {
    //   setMarkers((prevMarkers: MarkerData[]) => {
    //     const newMarkers = prevMarkers.filter((marker) => marker.id !== "user");
    //     console.log("prevMarkers", newMarkers);
    //     return newMarkers;
    //   });
    //   setGpsActivated(false);
    //   setUserMarker(null);

    //   alert("GPS disattivato");
    //   return;
    // }
    console.info("STEP requestLocation");

    console.log("errorMsg", errorMsg);
    console.log("locationData", locationData);
    console.info("GPS STATE", gpsActivated);

    if (errorMsg !== null) {
      alert("Errore nel GPS, riprova");
      console.error(errorMsg);
      setGpsActivated(false);
      return;
    }

    console.log("errorMsg", errorMsg);
    console.log("locationData", locationData);
    console.info("GPS STATE", gpsActivated);

    if (locationData !== null) {
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
      setGpsActivated(true);
    } else {
      alert("Errore nella poszione: Riprova ad attivare GPS\n" + locationData);
      setGpsActivated(false);
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => requestLocation(handleActivateGPS)}
      >
        <MaterialIcons
          name={!loading ? "gps-fixed" : "sync"}
          size={24}
          color={gpsActivated ? "blue" : "black"}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonParcheggio}
            onPress={createMarkerCar}
          >
            <Text style={styles.buttonTextParcheggio}>PARCHEGGIA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonParcheggio} onPress={trovaAuto}>
            <Text style={styles.buttonTextParcheggio}>TROVA AUTO</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    bottom: 80,
    right: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  buttonParcheggio: {
    flex: 1,
    backgroundColor: "blue",
    padding: 15,
    margin: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonTextParcheggio: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },
});

export default MappaScreen;
