import telebot,requests,math
from icons import icons
from creds import BOT_TOKEN,api_address

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, f'''Hi👋, I am weather Bot, Thanks for starting me on,🛡️Build by <a href='tg://user?id=759684783'>DҽႦιρɾαʂαԃ</a>.''',parse_mode = "HTML")
    
@bot.message_handler(commands=["help"])
def send_help(message):
    bot.reply_to(message, f"Ex: `/weather Kolkata`",parse_mode = "MARKDOWN")

@bot.message_handler(commands=["weather"])
def send_weather(message):
    city = telebot.util.extract_arguments(message.text)
    if not city:
        bot.reply_to(message, "Please Enter a City!🙂")
    
    else:
        print("searching🌪️ for weather of🌞",city)
        if city == 0:
            bot.reply_to(message, "Weather not found!😅")

        elif city != 0:
            url = api_address + city
            json_data = requests.get(url).json()
            error_code = json_data['cod']
            
            if error_code == 200:
                city_name = json_data['name']
                
                weather_data = json_data['weather'][0]['main']

                wind_speed = json_data['wind']['speed']
                icon = json_data['weather'][0]['icon']

                formatted_data = json_data['main']['temp']
                temp_data = formatted_data - 273.15
                temp_data2 = math.floor(temp_data)
                temp = str(temp_data2)+"°C"


                for i in icons.keys():
                    if i==icon:                                         weather_icon = icons[i]
          
                bot.reply_to(message, f'''🔹<i> The  Weather 🌍 of <b> {city_name} </b> is  :<b> {weather_data} </b> {weather_icon} \n🔹 The Temperature 🌡️ is Approx : <b>{temp} </b> \n🔹 The Wind 💨 Speed is : <b> {wind_speed}  Km/h</b> </i>''',parse_mode = "HTML")
                
                print("Request Successful 🤟")
            else:
                bot.reply_to(message,"City Not Found!😞 \nPlease Enter a Valid City.🙂")
        else:
            bot.reply_to(message,"Somethings goes wrong!😢")
    


bot.polling()
