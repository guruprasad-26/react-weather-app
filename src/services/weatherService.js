const api = {
  openWeatherKey: "98ec8bed3b2a4d6eaef52a8eda7a0353",
  key: "TOvJos2sAFDXJ6DATJRTwTFoGv9U5tNk",
  base: "https://api.tomorrow.io/v4/timelines",
};

const fields =
  "temperature,weatherCode,windSpeed,rainIntensity,snowDepth,sunriseTime,sunsetTime,cloudCover";

export const fetchCoordinates = async (query) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.openWeatherKey}`
  );
  const result = await res.json();
  if (result.length === 0) {
    throw new Error("Location not found");
  }
  return { lat: result[0].lat, lon: result[0].lon };
};

export const fetchWeather = async (lat, lon) => {
  const res = await fetch(
    `${api.base}?location=${lat},${lon}&fields=${fields}&timesteps=1d&units=metric&apikey=${api.key}`
  );
  const result = await res.json();
  if (!result.data || result.data.timelines.length === 0) {
    throw new Error("Unable to fetch weather data");
  }
  return result.data.timelines[0].intervals[0].values;
};

export const fetchForecast = async (lat, lon) => {
  const res = await fetch(
    `${api.base}?location=${lat},${lon}&fields=${fields}&timesteps=1d,1h&units=metric&apikey=${api.key}`
  );
  const result = await res.json();
  if (!result.data || result.data.timelines.length === 0) {
    throw new Error("Unable to fetch forecast data");
  }
  return result.data.timelines;
};
