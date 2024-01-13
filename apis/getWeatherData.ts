import axiod from "https://deno.land/x/axiod/mod.ts";

const getWeatherData = async (lat: string, lon: string, timezone: string) => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum,wind_speed_10m_max&timezone=${timezone}&forecast_days=1`;
  const response = await axiod.get(url);
  return response.data;
};

export default getWeatherData;
