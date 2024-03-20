const BACKEND_ROOT_URL = 'http://localhost:3001';

const list = document.querySelector('ul');
const input = document.querySelector('input');
input.disabled = true;

// Function to render a task to the UI
const renderTask = (taskDescription) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = taskDescription;
    list.appendChild(li);
};

// Event listener for user input
input.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task !== '') {
            renderTask(task);
            input.value = '';

            // Save the task to the backend
            try {
                await saveTask(task);
            } catch (error) {
                alert("Error saving task: " + error.message);
            }
        }
    }
});

// Function to fetch tasks from the backend
const getTasks = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL);
        const tasks = await response.json();
        tasks.forEach(task => {
            renderTask(task.description);
        });
        input.disabled = false;
    } catch (error) {
        alert("Error retrieving tasks: " + error.message);
    }
};

// Function to save a task to the backend
const saveTask = async (task) => {
    try {
        const response = await fetch(`${BACKEND_ROOT_URL}/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: task })
        });
        if (!response.ok) {
            throw new Error('Failed to save task');
        }
    } catch (error) {
        throw error;
    }
};

// Call the getTasks function to fetch tasks from the backend
getTasks();
