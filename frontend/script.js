// Define la URL del backend según el entorno
const apiURL = window.location.host === 'localhost' ? 
    "http://localhost:5000/tasks" : 
    "http://backend-1:5000/tasks"; // Nombre del contenedor en Docker

async function fetchTasks() {
    const response = await fetch(apiURL);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    // Renderiza la lista de tareas
    tasks.data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task; // Muestra el nombre de la tarea
        li.onclick = () => deleteTask(task.id); // Llama a deleteTask() al hacer clic
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task }) // Envía la tarea como JSON
        });
        taskInput.value = ''; // Limpia el campo de entrada
        fetchTasks(); // Refresca la lista de tareas
    }
}

async function deleteTask(taskId) {
    await fetch(`${apiURL}/${taskId}`, { method: 'DELETE' }); // Llama a la API para eliminar la tarea
    fetchTasks(); // Refresca la lista de tareas
}

// Carga las tareas al iniciar
fetchTasks();
