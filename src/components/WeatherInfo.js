import React from "react";
import { Typography, Box, Paper, Slider, Grid } from "@mui/material";
import { dateBuilder } from "../utils/dateUtils";
import weatherCodes from "../config/weatherCodes";

function WeatherInfo({ weather, forecast }) {
  const {
    temperature,
    weatherCode,
    windSpeed,
    rainIntensity,
    snowDepth,
    sunriseTime,
    sunsetTime,
    cloudCover,
  } = weather;

  const weatherDescription = (weatherCode) => {
    return weatherCodes[weatherCode] || "Unknown";
  };

  const hourlyForecast = forecast.find(
    (timeline) => timeline.timestep === "1h"
  ).intervals;

  const hourlyData = hourlyForecast.slice(0, 24).map((hour) => ({
    time: new Date(hour.startTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(hour.values.temperature),
  }));

  return (
    <Box
      elevation={3}
      sx={{ padding: 3, textAlign: "center", marginBottom: 4, color: "white" }}
    >
      <Typography variant="h6" color="textSecondary">
        {dateBuilder(new Date())}
      </Typography>
      <Box mt={2}>
        <Typography variant="h1">{Math.round(temperature)}°C</Typography>
        <Typography variant="h4" color="textSecondary">
          {weatherDescription(weatherCode)}
        </Typography>
        <Typography variant="body1">Wind Speed: {windSpeed} m/s</Typography>
        {rainIntensity && (
          <Typography variant="body1">
            Rain Intensity: {rainIntensity} mm/hr
          </Typography>
        )}
        {snowDepth && (
          <Typography variant="body1">Snow Depth: {snowDepth} cm</Typography>
        )}
        <Typography variant="body1">Cloud Cover: {cloudCover}%</Typography>
        <Typography variant="body1">
          Sunrise: {new Date(sunriseTime).toLocaleTimeString()}
        </Typography>
        <Typography variant="body1">
          Sunset: {new Date(sunsetTime).toLocaleTimeString()}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">24-Hour Temperature Forecast</Typography>
        <Box
          container
          spacing={2}
          alignItems="center"
          mt={2}
          sx={{
            display: "flex",
            overflow: "auto",
            gap: "25px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {hourlyData.map((hour, index) => (
            <Grid item key={index}>
              <Typography
                variant="body2"
                align="center"
                sx={{ whiteSpace: "nowrap" }}
              >
                {hour.time}
              </Typography>
              <Typography variant="body2" align="center">
                {hour.temp}°C
              </Typography>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default WeatherInfo;
