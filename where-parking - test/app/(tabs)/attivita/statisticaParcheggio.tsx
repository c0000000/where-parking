
import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';


const data = {
  labels: ["20", "21", "22", "23", "24"],
  datasets: [
    {
      data: [6, 0, 10, 4, 8],
      color: () => `#7b00ff`, 
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForLabels: {
    fontSize: 10
  },
  propsForVerticalLabels: {
    fontSize: 10
  },
  propsForBackgroundLines: {
    stroke: "#e3e3e3"
  }
};

const StatisticsScreen = () => {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.titolo}>
      <Text style={styles.title}>Le tue statistiche della città x</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Inserisci la città..." />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      <Text>Tempo totale: 15h</Text>
      <Text>Costo totale parcheggi: 20€ </Text>
      <View>
      <Text style={styles.col}>2024 Gennaio</Text>
      </View>
      <BarChart
        data={data}
        width={355}
        height={400}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  titolo: {
    padding: 15,
    paddingBottom: -5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  searchIcon: {
    fontSize: 20
  },
  chart: {
    marginVertical: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0f4c81',
  },
  col: {
    textAlign: "center",
    padding: 15,
    backgroundColor: "#0080ff",
    borderRadius: 10,
    width: 90
  }
});

export default StatisticsScreen;