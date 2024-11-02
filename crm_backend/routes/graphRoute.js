const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.get('/graphs', graphController.getGraphsData);

module.exports = router;
