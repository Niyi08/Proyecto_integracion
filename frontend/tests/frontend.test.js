// frontend/tests/frontend.test.js
import { addTask, fetchTasks } from '../src/script';  // Asegúrate de ajustar las rutas de importación
import { server } from './mocks/server';  // Configura MSW para simular las respuestas de la API
import { rest } from 'msw';

// Configuración de MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Frontend Task Manager', () => {
    it('should add a new task', async () => {
        const newTask = 'Test Task';
        
        // Simula la respuesta de la API
        server.use(
            rest.post('http://localhost:5000/tasks', (req, res, ctx) => {
                return res(ctx.status(201), ctx.json({ message: 'Task added!' }));
            })
        );

        // Mock the DOM
        document.body.innerHTML = '<input id="taskInput" value="' + newTask + '"><ul id="taskList"></ul>';
        await addTask();  // Ejecuta la función para agregar la tarea

        // Verifica si la tarea se ha añadido
        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].textContent).toBe(newTask);
    });
});
