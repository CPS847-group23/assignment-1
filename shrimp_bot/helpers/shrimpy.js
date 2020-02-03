// shrimpy.js
let request = require('request');
const shrimp_config = require('../config/shrimp_config');
const shrimp_id = shrimp_config.id;
const hook_url = shrimp_config.hook_url;
const owmkey = shrimp_config.owm_apikey;
const kelvin = 273.15;

/* Handle non-challenge request */
let handle = (req) => {
  let user_id = req.body.event.user;
  let user_msg = req.body.event.text;
  user_msg = user_msg.split("<@"+shrimp_id+">")[1];
  let reply_msg = {json: {"text": "<@" + user_id + "> "}};

  if (is_city(user_msg)) {
    weather_reply(user_msg, reply_msg);
  } else {
    echo_reply(user_msg, reply_msg);
  }
}

/* Send a reply on Slack */
let slack_reply = (reply_msg) => {
  request.post(
      hook_url,
      reply_msg,
      (error, response, body) => {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );
}

/* Handle a weather message */
let weather_reply = (user_msg, reply_msg) => {
  let city = user_msg.trim();
  let api_url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + owmkey;
  request.get(
    api_url,
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let a = JSON.parse(response.body),
            temp = celcius(a.main.temp),
            humidity = a.main.humidity,
            temp_min = celcius(a.main.temp_min),
            temp_max = celcius(a.main.temp_max),
            temp_weather = "The current temperature in " + city + " is: " + temp + "C; the daily high and low is " + temp_max + "C and " + temp_min + "C, respectively. The humidity is: " + humidity;

        reply_msg.json.text += temp_weather;
        slack_reply(reply_msg);
      } else {
        /* City not found, just echo the message */
        console.log("error: " + error);
        echo_reply(user_msg, reply_msg);
      }
    }
  );
}

let echo_reply = (user_msg, reply_msg) => {
  console.log("echoing: "+ user_msg);
  if (user_msg.includes("secret")) {
    reply_msg.json.text += "you found the secret function!";
  } else if (user_msg.trim() === "hi" || user_msg.trim() === "hello" || user_msg.trim() === "hola") {
    reply_msg.json.text += "sup brew ~_*";
  } else if (user_msg.trim() === "bye") {
    reply_msg.json.text += "farewell";
  } else {
    reply_msg.json.text += user_msg;
  }
  slack_reply(reply_msg);
}

let celcius = (temp) => {
  return Math.round(temp - kelvin, 1);
}

let is_city = (text) => {
  return true;
}

module.exports = {
  handle
}
