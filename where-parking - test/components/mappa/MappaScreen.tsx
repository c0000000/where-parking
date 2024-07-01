import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MappaPark, { MarkerData, Coordinate } from "./MappaPark";
import SearchComponent from "../searchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocatioUser } from "@/hooks/useUserLocatio";
import { getComuni } from "../useBase";
import { Region } from "react-native-maps";
import ParcheggioButtons from "./parcheggioButton";

const MappaScreen = () => {
  const [locationData, errorMsg, loading, requestLocation] = useLocatioUser();
  const [gpsActivated, setGpsActivated] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [userMarker, setUserMarker] = useState<MarkerData | null>(null);
  const [focusCoordinate, setCoordinate] = useState<Coordinate>(null);
  const [onPercorso, setOnPercorso] = useState<boolean>(false);
  const trovaAuto = async () => {
    setOnPercorso((v) => !v);
    if (!gpsActivated) {
      if (errorMsg) {
        setGpsActivated(false);
        alert(
          "GPS è disattivato. \n Insrire manualemnte la via in cui ti trovi"
        );
        return;
      }
    }
    const markerCar = markers.find((m) => m.id === "car");
    //console.log({ markerCar });
    if (markerCar) {
      if (gpsActivated) {
        alert(!onPercorso ? "Ricerca percorso migliore" : "Percorso rimosso");
        const { coordinate } = markerCar;
        changeRegion(coordinate.latitude, coordinate.longitude);
      } else {
        alert("Attiva il GPS");
      }
    } else {
      alert("Non hai ancora salvato un parcheggio");
    }
  };

  const changeRegion = (newLatitude, newLongitude) => {
    const newRegion = {
      latitude: newLatitude,
      longitude: newLongitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    setCoordinate(newRegion);
  };

  const createMarkerCar = async () => {
    // await getComuni();
    const carMarker: MarkerData = {
      id: "car",
      coordinate: {
        latitude: 45.50021260848525,
        longitude: 9.178587101036626,
      },
      title: "Car Location",
      color: "red",
    };
    const { coordinate } = carMarker;
    changeRegion(coordinate.latitude, coordinate.longitude);
    setMarkers((prevMarkers) => {
      const filteredMarkers = prevMarkers.filter(
        (marker) => marker.id !== "car"
      );
      return [carMarker, ...filteredMarkers];
    });
  };
  const handleActivateGPS = () => {
    if (errorMsg !== null) {
      //alert("Errore nel GPS, riprova");
      alert(errorMsg);
      console.log(errorMsg);
      setGpsActivated(false);
      return;
    }

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
      // console.log("GPS Markers --", markers);
      setGpsActivated(true);
      const { coordinate } = newUserMarker;
      changeRegion(coordinate.latitude, coordinate.longitude);
    } else {
      //alert("Errore nella posizione: Riprova ad attivare GPS\n" + locationData);
      setGpsActivated(false);
    }
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.mapContainer}>
        <MappaPark
          onPercorso={onPercorso}
          coordinate={focusCoordinate}
          markers={markers}
        />
        <View style={styles.search}>
          <SearchComponent />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (gpsActivated) {
            const { coordinate } = markers.find((m) => m.id === "user");
            changeRegion(coordinate.latitude, coordinate.longitude);
          }
          requestLocation(handleActivateGPS, {
            gpsActivated,
            setMarkers,
            setGpsActivated,
            setUserMarker,
          });
        }}
      >
        <MaterialIcons
          name={!loading ? "gps-fixed" : "sync"}
          size={24}
          color={gpsActivated ? "blue" : "black"}
        />
      </TouchableOpacity>
      <ParcheggioButtons
        createMarkerCar={createMarkerCar}
        trovaAuto={trovaAuto}
        onMarkerCar={markers.find((m) => m.id === "car") ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    paddingTop: 20,
    position: "relative",
    height: "90%",
  },

  search: {
    position: "absolute",
    top: 20,
    left: 35,
    right: 35,
    zIndex: 1,
  },
  button: {
    flex: 1,
    width: 48,
    height: 48,
    position: "absolute",
    bottom: 180,
    right: 7,
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MappaScreen;
