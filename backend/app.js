const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');
const app = express();
const PORT = 5000;

// Configuración de Sentry con el DSN directamente
Sentry.init({ dsn: 'https://e5c999808d27522ce7b0a93d2245c182@o4508378683670528.ingest.us.sentry.io/4508378686619648' }); // Reemplaza con tu DSN de Sentry

// Datos en memoria para almacenar tareas
let tasks = [];

// Middleware de Sentry para capturar errores globales
app.use(Sentry.Handlers.requestHandler());

// Middleware para analizar JSON
app.use(express.json());
app.use(cors());

// Rutas
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

// Middleware de Sentry para manejar errores
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
