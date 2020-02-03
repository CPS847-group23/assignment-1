import re
from slackclient import SlackClient

# credentials = 
# # CPS-847-Bot Slack
# BOT_TOKEN = credentials
# WEATHER_API_TOKEN = credentials

client = slack.WebClient(BOT_TOKEN, timeout=30)
weather_url = 'api.openweathermap.org/data/2.5/weather?q=' #+{city name}

RTM_READ_DELAY = 1 # 1 second delay between reading from RTM
MENTION_REGEX = "^<@(|[WU].+?)>(.*)"
bot_id = None

def weather(city):
	#example: https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
	weather_city_url = weather_url + city + "&appid=" + WEATHER_API_TOKEN
	response = requests.get(weather_city_url)
	json_res = response.json()

	if json_res.status_code == 200:
		city = json_res['name']
		temp = round(json_res['name']['temp'] - 273, 1)
		humidity = json_res['name']['humidity']
	else:
		return None

	return str(city), str(temp), str(humidity)


def parse_bot_commands(slack_events):
 
    for event in slack_events:
    	#print(event)
        if event["type"] == "message" and not "subtype" in event:
            user_id, message = parse_direct_mention(event["text"])
            print(message)
            if user_id == bot_id:
                return message, event["channel"]
    return None, None


def parse_direct_mention(message_text):

    matches = re.search(MENTION_REGEX, message_text)
    return (matches.group(1), matches.group(2).strip()) if matches else (None, None)


if __name__ == "__main__":
    if slack_client.rtm_connect(with_team_state=False):
        print("Shrimpys_lil_bro connected and running!")
        starterbot_id = slack_client.api_call("auth.test")["user_id"]
        while True:
            command, channel = parse_bot_commands(slack_client.rtm_read())

            if command:
                client.api_call (
                #     "chat.postMessage",
                #     text=command,
                #     channel=channel
                #     )
                # if != None
                	client.chat_postEphemeral(
  					channel=channel,
  					text="Hello silently from your app! :tada:",
  					user=user
  					)
)
            # else:
            # 	city, temp, hum = weather(command):

            # 		)

            time.sleep(RTM_READ_DELAY)
    else:
        print("Connection failed. Exception traceback printed above.")