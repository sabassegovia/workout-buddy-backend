const express = require('express');
const router = express.Router();
const {getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController.js');
const requireAuth = require('../middleware/requireAuth.js');

//require auth for all workout routes
router.use(requireAuth);

router.get('/', getAllWorkouts);
router.get('/:id', getSingleWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);
module.exports = router;