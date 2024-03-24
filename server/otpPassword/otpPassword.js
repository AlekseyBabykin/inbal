const axios = require("axios");

async function fetchWeather(city) {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=ddd950ec206746a698390719242003&q=${city}&aqi=no`
    );
    return response.data;
  } catch (error) {
    console.error(`Error when getting the weather for ${city}:`, error);
    return null;
  }
}

async function generate(req, res, next) {
  const weatherData = [];
  const cities = ["London", "Jerusalem", "Bangkok"];
  for (const city of cities) {
    const data = await fetchWeather(city);
    if (data) {
      weatherData.push(data.current.temp_c);
    }
  }
  return weatherData;
}

async function generateOtpPassword() {
  const array = await generate();

  const positive = array.map((i) =>
    i > 0 ? Math.round(i) : Math.round(i) * -1
  );
  const otpPasswordtemp = positive.map((i) => (i < 10 ? "0" + i : i));

  const payload = otpPasswordtemp.join("").toString();
  return payload;
}

module.exports = {
  generateOtpPassword,
};
