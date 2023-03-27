import React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import colors from "../colors";
import * as storage from "../storage"

export default function FirstTime({ navigation }) {

  const onPress = async () => {
    await storage.setData("isAlreadyOpened", "true");
    navigation.navigate("Emotions");
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
      Parce qu’une émotion, c’est une information pour mieux apprendre !
        </Text>
        <Text style={styles.bodyText}>
        {`Les recherches montrent que vos émotions ont un réel impact sur la façon dont vous apprenez et également sur votre réussite académique.\n
EMOW est une application conçue dans le but de vous aider à prendre conscience des émotions que vous ressentez lorsque vous étudiez.\n   
Utilisée chaque jour, EMOW vous permet d’exprimer vos émotions et d’identifier les activités qui les ont générés.\n 
Tous les 10 jours, EMOW vous aide à faire le bilan de vos émotions et vous propose des conseils pour mieux les réguler.\n
Avec EMOW, vous développez des compétences émotionnelles pour mieux apprendre et réussir dans vos études.\n`}
        </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>C'est parti !</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#555",
    fontFamily: "sans-serif-light",
  },
  bodyText: {
    fontSize: 17.5,
    color: "#555",
    fontFamily: "sans-serif-light",
    paddingTop: 10
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf8fe",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: 60,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    backgroundColor: colors.itemColor,
  },
  buttonText: {
    color: "#555",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif-light"
  },
});
