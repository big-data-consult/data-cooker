const express = require('express');

const router = express.Router();

/* GET current user. */
router.get('/', function (req, res) {
	res.redirect('/respapi/targets');
});

module.exports = router;
