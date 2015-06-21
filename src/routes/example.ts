'use strict';

// Test routes
import express = require('express');
import exampleController = require('../controllers/example');

var router = express.Router();
router.get('/', exampleController.healthCheck);

export = router;
