const BACKEND_ROOT_URL = 'http://localhost:3001';

import { Todos } from './class/Todos.js';

const todos = new Todos(BACKEND_ROOT_URL);




const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');

   li.setAttribute('data-key', task.getId().toString());

     
    renderSpan(li, task.getText()); 
    renderLink(li, task.getId());
    list.appendChild(li);
}


const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'));
    span.innerHTML = text;
   
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
