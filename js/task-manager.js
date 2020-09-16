// console.log('this page')
const inputName = document.querySelector('#name')
const status = document.querySelector('.status')
const date = document.querySelector('#date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const form = document.querySelector('#form')
const submitBtn = document.querySelector('.sub-btn')
// const inputElem = document.querySelector('input')


// *make id number the same as array index number
class TaskManager {
    // define a tasks array/object to hold the tasks
    constructor(id) {
        this.tasks = []
        this.currentID = id || 0
        // this.currentID = id === undefined ? 0 : id
    }
    // // get tasks
    // getAllTasks() {
    //     return this.tasks
    // }
    // // get tasks with a given status: when requiring for certain status and list the tasks
    // getTasksWithStatus(status) {
    //     return this.tasks.filter(function (task) {
    //         return task.status === status
    //     })
    // }

    // add task
    addTask(name, dueDate, title, description) {
        let task = {
            id: this.currentID,
            name: name,
            status: 'TODO',
            // assignedTo: assignedTo,
            dueDate: dueDate,
            title: title,
            description: description
        }
        this.tasks.push(task)
        this.currentID++;
    }

    // // delete task
    // deleteTask(task) {
    //     let taskIndex = this.tasks.findIndex(t => t.id === task.id)
    //     this.tasks.splice(taskIndex, 1)
    // }
    // // update task status
    // updateTask(taskId, status) {
    //     const taskIndex = this.tasks.findIndex(task => task.id === taskId)
    //     this.task[taskIndex].status = status
    // }
    // // Assign a task to someone
    // assignTask(taskId, assignee) {
    //     const taskIndex = this.tasks.findIndex(task => task.id === taskId)
    //     this.tasks[taskIndex].assignee = assignee
    // }
}