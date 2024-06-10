import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import {
  fetchWeather,
  fetchForecast,
  fetchCoordinates,
} from "../services/weatherService";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import "../App.css";
import weatherCodes from "../config/weatherCodes";

const DEFAULT_LOCATION = "Hyderabad";

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeatherData(DEFAULT_LOCATION);
  }, []);

  const getWeatherData = async (location) => {
    setLoading(true);
    setError("");
    try {
      const coords = await fetchCoordinates(location);
      const weatherData = await fetchWeather(coords.lat, coords.lon);
      const forecastData = await fetchForecast(coords.lat, coords.lon);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    getWeatherData(query || DEFAULT_LOCATION);
  };

  return (
    <Box
      className={`app ${
        weather.temperature > 18
          ? "hot"
          : weatherCodes[weather.weatherCode] === "Cloudy"
          ? "cloud"
          : weatherCodes[weather.weatherCode] === "Rain"
          ? "rain"
          : "cold"
      }`}
      //   maxWidth="xl"
    >
      <main>
        <SearchBar query={query} setQuery={setQuery} search={search} />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                "& .MuiCircularProgress-circle": {
                  color: "white",
                },
              }}
            />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          <>
            {weather.temperature && (
              <WeatherInfo weather={weather} forecast={forecast} />
            )}
            {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
          </>
        )}
      </main>
    </Box>
  );
}

export default WeatherApp;
