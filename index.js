
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    // Event listener for form submission
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
    });

    // Function to add a new task
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            taskItem.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <button type="button">Delete</button>
            `;

            // Event listener for checkbox change
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function () {
                updateTaskStatus(taskItem);
            });

            // Event listener for delete button
            const deleteButton = taskItem.querySelector('button');
            deleteButton.addEventListener('click', function () {
                deleteTask(taskItem);
            });

            taskList.appendChild(taskItem);

            // Save tasks to local storage
            saveTasks();

            // Clear input field
            newTaskInput.value = '';
        }
    }

    // Function to update task status (completed/uncompleted)
    function updateTaskStatus(taskItem) {
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        const taskText = taskItem.querySelector('span');

        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }

        // Save tasks to local storage
        saveTasks();
    }

    // Function to delete a task
    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);

        // Save tasks to local storage
        saveTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('.task');
        taskItems.forEach(function (taskItem) {
            const taskText = taskItem.querySelector('span').textContent;
            const taskStatus = taskItem.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: taskStatus });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(function (task) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task';
                taskItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span style="${task.completed ? 'text-decoration: line-through;' : ''}">${task.text}</span>
                    <button type="button">Delete</button>
                `;

                // Event listener for checkbox change
                const checkbox = taskItem.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', function () {
                    updateTaskStatus(taskItem);
                });

                // Event listener for delete button
                const deleteButton = taskItem.querySelector('button');
                deleteButton.addEventListener('click', function () {
                    deleteTask(taskItem);
                });

                taskList.appendChild(taskItem);
            });
        }
    }
});
