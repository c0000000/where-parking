import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export type Coordinate = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type MarkerData = {
  id: string;
  coordinate: Coordinate;
  title?: string;
  description?: string;
};

export type MappaParkProps = {
  coordinate?: Coordinate;
  markers?: MarkerData[];
};

const MappaPark = ({ coordinate: initCoordinate, markers }: MappaParkProps) => {
  const [coordinate, setCoordinate] = useState<Coordinate>(
    initCoordinate || {
      latitude: 45.4642,
      longitude: 9.19,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );

  return (
    <MapView style={styles.map} region={coordinate}>
      {markers && 
        markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title || ""}
            description={marker.description || ""}
          />
        ))}
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
