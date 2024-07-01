import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

export const useLocatioUser = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestLocation = async () => {
    try {
      if (Platform.OS === "android" && !Device.isDevice) {
        throw new Error(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []); 

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return [location, errorMsg, requestLocation];
};
