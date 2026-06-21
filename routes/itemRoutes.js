const express = require('express');
const router = express.Router();
const item = require('../controllers/itemController');

router.get('/', item.getItems);
router.post('/', item.createItem);

module.exports = router;