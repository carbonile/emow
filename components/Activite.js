import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import colors from '../colors';

export default function Activite({isSelected, question, onPress}) {
  return (
    <Pressable onPress={() => onPress(question)} style={[styles.container, isSelected && styles.containerIsSelected]}>
      <Text style={styles.question}>{question}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    margin: 2,
    backgroundColor: colors.itemColor,
    borderRadius: 14,
    flexDirection: "column"
  },
  containerIsSelected: {
    backgroundColor: colors.selectedItemColor,
  },
  question: {
      fontSize: 16.5,
      fontFamily: 'sans-serif-light',
      color: "#fff"
  }
});
