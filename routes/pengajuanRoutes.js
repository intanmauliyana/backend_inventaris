const express = require('express');
const router = express.Router();
const p = require('../controllers/pengajuanController');

router.get('/', p.getAll);
router.post('/', p.create);
router.patch('/:id', p.update);
router.delete('/:id', p.remove);

router.patch('/:id/acc', p.acc);
router.patch('/:id/tolak', p.tolak);

module.exports = router;