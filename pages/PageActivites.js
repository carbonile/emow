import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import colors from "../colors";
import Activite from "../components/Activite";
import { useDataContext } from "../context/data";
import activitesList from "../data/activitesList";
import { getEmotionByName } from "../data/emotionsList";
import Slider from '@react-native-community/slider';

export default function Activites({ route, navigation }) {
  const {
    state,
    finishCompletetionEmotionDetails,
    saveEmotionsInStorage
  } = useDataContext();
  const [ActivitesSelected, setActivitesSelected] = useState([]);
  const [intensite, setIntensite] = useState(1);
  const currentEmotion = route.params.currentEmotion;

  useEffect(() => {
    const selectedEmotion = getEmotionByName(currentEmotion)
    navigation.setOptions({
      title: `${selectedEmotion.nom} ${selectedEmotion.image}`,
    });
  }, []);

  const onPressActivite = (newActivite) => {
    let newActivitesSelected = [...ActivitesSelected];
    if (newActivitesSelected.includes(newActivite)) {
      newActivitesSelected = newActivitesSelected.filter(
        (Activite) => Activite !== newActivite
      );
    } else {
      newActivitesSelected.push(newActivite);
    }
    setActivitesSelected(newActivitesSelected);
  };

  const onPressNextPage = async () => {
    // On appelle la fonction pour enregistrer les données remplis par l'utilisateur
    // et pour avoir la nouvelle émotion prête pour le nouvel écran
    const emotionsDetails = finishCompletetionEmotionDetails(currentEmotion, ActivitesSelected, intensite);
    // Petite vérification de l'émotion pour savoir qu'est ce qu'on fait l'étape suivante
    const index = state.emotionsSelected.indexOf(currentEmotion);
    if (index < state.emotionsSelected.length - 1) {
      navigation.push("Activites", {
        currentEmotion: state.emotionsSelected[index + 1],
      });
    } else {
      // Cas où on est sur la dernière
      await saveEmotionsInStorage(emotionsDetails);
      setTimeout(() => navigation.push("Bilan"), 100);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Avec quelle intensité as-tu ressenti cette émotion ?
      </Text>
      <View style={styles.intensiteContainer}>
  <Text style={{fontSize: 20, marginLeft: 20, marginRight: 10}}>{intensite}</Text>
        <Slider
      style={{width: "90%", height: 60, marginRight: 20}}
      minimumValue={1}
      maximumValue={7}
      step={1}
      value={intensite}
      onValueChange={newValue => setIntensite(newValue)}
      minimumTrackTintColor= "black"
      maximumTrackTintColor="#000000"
      thumbTintColor={colors.itemColor}
    /></View>
      <Text style={styles.title}>
        Dans quelles activités as-tu ressenti cette émotion ?
      </Text>
      {activitesList.map((ActiviteItem) => (
        <Activite
          isSelected={ActivitesSelected.includes(ActiviteItem.question)}
          onPress={onPressActivite}
          question={ActiviteItem.question}
        />
      ))}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPressNextPage}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#555",
    fontFamily: "sans-serif-light",
  },
  container: {
    padding: 20,
    backgroundColor: "#ecf8fe",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    //fontFamily: "sans-serif-light"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  intensiteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
