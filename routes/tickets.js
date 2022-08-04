var express = require('express');
var router = express.Router();

/* GET tickets listing. */
router.get('/', function(req, res, next) {
  res.send('Respond with ticket information');
});

router.post('/tickets', (req, res, next) => {
  return res.send('POST HTTP method on user resource');
});

router.put('/:ticketId', (req, res, next) => {
  return res.send(`PUT HTTP method on ticket/${req.params.ticketId} resource`);
});

router.delete('/:ticketId', (req, res, next) => {
  return res.send(`DELETE HTTP method on ticket/${req.params.ticketId} resource`);
});


module.exports = router;
