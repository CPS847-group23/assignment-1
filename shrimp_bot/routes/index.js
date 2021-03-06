let express = require('express');
let router = express.Router();
const shrimpy = require('../helpers/shrimpy');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Shrimpy' });
});

/* POST shrimp bot. */
router.post('/shrimp', (req, res, next) => {
  if (req.body.challenge) {
    /* If this is a challenge, respond accordingly */
    res.json({"challenge":req.body.challenge});
  } else {
    /* If not a challenge, respond accordingly */
    shrimpy.handle(req);
    res.json({"message":"okay"});
  }
});

module.exports = router;