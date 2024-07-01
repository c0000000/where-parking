import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";

const ParcheggioButtons = ({
  createMarkerCar,
  trovaAuto,
  onMarkerCar = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleParcheggiaPress = () => {
    setShowConfirmation(true);
  };

  const handleConfirmParcheggia = () => {
    setShowConfirmation(false);
    createMarkerCar();
  };

  const handleCancelParcheggia = () => {
    setShowConfirmation(false);
  };

  const handleTrovaAutoPress = () => {
    trovaAuto();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonParcheggio,
            showConfirmation && { display: "none" },
          ]}
          onPress={handleParcheggiaPress}
        >
          <Text style={styles.buttonTextParcheggio}>PARCHEGGIA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonParcheggio}
          onPress={handleTrovaAutoPress}
        >
          <Text style={styles.buttonTextParcheggio}>TROVA AUTO</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Conferma Parcheggio</Text>
            {onMarkerCar ? (
              <Text style={styles.modalText}>
                Attenzione: Vuoi spostare il parcheggio
              </Text>
            ) : (
              <Text style={styles.modalText}>
                Sei sicuro di voler parcheggiare?
              </Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "red" }]}
                onPress={handleCancelParcheggia}
              >
                <Text style={styles.modalButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "green" }]}
                onPress={handleConfirmParcheggia}
              >
                <Text style={styles.modalButtonText}>Conferma</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  buttonParcheggio: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonTextParcheggio: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ParcheggioButtons;
