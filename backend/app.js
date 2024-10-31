const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


// Datos en memoria para almacenar tareas
let tasks = [];

// Middleware para analizar JSON
app.use(express.json());

app.use(cors());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push({ id: tasks.length + 1, task });
        res.status(201).json({ message: 'Task added!' });
    } else {
        res.status(400).json({ message: 'No task provided' });
    }
});

app.delete('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
