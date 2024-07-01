import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ParkingHistoryScreen = () => {
  const parkingData = [
    { id: 1, address: 'Via Benigno Crespi, 30, 20159 Milano', date: '5/30/2024', time: '13:20 - 15:33', cost: '€ 6', plate: 'ES233FK', paid: true },
    { id: 2, address: 'Via Benigno Crespi, 30, 20159 Milano', date: '5/30/2024', time: '13:20 - 15:33', cost: '€ free', plate: 'ES233FK', paid: true },
    { id: 3, address: 'Via Benigno Crespi, 30, 20159 Milano', date: '5/30/2024', time: '13:20 - 15:33', cost: '€ 10', plate: 'ES233FK', paid: true },
    { id: 4, address: 'Via Benigno Crespi, 30, 20159 Milano', date: '5/30/2024', time: '13:20 - 15:33', cost: '€ 4', plate: 'ES233FK', paid: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Storico parcheggi</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Inserisci la via del parcheggio..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome5 name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>Parcheggi recenti</Text>
        <TouchableOpacity>
          <FontAwesome5 name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.recentParkingContainer}>
          {parkingData.map(parking => (
            <View key={parking.id} style={styles.parkingItem}>
              <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Cusago-Stemma.svg/1597px-Cusago-Stemma.svg.png' }} style={styles.parkingImage} />
              <View style={styles.parkingInfo}>
                <Text style={styles.parkingAddress}>{parking.address}</Text>
                <Text style={styles.parkingDetails}>Targa: {parking.plate}</Text>
                <Text style={styles.parkingDetails}>{parking.date}</Text>
                <Text style={styles.parkingDetails}>{parking.time}</Text>
              </View>
              <Text style={[styles.parkingCost, parking.cost === '€ free' ? styles.free : styles.paid]}>{parking.cost}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Totale Spese Parcheggi :</Text>
        <Text style={styles.totalAmount}>20$</Text>
      </View>
      <View style={styles.footer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentParkingContainer: {
    marginBottom: 20,
  },
  parkingItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  parkingImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  parkingInfo: {
    flex: 1,
  },
  parkingAddress: {
    fontWeight: 'bold',
  },
  parkingDetails: {
    color: '#666',
  },
  parkingCost: {
    fontWeight: 'bold',
  },
  paid: {
    color: 'green',
  },
  free: {
    color: 'blue',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    marginTop: 10,
  },
});

export default ParkingHistoryScreen;
