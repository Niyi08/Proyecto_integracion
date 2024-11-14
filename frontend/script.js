// URL pública del backend en Azure
const API_URL = "https://backend-test.grayriver-4c4e07ce.eastus.azurecontainerapps.io/tasks"; 


// Función para obtener las tareas
async function fetchTasks() {
    const response = await fetch(API_URL);
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

// Función para agregar una nueva tarea
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task }) // Envía la tarea como JSON
            });

            if (!response.ok) {
                // Si la respuesta no es 2xx, lanza un error
                throw new Error(`Error: ${response.statusText}`);
            }

            taskInput.value = ''; // Limpia el campo de entrada
            fetchTasks(); // Refresca la lista de tareas
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
        }
    }
}

// Función para eliminar una tarea
async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' }); // Llama a la API para eliminar la tarea
    fetchTasks(); // Refresca la lista de tareas
}

// Carga las tareas al iniciar
fetchTasks();
