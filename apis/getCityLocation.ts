import axiod from "https://deno.land/x/axiod/mod.ts";

const getLocationData = async (cityName: string) => {
  const res = await axiod.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&language=en&format=json`,
  );
  return res.data.results[0];
};

export default getLocationData;
