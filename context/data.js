import React, { createContext, useContext, useState } from "react";
import * as DateHandler from "../date_handler";
import * as storage from "../storage";

// Etat initiale de nos données
const initialState = {
  // Liste des emotions selectionnées la 1ère page
  emotionsSelected: [],
  // La liste qui va contenir toutes les infos que la personne aura remplie aujourd'hui
  emotionsDetails: [],
};

// Methode de react pour créer le contexte. Ce contexte va être "propagé" à tous les components de l'app
export const DataContext = createContext();

/**
 * La structure de notre contexte. On y définit l'état global et comment on le modifie. On aura accès
 * aux méthodes et au "state". Tous ça est mis dans l'objet "value" qui va être justement "propagé"
 * à tous les components
 **/
export const DataProvider = ({ children }) => {
  /**
   *  Méthode React qui nous permet de créer un état qui peut être modifié et qui, quand on le modifie,
   *  va réactualiser les components pour qu'ils affichent les nouvelles infos
   **/
  const [state, setState] = useState({ ...initialState });

  // Methode pour ajouter l'émotion qui vient d'être selectionnée
  const addEmotions = (newEmotion) => {
    let newEmotionsSelected = [...state.emotionsSelected];
    if (newEmotionsSelected.includes(newEmotion)) {
      newEmotionsSelected = newEmotionsSelected.filter(
        (emotion) => emotion !== newEmotion
      );
    } else if (newEmotionsSelected.length < 2) {
      newEmotionsSelected.push(newEmotion);
    }
    setState({
      ...state,
      emotionsSelected: newEmotionsSelected,
    });
  };

  // Methode pour mettre ensemble l'émotion lié aux activités selectionnées (et intensité plus tard)
  const finishCompletetionEmotionDetails = (
    emotion,
    activitesSelected,
    intensite
  ) => {
    // Traitement où on va créer l'object regroupant l'emotion les activités l'intensité
    // et l'ajouter/modifier si existant au tableau
    let newEmotionsDetails = [...state.emotionsDetails];
    let indexEmotion = newEmotionsDetails.findIndex(
      (emotionDetail) => emotionDetail.name === emotion
    );
    if (indexEmotion !== -1) {
      newEmotionsDetails[indexEmotion].activitesSelected = activitesSelected;
      newEmotionsDetails[indexEmotion].intensite = intensite;
    } else {
      newEmotionsDetails.push({
        name: emotion,
        intensite: intensite,
        activitesSelected: activitesSelected,
      });
    }
    setState({
      ...state,
      emotionsDetails: newEmotionsDetails,
    });
    return newEmotionsDetails;
  };

  const saveEmotionsInStorage = async (emotionsDetails) => {
    let userEmotions = await storage.getData("userEmotions");
    if (userEmotions == null) {
      userEmotions = []
    } else {
      userEmotions = JSON.parse(userEmotions)
    }
    userEmotions.push({
      date: DateHandler.getToday(),
      emotions: emotionsDetails
    });
    await storage.setData("userEmotions", JSON.stringify(userEmotions));
    setState({
      ...state,
      emotionsSelected: [],
    });
  }

  const value = {
    state,
    addEmotions,
    finishCompletetionEmotionDetails,
    saveEmotionsInStorage
  };

  // console.log("ETAT ACTUEL DE L'APPLI:", state);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
