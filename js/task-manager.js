// console.log('this page')

// status object
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
    }
}

// display cards
let displayCards = (tasksList, selectedTasks) => {
    console.log(`Displaying cards, selected ${selectedTasks}`)

    let htmlContents = ''
    tasksList.forEach(task => {
        // console.log(task)
        const isSelected = selectedTasks.includes(`${task.id}`)
        // console.log(`task selected ${isSelected}`)
        const selectedClass = isSelected ? 'selected' : ''

        htmlContents += `
            <div class="card shadow rounded ${statusMap[task.status.trim()].className} ${selectedClass}" data-task-id="${task.id}">
                <div class="card-body"> 
                    <!-- status button  -->
                    <div class="dropdown status-btn">
                        <button class="btn" type="button" id="statusMenu" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded ="false"
                            title="${task.status}">
                            <i class="${statusMap[task.status.trim()].icon}"></i>
                        </button>
                        <p class="due-date">Due date: <span class="date">${task.dueDate}</span></p>
                        <div class="dropdown-menu" aria-labelledby="statusMenu">
                            <a class="status1 dropdown-item" href="#" name="To do"><i
                                                class="far fa-circle"></i> <span>To do</span></a>
                                        <a class="status2 dropdown-item" href="#" name="Progress"><i
                                                class="fas fa-circle"></i> <span>Progress</span></a>
                                        <a class="status3 dropdown-item" href="#" name="Review"><i
                                                class="fas fa-pause-circle"></i> <span>Review</span></a>
                                        <a class="status4 dropdown-item" href="#" name="Done"><i
                                                class="fas fa-check-circle"></i> <span>Done</span></a>
                        </div>
                        <!-- select button  -->
                        <button class="btn select-btn" type="button" value="Input"><i class="far fa-circle"></i></button>
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
                        <button class="btn task-des-btn" type="button" data-toggle="collapse" 
                        data-target="#task-des-${task.id}"
                            aria-expanded="false"
                            aria-controls="task-des-${task.id}">
                            <i class="fas fa-angle-double-down"></i>
                        </button>
                    </div>
                    <div class="collapse" id="task-des-${task.id}">
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

const testTasks = [{
    id: 20,
    // name: name,
    status: 'To do',
    assignedTo: 'Liz',
    dueDate: '2020-10-10',
    title: 'Test todo task',
    description: 'Some description'
}, {
    id: 21,
    // name: name,
    status: 'Progress',
    assignedTo: 'Liz',
    dueDate: '2020-10-10',
    title: 'Test progress task',
    description: 'Some description'
}, {
    id: 22,
    // name: name,
    status: 'Review',
    assignedTo: 'Liz',
    dueDate: '2020-10-10',
    title: 'Test review task',
    description: 'Some description'
}, {
    id: 23,
    // name: name,
    status: 'Done',
    assignedTo: 'Liz',
    dueDate: '2020-10-10',
    title: 'Test done task',
    description: 'Some description'
}]


// *make id number the same as array index number
class TaskManager {
    // define a tasks array/object to hold the tasks
    constructor(newId) {
        this.tasks = [] //testTasks 
        this.selectedTasks = []
        this.currentID = newId || 0
        //Create a new array without the elements we want removed included.
    }

    addTask(status, assignedTo, dueDate, title, description) {

        const task = {
            id: this.currentID,
            // name: name,
            status: status,
            assignedTo: assignedTo,
            dueDate: dueDate,
            title: title,
            description: description

        }
        this.tasks.push(task)
        this.currentID++;
    }
    // save tasks to local storage
    save() {
        let tasksJson = JSON.stringify(this.tasks)
        let idJson = JSON.stringify(this.currentID)
        localStorage.setItem('tasks', tasksJson)
        localStorage.setItem('id', idJson)
        // console.log('run save')
    }

    // load data from local storage
    load() {
        let getTasks = localStorage.getItem('tasks')
        let tasksParse = JSON.parse(getTasks)
        this.tasks = tasksParse
        let getId = localStorage.getItem('id')
        let idParse = JSON.parse(getId)
        this.currentID = idParse
        // console.log(this.currentID)
        displayCards(this.tasks, this.selectedTasks)
    }

    selectTask(taskId) {
        // console.log(`Toggle selection task ${taskId}`)
        if (this.selectedTasks.includes(taskId)) {

            // remove this task from a list of selected tasks
            this.selectedTasks = this.selectedTasks.filter(id => id !== taskId)
        } else {
            this.selectedTasks.push(taskId)
        }

        console.log(this.selectedTasks)

        displayCards(this.tasks, this.selectedTasks)
    }

    // delete task
    deleteTask(taskId) {
        console.log(taskId)
        // tasksForDelete = []

        // let taskIndex = this.tasks.findIndex(item => console.log(item.id)) //item.id === taskId)

        // let sliceTask = this.tasks.slice(taskId, taskId + 1)
        // console.log(sliceTask)
        //  console.log(this.tasks)
        // tasksForDelete.push(this.tasks[taskIndex])

        this.tasks = this.tasks.filter(task => task.id != taskId)
        this.save()
    }

}
/*
const original = [1, 2, 3]
const removed = original.slice(1, 2)
console.log(`1 item was removed, original size ${original.length}, new size: ${removed.length}`)
*/

let newTaskManager = new TaskManager()
newTaskManager.load()
let tasksList = newTaskManager.tasks
let listCards = displayCards(tasksList, newTaskManager.selectedTasks)


// cardsContainer.addEventListener('click', (e) => {
//     console.log(e.target.children)
// })

// update task status
// updateTask(taskId, status) {
//     const taskIndex = this.tasks.findIndex(task => task.id === taskId)
//     this.task[taskIndex].status = status
// }

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