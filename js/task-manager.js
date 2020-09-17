// console.log('this page')

// display cards
let displayCards = (tasksList) => {
    let htmlContents = ''
    tasksList.forEach(task => {
        htmlContents += `
            <div class="card">
                <div class="card-body"> 
                    <!-- status button  -->
                    <div class="dropdown status-btn">
                        <button class="btn" type="button" id="statusMenu" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false" title="status">
                            <i class="far fa-check-square"></i>
                        </button>
                        <p class="due-date">Due date: <span class="date">${task.dueDate}</span><span>${task.name}</span></p>
                        <div class="dropdown-menu" aria-labelledby="statusMenu">
                            <a class="dropdown-item" href="#">Todo</a>
                            <a class="dropdown-item" href="#">Progress</a>
                            <a class="dropdown-item" href="#">Review</a>
                            <a class="dropdown-item" href="#">Done</a>
                        </div>
                        <!-- select button  -->
                        <button class="btn s-circle" type="button" value="Input"><i class="far fa-circle"></i></button>
                    </div>
                    <!-- assign button  -->
                    <div class="dropdown assign-btn">
                        <button class="btn" type="button" id="assignMenu" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false" title="assign to">
                            <i class="fas fa-user-tag"></i>
                        </button>
                        <p class="task-title">${task.title}</p>
                        <div class="dropdown-menu" aria-labelledby="assignMenu">
                            <a class="dropdown-item" href="#">${task.assignedTo}</a>
                        </div>
                        <!-- task description button -->
                        <button class="btn task-des-btn" type="button" data-toggle="collapse" data-target="#task-des1"
                            aria-expanded="false" aria-controls="task-des1">
                            <i class="fas fa-angle-double-down"></i>
                        </button>
                    </div>
                    <div class="collapse" id="task-des1">
                        <div class="card card-body">
                            ${task.description}
                        </div>
                    </div>
                </div>
            </div>
            `
    })
    cardsContainer.innerHTML = htmlContents
}

// *make id number the same as array index number
class TaskManager {
    // define a tasks array/object to hold the tasks
    constructor(id) {
        this.tasks = []
        this.currentID = id || 0
        // this.currentID = id === undefined ? 0 : id
    }

    // add task
    addTask(name, assignedTo, dueDate, title, description) {
        const task = {
            id: this.currentID,
            name: name,
            status: 'Todo',
            assignedTo: assignedTo,
            dueDate: dueDate,
            title: title,
            description: description
        }
        this.tasks.push(task)
        this.currentID++;
    }

    // render() {
    //     let tasksHtmlList = []
    //     this.tasks.forEach(task => {
    //         let taskHtml = createTaskHtml(task.dueDate, task.title, task.description)
    //         console.log(taskHtml)
    //         tasksHtmlList.push(taskHtml)
    //     })
    //     let tasksHtml = tasksHtmlList 
    // }
    // get tasks
    // getAllTasks() {
    //     return this.tasks
    // }
    // // get tasks with a given status: when requiring for certain status and list the tasks
    // getTasksWithStatus(status) {
    //     return this.tasks.filter(function (task) {
    //         return task.status === status
    //     })
    // }

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


let testTaskManager = new TaskManager()
let tasksList = testTaskManager.tasks
displayCards(tasksList)