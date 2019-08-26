import axios from "axios"

const API_KEY = "ec8d7f29f0df7d4f913c8928c1a343f0"

export const getWeather = async ({ city, time }) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${city}&dt=${time}&cnt=1&units=metric`,
    )
    // const temp = _.get(res, "data.main.temp", null)
    const tempMin = _.get(res, "data.main.temp_min", null)
    const tempMax = _.get(res, "data.main.temp_max", null)
    const desc = _.get(res, "data.weather[0].main", null)
    const icon = _.get(res, "data.weather[0].icon", null)

    if (tempMin && tempMax && desc && icon) {
      const iconUrl = `http://openweathermap.org/img/w/${icon}.png`
      return { desc, iconUrl, tempMin, tempMax }
    }
    return null
  } catch (ex) {
    console.log("Could not get weather: " + ex)
    return null
  }
}

export default { getWeather }
