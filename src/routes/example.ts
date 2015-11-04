'use strict';

// Test routes
import { Router } from 'express';
import { healthCheck } from '../controllers/example';

let router = Router();
router.get('/', healthCheck);

export = router;
