const emotionsList = [{
    image: "😝",
    nom: "Plaisir",
    definition: "se sentir avoir atteint un haut degré de bien-être et de satisfaction",
    valence: "positif"
}, 
{
    image: "🤓",
    nom: "Espoir",
    definition: "ressentir de la confiance quant à réalisation de quelque chose qui nous est favorable",
    valence: "positif"

},
{
    image: "😎",
    nom: "Fierté",
    definition: "ressentir de la satisfaction à l’égard de soi-même lors de la concrétisation ou du succès d’un projet dans lequel nous sommes personnellement impliqué.e.",
    valence: "positif"
},
{
    image: "😠",
    nom: "Colère",
    definition: "ressentir une vive irritation suite à une agression, un désagrément ou une frustration",
    valence: "negatif"
},
{
    image: "😰",
    nom: "Anxiété",
    definition: "ressentir une grande inquiétude du fait de l’appréhension de quelque chose qui peut nous être défavorable",
    valence: "negatif"
},
{
    image: "😳",
    nom: "Honte",
    definition: "se sentir gêné.e du fait d’un manque de confiance en soi ou de la crainte d’avoir à subir le jugement défavorable d’autrui voire se sentir rabaissé.e ou humilié.e devant autrui",
    valence: "negatif"
},
{
    image: "😩",
    nom: "Désespoir",
    definition: "se sentir totalement découragé.e du fait de difficultés dont on ne voit pas la solution",
    valence: "negatif"
},
{
    image: "😴",
    nom: "Ennui",
    definition: "se sentir fatigué.e ou agité.e par manque d’intérêt",
    valence: "negatif"
}]

const getEmotionByName = (nom) => {
    const selectedEmotion = emotionsList.find((emotion) => emotion.nom === nom);
    return selectedEmotion
}

export default emotionsList
export { getEmotionByName }