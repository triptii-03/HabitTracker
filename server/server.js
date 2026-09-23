import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let habits = [
  {
    id: 1,
    name: "Drink 2L Water",
    category: "Health",
    completed: false
  },
  {
    id: 2,
    name: "Study for 2 hours",
    category: "Study",
    completed: true
  }
];


app.get("/api/habits", (req, res) => {
  res.json(habits);
});


app.post("/api/habits", (req, res) => {
  const { name, category } = req.body;

  const newHabit = {
    id: Date.now(),
    name: name,
    category: category,
    completed: false
  };

  habits.push(newHabit);

  res.status(201).json(newHabit);
});



app.put("/api/habits/:id", (req, res) => {
  const id = Number(req.params.id);

  const habit = habits.find(h => h.id === id);

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  habit.completed = true;

  res.json(habit);
});

app.delete("/api/habits/:id", (req, res) => {
  const id = Number(req.params.id);

  habits = habits.filter(habit => habit.id !== id);

  res.json({ message: "Habit deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});