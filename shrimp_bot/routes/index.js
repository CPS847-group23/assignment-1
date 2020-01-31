let express = require('express');
let router = express.Router();
let request = require('request');
const shrimp = require('../config/shrimp_config');
const shrimp_id = shrimp.id;
const hook_url = shrimp.hook_url;
const owmkey = shrimp.owm_apikey;
let temp_weather = '{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST shrimp bot. */
router.post('/shrimp', function(req, res, next) {
  if (req.body.challenge) res.json({"challenge":req.body.challenge});
  let user_id = req.body.event.user;
  let user_msg = req.body.event.text;
  user_msg = user_msg.split("<@"+shrimp_id+">")[1];
  let reply_msg = {json: {"text": "<@" + user_id + "> "}};

  if (is_city(user_msg)) {
    let city = "toronto"; // TODO; use logic to fill this in
    let api_url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + owmkey;
    request.get(
      api_url,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          reply_msg.json.text += JSON.stringify(response);
          request.post(
            hook_url,
            reply_msg,
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
              }
            }
          );
          console.log("sent request");
        }
        else {
          console.log("error: " + error);
        }
      }
    );
  } else {
    if (user_msg.includes("secret")) {
      reply_msg.json.text += " you found the secret!!";
    } else {
      reply_msg.json.text += user_msg;
    }
    request.post(
        hook_url,
        reply_msg,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
  }
  res.json({"message":"okay"});
});

router.post('/shrimp_echo', function(req, res, next) {
  if (req.body.text === "secret") {
    res.send("you found the secret function!");
  } 
  else if (req.body.text === "hi" || req.body.text === "hello" || req.body.text === "hola") {
  	res.send("sup brew ~_*");
  }
  else if (req.body.text === "bye") {
  	res.send("farewell");
  }
  else {
    res.send(req.body.text);
  }
});
function is_city(text) {
  return true;
}
module.exports = router;