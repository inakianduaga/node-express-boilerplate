'use strict';

// Test routes

var express = require('express'),
    router = express.Router(),
    exampleController = require('./../controllers/example');

router.get('/', exampleController.healthCheck);

module.exports = router;
