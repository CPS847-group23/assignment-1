var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST shrimp bot. */
router.post('/shrimp', function(req, res, next) {
  res.json({"challenge":req.body.challenge});
});

router.post('/shrimp_echo', function(req, res, next) {
  if (req.body.text === "secret") {
    res.send("you found the secret function!");
  } else {
    res.send(req.body.text);
  }
});

module.exports = router;