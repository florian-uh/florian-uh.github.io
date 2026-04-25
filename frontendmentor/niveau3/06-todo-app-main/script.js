const todoInput = document.getElementById('todo-input');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompleted = document.getElementById('clear-completed');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('img');
const filterBtns = document.querySelectorAll('.filters button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Theme Logic
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    themeIcon.src = newTheme === 'dark' ? './images/icon-sun.svg' : './images/icon-moon.svg';
    localStorage.setItem('theme', newTheme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
themeIcon.src = savedTheme === 'dark' ? './images/icon-sun.svg' : './images/icon-moon.svg';

themeToggle.addEventListener('click', toggleTheme);

// Todo Logic
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('div');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.draggable = true;
        li.setAttribute('data-index', todos.indexOf(todo));
        
        li.innerHTML = `
            <div class="check-wrapper">
                <img src="./images/icon-check.svg" alt="">
            </div>
            <p>${todo.text}</p>
            <img src="./images/icon-cross.svg" alt="Delete" class="delete-btn">
        `;

        li.querySelector('.check-wrapper').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleComplete(todos.indexOf(todo));
        });

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todos.indexOf(todo));
        });

        li.addEventListener('click', () => toggleComplete(todos.indexOf(todo)));

        // Drag and Drop events
        li.addEventListener('dragstart', () => li.classList.add('dragging'));
        li.addEventListener('dragend', () => li.classList.remove('dragging'));

        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.innerText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function addTodo(text) {
    if (!text.trim()) return;
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo(todoInput.value);
        todoInput.value = '';
    }
});

clearCompleted.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update both desktop and mobile buttons if they share classes
        const filterType = btn.innerText.toLowerCase();
        filterBtns.forEach(b => {
            if(b.innerText.toLowerCase() === filterType) b.classList.add('active');
        });

        currentFilter = filterType;
        renderTodos();
    });
});

// Drag and Drop Logic
todoList.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(todoList, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (afterElement == null) {
        todoList.appendChild(dragging);
    } else {
        todoList.insertBefore(dragging, afterElement);
    }
});

todoList.addEventListener('drop', () => {
    const items = [...todoList.querySelectorAll('.todo-item')];
    const newTodos = items.map(item => {
        const index = item.getAttribute('data-index');
        return todos[index];
    });
    todos = newTodos;
    saveTodos();
    renderTodos();
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

renderTodos();
