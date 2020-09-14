// console.log('this page')
const inputName = document.querySelector('#name')
const status = document.querySelector('.status')
const date = document.querySelector('#date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')

// JSON format objects

let tasksList = [{
        id: 0001,
        name: 'task',
        description: 'test',
        AssignedTo: 'Liz',
        DueDate: '2020-10-01',
        Status: 'Todo'
    },
    {
        id: 0002,
        name: 'task',
        description: 'test',
        AssignedTo: 'Leo',
        DueDate: '2020-10-01',
        Status: 'Todo'
    }
]
// *make id number the same as array index number
class TaskManager {
    // define a tasks array/object to hold the tasks
    constructor() {
        this.tasks = []
    }
    // get tasks
    getAllTasks() {
        return this.tasks
    }
    // get tasks with a given status: when requiring for certain status and list the tasks
    getTasksWithStatus(status) {
        return this.tasks.filter(function (task) {
            return task.status === status
        })
    }
    // add task
    addTask(task) {
        this.tasks.push(task)
    }
    // delete task
    deleteTask(task) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id)
        this.tasks.splice(taskIndex, 1)
    }
    // update task status
    updateTask(taskId, status) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        this.task[taskIndex].status = status
    }
    // Assign a task to someone
    assignTask(taskId, assignee) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        this.tasks[taskIndex].assignee = assignee
    }
}

// Name validation
inputName.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    inputLength = e.target.value.length
    // console.log(name.value)
    // let invalidFeedback = inputLength === 0 ? e.target.classList.add('invalid') :
    //     (inputLength > 15 ? e.target.classList.add('is-invalid'))
    if (inputLength === 0 || inputLength > 20) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Task title validation
taskTitle.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    inputLength = e.target.value.length
    if (inputLength === 0 || inputLength > 20) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Due-date validation
date.addEventListener('change', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    let inputValue = e.target.value
    // console.log(inputValue) //string
    let inputDate = new Date(inputValue)
    // console.log(inputDate) //Object
    let currentDate = new Date()
    if (inputValue === '' || inputDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Task description validation
taskContent.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    inputLength = e.target.value.length
    // console.log(name.value)
    if (inputLength === 0 || inputLength > 100) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})