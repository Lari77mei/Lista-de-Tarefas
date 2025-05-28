document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const background = document.getElementById('background1');

    
    loadTasks();
    
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        // Validação: não permite tarefas vazias
        if (!taskText) {
            alert('Por favor, digite uma tarefa válida.');
            return;
        }
        
        const task = {
            id: Date.now(),
            text: taskText
        };
        
        const tasks = getTasks();
        tasks.push(task);
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        
        const emptyMessage = taskList.querySelector('.empty-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        addTaskToDOM(task);
        
        taskInput.value = '';
    }
    
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Remover</button>
        `;
        
        li.querySelector('.delete-btn').addEventListener('click', function() {
            removeTask(task.id);
            li.remove();
            checkEmptyList();
        });
        
        taskList.appendChild(li);
    }
    
    function removeTask(taskId) {
        const tasks = getTasks().filter(task => task.id !== taskId);
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const tasks = getTasks();
        
        if (tasks.length === 0) {
            showEmptyMessage();
            return;
        }
        
        const emptyMessage = taskList.querySelector('.empty-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        tasks.forEach(task => addTaskToDOM(task));
    }
    
    function getTasks() {
        const tasksJSON = sessionStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }
    
    function showEmptyMessage() {
        if (!taskList.querySelector('.empty-message')) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = 'Nenhuma tarefa adicionada ainda.';
            taskList.appendChild(emptyMsg);
        }
    }
    
    function checkEmptyList() {
        const taskItems = taskList.querySelectorAll('.task-item');
        if (taskItems.length === 0) {
            showEmptyMessage();
        }
    }
});