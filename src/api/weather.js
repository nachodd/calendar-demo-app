import axios from "axios"

const API_KEY = "ec8d7f29f0df7d4f913c8928c1a343f0"

export const getWeather = ({ city, time }) =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=1&dt=${time}&appid=${API_KEY}`,
  )

export default { getWeather }
