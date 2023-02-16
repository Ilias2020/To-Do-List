const addTaskBtn = document.getElementById('add-task-button');
const deskTaskInput = document.getElementById('input-task');
const todosWrapper = document.getElementById('task-list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];
function Task(description) {
    this.description = description;
    this.completed = false;
}
const createTemplate = (task, index) => {
    return `
        <li class="todo-item ${task.completed ? 'checked' : ''}">
            <input onclick="completeTask(${index})" type="checkbox" class="check" ${task.completed ? 'checked' : ''}>
            <span class="task">${task.description}</span>
            <button onclick="deleteTask(${index})" type="button" class="delete-btn"></button>
        </li>
`
}
const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        })
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();
const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },300)

}