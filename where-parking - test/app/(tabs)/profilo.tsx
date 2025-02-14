import { getUtente } from "@/components/useBase";
import { MaterialIcons } from "@expo/vector-icons";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface UserData {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password: string;
  indirizzo: string;
  cap: string;
  localita: string;
}

export default function ProfileScreen() {
  const [userData, setUser] = useState<UserData>(null);
  const [plates, setPlates] = useState([
    { id: "1", plate: "AA 000 AA" },
    { id: "2", plate: "AA 000 AB" },
  ]);
  const [newPlate, setNewPlate] = useState("");

  const setProfilo = { setUser };
  useEffect(() => {
    (async () => {
      await getUtente(setUser);
    })();
  }, []);
  const addPlate = () => {
    if (newPlate.trim()) {
      setPlates([
        ...plates,
        { id: (plates.length + 1).toString(), plate: newPlate },
      ]);
      setNewPlate("");
    }
  };

  const removePlate = (id) => {
    setPlates(plates.filter((plate) => plate.id !== id));
  };

  const updatePlate = (id, newPlateValue) => {
    const updatedPlates = plates.map((plate) => {
      if (plate.id === id) {
        return { ...plate, plate: newPlateValue };
      }
      return plate;
    });
    setPlates(updatedPlates);
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
        <Text style={styles.name}>
          {userData?.nome} {userData?.cognome}
        </Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person-outline" size={48} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{userData?.email}</Text>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.text}>*********</Text>
        <Text style={styles.label}>Città</Text>
        <Text style={styles.text}>{userData?.localita}</Text>
      </View>
      <Text style={styles.sectionTitle}>Elenco targhe registrate</Text>
      <FlatList
        data={plates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.plateContainer}>
            <TextInput
              style={styles.plateInput}
              value={item.plate}
              onChangeText={(text) => updatePlate(item.id, text)}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePlate(item.id)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Inserisci nuova targa"
              value={newPlate}
              onChangeText={setNewPlate}
            />
            <TouchableOpacity style={styles.addButton} onPress={addPlate}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    margin: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  profileIcon: {
    alignSelf: "center",
    marginVertical: 10,
    // Add styling for profile icon if necessary
  },
  infoContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "800",
  },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  plateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  plateInput: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 10,
  },
  removeButton: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    alignItems: "center",
    padding: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: "#000",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
