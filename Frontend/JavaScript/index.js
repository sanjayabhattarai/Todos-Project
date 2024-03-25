const BACKEND_ROOT_URL = 'http://localhost:3001';

import { Todos } from './class/Todos.js';

const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = false;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');

   
    if (task && task.id) {
        li.setAttribute('data-key', task.id.toString());

    }
    renderSpan(li, task.getText()); 
    renderLink(li, task.id);
    list.append(li);
}


const renderSpan = (li, text) => {
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
}

const renderLink = (li, id) => {
    const a = document.createElement('a');
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style', 'float:right; cursor:pointer;');
    a.addEventListener('click', (e) => {
        todos.removeTask(id)
            .then((removedId) => {
                const liToRemove = document.querySelector(`[data-key="${removedId}"]`);
                if (liToRemove) {
                    list.removeChild(liToRemove);
                }
            })
            .catch((error) => {
                console.error('Error removing task:', error);
                alert('Error removing task: ' + error);
            });
    });
    li.appendChild(a);
}

const deleteTask = async (id) => {
    try {
        const response = await fetch(`${BACKEND_ROOT_URL}/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
    }
};

const getTasks = () => {
    todos.getTasks()
        .then((tasks) => {
            tasks.forEach(task => {
                renderTask(task);
            });
            input.disabled = false;
        })
        .catch((error) => {
            console.error('Error fetching tasks:', error);
            alert('Error fetching tasks: ' + error);
        });
}

const addTask = (taskText) => {
    todos.addTask(taskText)
        .then((task) => {
            renderTask(task);
            input.value = '';
            input.focus();
        })
        .catch((error) => {
            console.error('Error adding task:', error);
            alert('Error adding task: ' + error);
        });
}

getTasks();

input.addEventListener('click', () => {
    const task = input.value.trim();
    if (task !== '') {
        addTask(task);
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const task = input.value.trim();
        if (task !== '') {
            addTask(task);
        }
    }
});
