const Workout = require('../models/workoutModel.js');
const mongoose = require('mongoose');


//GET all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

    const allWorkouts = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(allWorkouts);

}

//GET single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  const singleWorkout = await Workout.findById(id);

  if(!singleWorkout) {
    return res.status(404).json({ error: "No such workout" });
  }
  return res.status(202).json(singleWorkout);
}

//POST new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (!load) emptyFields.push('load');
  if (!reps) emptyFields.push('reps');
  if (emptyFields.length > 0) {
    return res.status(400).json({error: `1 or more fields empty. Please complete all.`, emptyFields})
  }
  //add to doc DB
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//DELETE single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout to delete" });
  }

  const deletedWorkout = await Workout.findOneAndDelete({ _id: id });

  if (!deletedWorkout) {
    return res.status(404).json({ error: "No such workout to delete" });
  }

  res.status(200).json(deletedWorkout);
}

//UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such workout to update" });
  }

  const updatedWorkout = await Workout.findOneAndUpdate({ _id: id }, {...req.body});

  if (!updatedWorkout) {
    res.status(400).json({ error: "No such workout to update" });
  }

  res.status(200).json(updatedWorkout);
}

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
}