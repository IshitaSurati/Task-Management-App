const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { authMiddleware, protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/tasks', authMiddleware, roleMiddleware('admin'), createTask);
router.get('/tasks', protect, getTasks);  

module.exports = router;
