import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import colors from '../colors';

export default function Emotion({isSelected, image, nom, onPress}) {
  return (
    <Pressable onPress={() => onPress(nom)} style={[styles.container, isSelected && styles.containerIsSelected]}>
        <Text style={styles.image}>{image}</Text>
      <Text style={styles.nom}>{nom}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "36%",
    padding: 12,
    margin: 18,
    backgroundColor: colors.itemColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  containerIsSelected: {
    backgroundColor: colors.selectedItemColor,
  },
  image: {
    fontSize: 35
  },
  nom: {
      fontSize: 17,
      fontFamily: 'sans-serif-light',
      color: "#fff",
  }
});
