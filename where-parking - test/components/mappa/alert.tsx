import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const Alert = () => {

  const showConfirmation = () => {
    Alert.alert(
      'Conferma',
      'Sei sicuro di voler procedere?',
      [
        {
          text: 'Annulla',
          style: 'cancel'
        },
        {
          text: 'Conferma',
          onPress: () => {
            // Azioni da eseguire se l'utente conferma
            console.log('Confermato');
            // Qui puoi inserire altre azioni da eseguire dopo la conferma
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Mostra Conferma" onPress={showConfirmation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Alert;
