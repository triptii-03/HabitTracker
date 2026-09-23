import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

 
  useEffect(() => {
    fetch("http://localhost:5000/api/habits")
      .then((response) => response.json())
      .then((data) => {
        setHabits(data);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
      });
  }, []);

 
  const markDone = async (id) => {
    await fetch(`http://localhost:5000/api/habits/${id}`, {
      method: "PUT",
    });

    const response = await fetch("http://localhost:5000/api/habits");
    const data = await response.json();

    setHabits(data);
  };

  
  const deleteHabit = async (id) => {
    await fetch(`http://localhost:5000/api/habits/${id}`, {
      method: "DELETE",
    });

    const response = await fetch("http://localhost:5000/api/habits");
    const data = await response.json();

    setHabits(data);
  };

 
  const addHabit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        category: category,
      }),
    });

    const response = await fetch("http://localhost:5000/api/habits");
    const data = await response.json();

    setHabits(data);
    setName("");
    setCategory("");
  };

  return (
    <div className="container">
      <form onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Add Habit</button>
      </form>

      <h1>My Habits</h1>

      {habits.map((habit) => (
        <div className="habit-item" key={habit.id}>
          <div>
            <h3>{habit.name}</h3>
            <p>{habit.category}</p>
          </div>

          <button onClick={() => markDone(habit.id)}>
            {habit.completed ? "Completed" : "Mark Done"}
          </button>

          <button onClick={() => deleteHabit(habit.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;