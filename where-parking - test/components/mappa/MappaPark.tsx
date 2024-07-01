import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export type Coordinate = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type MarkerData = {
  id: string;
  coordinate: Coordinate;
  color?: string;
  title?: string;
  description?: string;
};

export type MappaParkProps = {
  coordinate?: Coordinate;
  markers?: MarkerData[];
};

const MappaPark = ({ coordinate, markers }: MappaParkProps) => {
  const userLocation = markers.filter((m) => m.id == "user")[0];
  const carLocation = markers.filter((m) => m.id == "car")[0];

  const origin = userLocation?.coordinate;
  const destination = carLocation?.coordinate;

  const GOOGLE_MAPS_APIKEY = "AIzaSyC0FC6-sXJ7ApEO_si6bg3c7DN5dyAFzBo";

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 45.4642,
        longitude: 9.19,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      zoomControlEnabled={false}
      region={coordinate}
    >
      {markers &&
        markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title || ""}
            description={marker.description || ""}
            pinColor={marker.color || ""}
          />
        ))}
      {origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          onError={(e) => console.log("errorMapDirection:", e)}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MappaPark;
