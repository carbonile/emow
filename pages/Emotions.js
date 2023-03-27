import React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from "react-native";
import colors from "../colors";
import Emotion from "../components/Emotion";
import { useDataContext } from "../context/data";
import emotionsList from "../data/emotionsList";

export default function Emotions({ navigation }) {
  const { state, addEmotions } = useDataContext();

  const emotionsSelected = state.emotionsSelected;

  const onPressNextPage = () => {
    navigation.navigate("Activites", { currentEmotion: emotionsSelected[0] });
  };

  const onPressBilan = () => {
    navigation.push("Bilan")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Quelles sont les deux émotions que tu as le plus ressenti aujourd'hui ?
      </Text>
      {emotionsList.map((emotionItem, index) => (
        <Emotion
          key={index}
          isSelected={emotionsSelected.includes(emotionItem.nom)}
          onPress={addEmotions}
          image={emotionItem.image}
          nom={emotionItem.nom}
        />
      ))}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPressBilan}>
        <Text style={styles.buttonText}>📋</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressNextPage}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#555",
    fontFamily: "sans-serif-light",
  },
  container: {
    padding: 20,
    backgroundColor: "#ecf8fe",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    //paddingVertical: 24,
    //paddingHorizontal: 25,
    width: 70,
    height: 70,
    //width: "%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: colors.selectedItemColor,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
 
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
