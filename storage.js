import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      //console.log(e)
      // saving error
    }
}

const getData = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key)
      return value;
    } catch (e) {
      return undefined;
    }
}

export { setData, getData }