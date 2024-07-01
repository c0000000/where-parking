import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { MarkerData } from "@/components/mappa/MappaPark";

export const useLocatioUser = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = async (
    callback,
    { gpsActivated, setMarkers, setGpsActivated, setUserMarker }
  ) => {
    if (gpsActivated) {
      // setMarkers((prevMarkers: MarkerData[]) => {
      //   const newMarkers = prevMarkers.filter((marker) => marker.id !== "user");
      //   console.log("prevMarkers", newMarkers);
      //   return newMarkers;
      // });
      // setGpsActivated(false);
      // setUserMarker(null);
      // alert("GPS disattivato");
      // return;
      return;
    }
    setLoading(true);
    try {
      if (Platform.OS === "android" && !Device.isDevice) {
        throw new Error(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error(
          "Permessi GPS sono stati negati,\n- Attivarli dalle impostazioni"
        );
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);

    callback();

    // console.info("fine useUserLocation\n");
  };

  // useEffect(() => {
  //   requestLocation();
  // }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return [location, errorMsg, loading, requestLocation];
};
