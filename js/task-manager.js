// console.log('this page')

// Status object
const statusMap = {
    'To do': {
        className: 'status1',
        icon: 'far fa-circle'
    },
    'Progress': {
        className: 'status2',
        icon: 'fas fa-circle'
    },
    'Review': {
        className: 'status3',
        icon: 'fas fa-pause-circle'
    },
    'Done': {
        className: 'status4',
        icon: 'fas fa-check-circle'
    },
}

// Display cards
let displayCards = (tasksList, selectedTasks) => {

    let htmlContents = ''
    tasksList.forEach(task => {
        // check if selected array includes task.id
        const isSelected = selectedTasks.includes(task.id)
        const selectedClass = isSelected ? 'selected' : ''
        const switchClass = isSelected ? 'fas fa-square' : 'far fa-square'
        const assignee = task.assignedTo ? task.assignedTo.toUpperCase().split('')[0] : '<i class="fas fa-user-tag"></i>'
        let splitDate = task.dueDate.split('-').reverse().join('/')

        htmlContents += `
            <div class="card shadow rounded ${statusMap[task.status.trim()].className} ${selectedClass}" data-task-id="${task.id}">
                <div class="card-body"> 

                    <!-- status button  -->
                    <div class="dropdown status-btn">
                        <button class="btn p-0 type="button" id="statusMenu" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded ="false"
                            title="${task.status}">
                            <i class="${statusMap[task.status.trim()].icon}"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="statusMenu">
                            <a class="status1 dropdown-item status-dropdown-item" href="#" name="To do"><i
                            class="far fa-circle"></i> <span>To do</span></a>
                            <a class="status2 dropdown-item status-dropdown-item" href="#" name="Progress"><i
                            class="fas fa-circle"></i> <span>Progress</span></a>
                            <a class="status3 dropdown-item status-dropdown-item" href="#" name="Review"><i
                            class="fas fa-pause-circle"></i> <span>Review</span></a>
                            <a class="status4 dropdown-item status-dropdown-item" href="#" name="Done"><i
                            class="fas fa-check-circle"></i> <span>Done</span></a>
                        </div>
                        
                        <!-- due date  -->
                        <p class="due-date modal-link ml-2" data-toggle="modal" data-target="#modal-form">Due date: <span class="date modal-link">${splitDate}</span></p>
                        
                        <!-- select button  -->
                        <button class="btn square-btn" type="button" value="Input"><i class="${switchClass} select-btn"></i></button>
                    </div>

                    <!-- assign button  -->
                    <div class="dropdown">
                        <div class="assign" id="assignMenu" title="${task.assignedTo}">
                            <div class="assignee text-center">${assignee}</div>
                        </div>

                        <!-- text title-->
                        <p class="task-title modal-link ml-2" data-toggle="modal" data-target="#modal-form">${task.title}</p>

                        <!-- task description button -->
                        <button class="btn task-des-btn" type="button" data-toggle="collapse" 
                        data-target="#task-des-${task.id}"
                            aria-expanded="false"
                            aria-controls="task-des-${task.id}">
                            <i class="fas fa-angle-double-down"></i>
                        </button>
                    </div>
                    <div class="collapse card" id="task-des-${task.id}">
                        <div class="task-des card-body">
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
    // define a tasks and a selected array for delete
    constructor(boardId, newId) {
        this.tasks = [] 
        this.selectedTasks = []
        this.currentID = newId || 0
        this.boardId = boardId
    }

    addTask(status, assignedTo, dueDate, title, description) {
        const task = {
            id: this.currentID,
            status: status,
            assignedTo: assignedTo,
            dueDate: dueDate,
            title: title,
            description: description
        }
        this.tasks.push(task)
        this.currentID++;
    }

    // Save tasks to local storage
    save() {
        let tasksJson = JSON.stringify(this.tasks)
        let idJson = JSON.stringify(this.currentID)
        localStorage.setItem('tasks_' + this.boardId, tasksJson)
        localStorage.setItem('id_' + this.boardId, idJson)

    }

    // Load data from local storage
    load() {
        let getTasks = localStorage.getItem('tasks_' + this.boardId)
        let tasksParse = JSON.parse(getTasks) || []
        this.tasks = tasksParse
        let getId = localStorage.getItem('id_' + this.boardId) || 0
        let idParse = JSON.parse(getId)
        this.currentID = idParse

        displayCards(this.tasks, this.selectedTasks)
    }

    // Select and toggle card for delete
    selectTask(taskId) {
        if (this.selectedTasks.includes(taskId)) {
            // remove the item from the selected list if it's already in the list
            this.selectedTasks = this.selectedTasks.filter(id => id !== taskId)
        } else {
            this.selectedTasks.push(taskId)
        }

        displayCards(this.tasks, this.selectedTasks)
    }

    // clear up seleted array
    clearSelected() {
        this.selectedTasks = []
    }

    // Delete task
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        this.save()
    }

    // Get task object through targeted card's id
    findTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId)
        return task
    }

    editTask(editId, status, assignedTo, dueDate, title, description) {
        const taskData = this.findTask(editId)
        taskData.status = status
        taskData.assignedTo = assignedTo
        taskData.dueDate = dueDate
        taskData.title = title
        taskData.description = description
        // find index in the array
        const taskIndex = this.tasks.findIndex(task => task.id === editId)
        this.tasks[taskIndex] = taskData
    }
}

let newTaskManager = new TaskManager(boardId)
console.log(newTaskManager)
newTaskManager.load()
displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)

/*
const original = [1, 2, 3]
const removed = original.slice(1, 2)
console.log(`1 item was removed, original size ${original.length}, new size: ${removed.length}`)
*/



// cardsContainer.addEventListener('click', (e) => {
//     console.log(e.target.children)
// })

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

//     // Assign a task to someone
//     assignTask(taskId, assignee) {
//         const taskIndex = this.tasks.findIndex(task => task.id === taskId)
//         this.tasks[taskIndex].assignee = assignee
//     }