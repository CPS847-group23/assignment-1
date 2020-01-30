let express = require('express');
let router = express.Router();
let request = require('request');
const shrimp = require('../config/shrimp_config');
const shrimp_id = shrimp.id;
const hook_url = shrimp.hook_url;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST shrimp bot. */
router.post('/shrimp', function(req, res, next) {
  let user_id = req.body.event.user;
  let user_msg = req.body.event.text;
  user_msg = user_msg.split("<@"+shrimp_id+">")[1];
  let reply_msg = {json: {"text": "<@" + user_id + "> "}};
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
  res.json({"challenge":req.body.challenge});
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

module.exports = router;