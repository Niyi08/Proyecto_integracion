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

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
});
