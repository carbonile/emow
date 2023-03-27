import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Share } from "react-native";
import colors from "../colors";
import * as storage from "../storage"
import dayjs from "dayjs";
import { getStringOfDay } from "../date_handler";
import { parseDate, isToday } from "../date_handler";

export default function Bilan({ navigation }) {
  const [userEmotions, setUserEmotions] = useState(null);
  const [isAlreadyFilled, setIsAlreadyFilled] = useState(null)

  useEffect(() => {
    async function Mafonction (){
      const userEmotionsStored = JSON.parse(await storage.getData("userEmotions"));
    const sourceOfData = userEmotionsStored // fakeUserEmotions ou userEmotionsStored pour tester
    setUserEmotions(prepareUserEmotions(sourceOfData))

    try {
      const lastUserEmotion = userEmotionsStored[userEmotionsStored.length - 1];
      setIsAlreadyFilled(isToday(parseDate(lastUserEmotion.date)))
      } catch (error) {
        setIsAlreadyFilled(false)
      }
    } Mafonction();
  }, [])

  const prepareUserEmotions = (data) => {
    const now = dayjs().unix() + 100;
    const tenDaysBefore = dayjs().subtract(10, "day").unix()
    const filtered = data.filter(userEmotion => {
      //On prend les données entre le moment maintenant à la seconde prêt et 10 jours avant (de jour -10 à jour 0)
      return userEmotion.date / 1000 > tenDaysBefore && userEmotion.date / 1000 < now
    })
    let frequencyEmotionNumber = 0;
    let frequencyEmotion = [];
    const countEmotion = {};
    filtered.forEach(userEmotion => {
      userEmotion.emotions.forEach(emotion => {
        countEmotion[emotion.name] = {
          name: emotion.name,
          times: countEmotion[emotion.name]?.times ? countEmotion[emotion.name].times + 1 : 1,
          activites: countEmotion[emotion.name]?.activites ? [...countEmotion[emotion.name].activites, ...emotion.activitesSelected] : [...emotion.activitesSelected]
        } 
      })
    })
    Object.entries(countEmotion).forEach(([name, emotion]) => {
      if (emotion.times > frequencyEmotionNumber) {
        frequencyEmotion = [emotion];
        frequencyEmotionNumber = emotion.times;
      } else if (emotion.times === frequencyEmotionNumber) {
        frequencyEmotion = [...frequencyEmotion, emotion]
      }
    })
    let maxIntensityNumber = 0
    let maxIntensityNames = [];
    filtered.forEach(userEmotion => {
      userEmotion.emotions.forEach(emotion => {
        if (emotion.intensite > maxIntensityNumber) {
          maxIntensityNumber = emotion.intensite;
          maxIntensityNames = [emotion.name];
        } else if (emotion.intensite == maxIntensityNumber) {
          if (maxIntensityNames.includes(emotion.name) === false) {
            maxIntensityNames.push(emotion.name)
          }
        }
      })
    })
    return {countEmotion: frequencyEmotion, maxIntensityNames, maxIntensityNumber}
  }

  if (userEmotions === null) {
    return null
  }

  const onPressShare = () => {
    let message = `Ces 10 derniers jours, j'ai ressenti le plus fréquemment\r\n ${userEmotions.countEmotion.map(emotion => `L'émotion ${emotion.name} ${emotion.times} fois. Elle est liée aux activités suivantes:\r\n${emotion.activites.map(activite => `- ${activite + "\r\n"}`).join("")}\n`)}`
    message += `J'ai le plus intensément ressenti ${userEmotions.maxIntensityNames.map((name, index, array) => `l'émotion ${name} avec une intensité de ${userEmotions.maxIntensityNumber}${(array.length >= 3 && index < array.length - 2) ? "," : index < array.length - 1 ? " et " : "."}`)}`
    Share.share({message})
  }

  const onPressNextPage = () => navigation.push("Emotions")

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Du {getStringOfDay(dayjs().subtract(10, "days"))} au {getStringOfDay(dayjs())}
      </Text>
      <Text style={styles.subtitle}>
        Ces 10 derniers jours, tu as ressenti le plus fréquemment:{"\r\n\r\n"}
        {userEmotions.countEmotion.map(emotion => <><Text>{"\r\n"}L'émotion <Text style={{fontWeight: "bold"}}> {emotion.name} </Text><Text>{emotion.times} fois. </Text> Elle est liée aux activités suivantes : {"\r\n\r\n"}</Text>{emotion.activites.map(activite => <Text>- {activite + "\r\n"}</Text>)}</>)} 
        {"\r\n\r\n"}
        
      </Text>
      <Text style={styles.subtitle}>
        Tu as le plus intensément ressenti {userEmotions.maxIntensityNames.map((name, index, array) => <><Text>l'émotion</Text><Text style={{fontWeight: "bold"}}> {name} </Text><Text>avec une intensité de {userEmotions.maxIntensityNumber}{(array.length >= 3 && index < array.length - 2) ? "," : index < array.length - 1 ? " et " : "."}</Text></>)}
      </Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPressShare}>
        <Text style={styles.buttonText}>Partager ✉</Text>
      </TouchableOpacity>
      {!isAlreadyFilled && <TouchableOpacity style={styles.button} onPress={onPressNextPage}>
        <Text style={styles.buttonText}>Questionnaire</Text>
      </TouchableOpacity>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: "#555",
    fontFamily: "sans-serif-light",
    paddingBottom: 20
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    fontFamily: "sans-serif-light",
    paddingBottom: 10,
    textAlign: "justify"
  },
  container: {
    padding: 20,
    minHeight: "24%",
    backgroundColor: "#ecf8fe",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    //width: 0,
    //height: 70,
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
    fontSize: 18,
    //fontWeight: "bold"
    fontFamily: "sans-serif-light"
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-end"
  },
});
