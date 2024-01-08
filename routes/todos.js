const router = require("express").Router();
const Todos = require("../models/todos");

// get user todos
router.get("/", async (req, res) => {
  try {
    const { user_id } = req.user;

    const todos = await Todos.find({ user_id });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create todo
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const { user_id } = req.user;
    if (!user_id || !name) {
      return res
        .status(400)
        .json({ error: "user_id or name is required in the body" });
    }

    const newTodo = new Todos({
      user_id,
      name,
    });

    const todo = await newTodo.save();

    res.status(201).json({
      message: "Todo successfully added",
      todo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update todo
router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todos.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Todo successfully updated",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Todo successfully deleted",
      deletedTodo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
