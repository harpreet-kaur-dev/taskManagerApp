document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        dueDate: dueDate,
        priority: priority,
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    taskInput.value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('priority').value = 'Low';
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const taskContainer = document.getElementById('task-container');
    taskList.innerHTML = '';
    const tasks = getTasks();

    if (tasks.length > 0) {
        taskContainer.classList.add('visible');
    } else {
        taskContainer.classList.remove('visible');
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}`;

        if (task.priority === 'Low') {
            li.classList.add('low-priority');
        } else if (task.priority === 'Medium') {
            li.classList.add('medium-priority');
        } else if (task.priority === 'High') {
            li.classList.add('high-priority');
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            editTask(index);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            deleteTask(index);
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    document.getElementById('task-input').value = task.text;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('priority').value = task.priority;

    deleteTask(index);
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function filterTasks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filterPriority = document.getElementById('filter-priority').value;

    const taskList = document.getElementById('task-list');
    const tasks = getTasks();

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        if (
            (task.text.toLowerCase().includes(searchInput) || searchInput === '') &&
            (task.priority === filterPriority || filterPriority === '')
        ) {
            const li = document.createElement('li');
            li.textContent = `${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}`;

            if (task.priority === 'Low') {
                li.classList.add('low-priority');
            } else if (task.priority === 'Medium') {
                li.classList.add('medium-priority');
            } else if (task.priority === 'High') {
                li.classList.add('high-priority');
            }

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = function() {
                editTask(index);
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = function() {
                deleteTask(index);
            };

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }
    });

    if (taskList.children.length > 0) {
        document.getElementById('task-container').classList.add('visible');
    } else {
        document.getElementById('task-container').classList.remove('visible');
    }
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
