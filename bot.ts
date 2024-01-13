import {
  Bot,
  Context,
  InlineKeyboard,
  InlineQueryResultBuilder,
} from "https://deno.land/x/grammy/mod.ts";

import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load();
const botToken = env["BOT_TOKEN"];
import getLocationData from "./apis/getCityLocation.ts";
import getWeatherData from "./apis/getWeatherData.ts";
import { LocationDataType, WeatherDataType } from "./types.ts";

const bot = new Bot(botToken);

bot.inlineQuery(/kolkata/, async (ctx: Context) => {
  const result = InlineQueryResultBuilder
    .article("id:grammy-website", "grammY", {
      reply_markup: new InlineKeyboard()
        .url("grammY website", "https://grammy.dev/"),
    })
    .text(
      `<b>grammY</b> is the best way to create your own Telegram bots.
They even have a pretty website! 👇`,
      { parse_mode: "HTML" },
    );
  await ctx.answerInlineQuery(
    [result],
    { cache_time: 30 * 24 * 3600 },
  );
});

bot.on("inline_query", (ctx: Context) => ctx.answerInlineQuery([]));

bot.command("start", async (ctx: Context) => {
  // console.log(ctx.message);
  await ctx.reply("DM open, you can go back now!", {
    reply_markup: new InlineKeyboard()
      .switchInline("Go back"),
  });
});

bot.command("weather", async (ctx: Context) => {
  // console.log(ctx.message);
  const city = ctx.message?.text?.split(" ")[1];
  if (city) {
    const locationData: LocationDataType = await getLocationData(city);
    const weatherData: WeatherDataType = await getWeatherData(
      locationData.latitude.toString(),
      locationData.longitude.toString(),
      locationData.timezone.toString(),
    );
    if (weatherData) {
      console.log(weatherData.daily.time);
    }
    const replyMsg = [
      `<b>Location: </b>${locationData.name}, ${locationData.country}`,
      `<b>Lat.Lon. : </b>${locationData.latitude}, ${locationData.longitude}`,
      `<b>Current Temp: </b> ${weatherData.current.temperature_2m} °C`,
      `<b>Today's Max Temp:</b> ${weatherData.daily.temperature_2m_max} °C`,
      `<b>Today's Min Temp:</b> ${weatherData.daily.temperature_2m_min} °C`,
      `<b>Today's Wind Speed:</b> ${weatherData.daily.wind_speed_10m_max} Km/h`,
    ].join("\n");

    ctx.reply(replyMsg, { parse_mode: "HTML" });
  } else {
    await ctx.reply("City Name is invalid!");
  }
});

// bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
