class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(title, description, dueDate) {
        const newTask = new Task(title, description, dueDate);
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="taskManager.toggleTaskCompletion(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.title} - ${task.dueDate}</span>
                <button onclick="taskManager.deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
}

const taskManager = new TaskManager();
taskManager.renderTasks();

document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const dueDate = e.target.dueDate.value;
    if (title) {
        taskManager.addTask(title, description, dueDate);
        e.target.reset();
    }
});
