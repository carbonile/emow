import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import emotionsList from "../data/emotionsList";

export default function Definitions({ navigation }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.bodyText}>
        {emotionsList.map((emotionItem) => (
            `${emotionItem.nom} ${emotionItem.image} : ${emotionItem.definition}\n\n`
          ))}     
        </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#555",
    fontFamily: "sans-serif-light",
  },
  bodyText: {
    fontSize: 17.5,
    color: "#555",
    fontFamily: "sans-serif-light",
    textAlign: "justify"
  },
  container: {
    padding: 20,
    backgroundColor: "#ecf8fe"
  }
});
