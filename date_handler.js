import dayjs from "dayjs";

const getToday = () => {
    const date = new Date();
    return date.getTime();
}

const parseDate = (timestamp) => {
    const date = new Date(timestamp);
    return date
}

const isToday = (date) => {
    const now = new Date();
    return (now.getFullYear() === date.getFullYear() && 
    now.getMonth() === date.getMonth() && 
    now.getDate() === date.getDate())
}

const getStringOfDay = (date = dayjs()) => {
    const monthsString = {
        0: "janvier",
        1: "février",
        2: "mars",
        3: "avril",
        4:"mai",
        5:"juin",
        6:"juillet",
        7:"août",
        8:"septembre",
        9:"octobre",
        10:"novembre",
        11:"décembre"
    }
    return `${date.date() < 10 ?  `0${date.date()}` : date.date()} ${monthsString[date.month()]} ${date.year()}`
}

export { getToday, parseDate, isToday, getStringOfDay }