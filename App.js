import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Emotions from "./pages/Emotions";
import PageActivites from "./pages/PageActivites";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DataProvider } from "./context/data";
import colors from "./colors";
import Definitions from "./pages/Definitions";
import * as storage from './storage';
import FirstTime from "./pages/FirstTime";
import Bilan from "./pages/Bilan";
import { parseDate, isToday } from "./date_handler";

const Stack = createStackNavigator();

const commonNavigationOptions = {
headerBackTitle: " ",
headerStyle: {
  backgroundColor: colors.headerColor,
  height: 100,
},
headerTintColor: "#fff",
headerTitleStyle: {
  paddingTop: Platform.OS === "ios" ? 25 : 0,
  fontSize: 24,
  flex: 1,
}
};

export default function App() {
  const [isAlreadyOpened, setIsAlreadyOpened] = useState("not-initalized")
  const [isAlreadyFilled, setIsAlreadyFilled] = useState(null)

  useEffect(() => {
    async function MaFonction()
        {const isAO = await storage.getData("isAlreadyOpened");
      setIsAlreadyOpened(isAO !== undefined ? Boolean(isAO): undefined)
      try {
      const userEmotionsStored = JSON.parse(await storage.getData("userEmotions"));
      const lastUserEmotion = userEmotionsStored[userEmotionsStored.length - 1];
      setIsAlreadyFilled(isToday(parseDate(lastUserEmotion.date)))
      } catch (error) {
        setIsAlreadyFilled(false)
        }
    } 
    MaFonction();
  });

  if (isAlreadyOpened === "not-initalized" || isAlreadyFilled === null) {
    return null;
  }

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAlreadyOpened === true ? isAlreadyFilled === true ? "Bilan" : "Emotions" : "FirstTime"}>
          <Stack.Screen
            name="Emotions"
            component={Emotions}
            options={{
              ...commonNavigationOptions,
              title: "Bonjour", // bonjour mettre le titre en premiere page,
              headerRight: () => {
                const navigation = useNavigation();
                return <TouchableOpacity onPress={() => navigation.navigate("Definitions")}><Text style={styles.interroText}>🔎</Text></TouchableOpacity>
              }
            }}
          />
          <Stack.Screen
            name="Activites"
            component={PageActivites}
            options={{
              ...commonNavigationOptions,
              title: "Bonjour!"
            }}
          />
           <Stack.Screen
            name="Definitions"
            component={Definitions}
            options={{
              ...commonNavigationOptions,
              title: "Dictionnaire",
            }}
          />
          <Stack.Screen
            name="FirstTime"
            component={FirstTime}
            options={{
              ...commonNavigationOptions,
              title: "Bonjour!"
            }}
          />
          <Stack.Screen
            name="Bilan"
            component={Bilan}
            options={{
              ...commonNavigationOptions,
              title: "Bilan",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  interroText: {
    color: "white",
    fontWeight: "300",
    fontSize: 24,
    marginRight: 10,
    padding: 10
  }
});
