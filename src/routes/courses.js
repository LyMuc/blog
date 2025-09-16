const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);
router.get('/:id/update', courseController.update);
router.post('/handle-action', courseController.handleAction);
router.put('/:id', courseController.edit);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);

module.exports = router;
