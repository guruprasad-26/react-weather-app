import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import weatherCodes from "../config/weatherCodes";
import { dateBuilder } from "../utils/dateUtils";

function WeatherForecast({ forecast }) {
  const dailyForecast = forecast.find(
    (timeline) => timeline.timestep === "1d"
  ).intervals;

  const weatherDescription = (weatherCode) => {
    return weatherCodes[weatherCode] || "Unknown";
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        weather Forecast
      </Typography>
      <Grid container spacing={2}>
        {dailyForecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box
              elevation={2}
              sx={{
                padding: 2,
                textAlign: "center",
                color: "white",
                border: "2px solid white",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">
                {dateBuilder(new Date(day.startTime))}
              </Typography>
              <Typography variant="body1">
                {weatherDescription(day.values.weatherCode)}
              </Typography>
              <Typography variant="body1">
                Temperature: {Math.round(day.values.temperature)}°C
              </Typography>
              <Typography variant="body1">
                Wind Speed: {day.values.windSpeed} m/s
              </Typography>
              {day.values.rainIntensity && (
                <Typography variant="body1">
                  Rain Intensity: {day.values.rainIntensity} mm/hr
                </Typography>
              )}
              {day.values.snowDepth && (
                <Typography variant="body1">
                  Snow Depth: {day.values.snowDepth} cm
                </Typography>
              )}
              <Typography variant="body1">
                Cloud Cover: {day.values.cloudCover}%
              </Typography>
              <Typography variant="body1">
                Sunrise: {new Date(day.values.sunriseTime).toLocaleTimeString()}
              </Typography>
              <Typography variant="body1">
                Sunset: {new Date(day.values.sunsetTime).toLocaleTimeString()}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default WeatherForecast;
