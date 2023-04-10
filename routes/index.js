const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "database": 'OK',
    "server:" : "OK"
  })
});

module.exports = router;