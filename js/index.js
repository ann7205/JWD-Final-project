const statusBtn = document.querySelector('.status-dropdown')
// const assignBtn = document.querySelector('.assign-dropdown')
const assign = document.querySelector('#task-assign')
const date = document.querySelector('#due-date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const submitBtn = document.querySelector('.sub-btn')
const cardsContainer = document.querySelector('#cards-container')
const binBtn = document.querySelector('.delete-list')
const card = document.querySelector('.card')
const inputs = document.querySelectorAll('input')
const iconElement = document.querySelector('.dropdown-icon')
const delAllBtn = document.querySelector('.b-square .far.fa-square')
const title = document.querySelector('.title')
const boardId = location.search.split('=')[1]


// set edit form is false and new form is true
let isEditForm = false
let editTaskId

// Task title validation
taskTitle.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    let inputValue = e.target.value.trim()
    let inputLength = inputValue.length
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
    let inputDate = new Date(inputValue)
    let currentDate = new Date()
    if (inputValue === '' || inputDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Get assignedTo value
// let assignTo = ''
// assignBtn.addEventListener('click', (e) => {
//     assignTo = e.target.textContent
// })

// Get status value
let status = ''
statusBtn.addEventListener('click', (e) => {
    status = e.target.textContent
})

// Submit form
function submitForm(e) {
    e.preventDefault()

    let dateVal = date.value
    let statusVal = status
    let assignVal = assign.value
    console.log(assignVal)
    let titleVal = taskTitle.value
    let contentVal = taskContent.value

    let allValid = true
    inputs.forEach(item => {
        if (item.classList.contains('is-invalid')) {
            allValid = false;
        }
    })

    // All the columns are valid, do follow steps
    if (allValid) {
        if (isEditForm) {
            newTaskManager.editTask(editTaskId, statusVal, assignVal, dateVal, titleVal, contentVal)
        } else {
            newTaskManager.addTask(statusVal || 'To do', assignVal, dateVal, titleVal, contentVal)
        }

        newTaskManager.save()

        displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)

        inputs.forEach(item => {
            item.classList.remove('is-valid')
        })

        // remove data from the form
        date.value = ''
        status = ''
        assign.value = ''
        taskTitle.value = ''
        taskContent.value = ''
    } else {
        alert('Please complete the form')
        e.preventDefault()
        e.stopPropagation()
    }

}
submitBtn.addEventListener('click', submitForm)

// Remove all contents when clicking on the add button
document.querySelector('.add-new-list').addEventListener('click', () => {

    isEditForm = false

    date.value = ''
    status = ''
    assign.value = ''
    taskTitle.value = ''
    taskContent.value = ''

    iconElement.className = 'dropdown-icon ' + 'far ' + 'fa-circle'

    document.querySelectorAll('input').forEach(item => {
        item.classList.remove('is-valid', 'is-invalid')
    })
})

// Get task id
function findTaskId(element) {
    let cardElement = element

    while (cardElement.dataset.taskId === undefined) {
        cardElement = cardElement.parentElement
    }
    return Number(cardElement.dataset.taskId)
}

// Click on cards
function onCardClick(e) {

    let getId
    // select button for delete
    if (e.target.matches('.select-btn')) {
        getId = findTaskId(e.target)
        newTaskManager.selectTask(getId)
        // select card for update status
    } else if (e.target.matches('.status-dropdown-item') || e.target.parentElement.matches('.status-dropdown-item')) {
        getId = findTaskId(e.target)
        let currentTarget = e.target
        while (!currentTarget.matches('.dropdown-item')) {
            currentTarget = currentTarget.parentElement
        }
        const getTask = newTaskManager.findTask(getId)
        let updateStatus = currentTarget['name']
        newTaskManager.editTask(getTask.id, updateStatus, getTask.assign, getTask.dueDate, getTask.title, getTask.description)
        newTaskManager.save()
        displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)
        // Open the modal by clicking card
    } else if (e.target.matches('.modal-link')) {
        isEditForm = true

        getId = findTaskId(e.target)
        editTaskId = getId

        const task = newTaskManager.findTask(getId)

        // Render back to the form
        taskTitle.value = task.title
        date.value = task.dueDate
        status = task.status
        assign.value = task.assign
        taskContent.value = task.description
    }
    // Toggle to show or hidee bin button
    if (newTaskManager.selectedTasks.length > 0) {
        binBtn.classList.remove('toggle-delete-btn')
    } else {
        binBtn.classList.add('toggle-delete-btn')
    }

}
cardsContainer.addEventListener('click', onCardClick)

// Click bin button
binBtn.addEventListener('click', (e) => {

    newTaskManager.selectedTasks.forEach(taskId => {
        newTaskManager.deleteTask(taskId)
    })

    newTaskManager.clearSelected()
    binBtn.classList.add('toggle-delete-btn')

    displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)
})

// Modal status button
document.querySelector('.modal .status-dropdown').addEventListener('click', (e) => {
    let currentElement = e.target
    while (!currentElement.matches('.dropdown-item')) {
        currentElement = currentElement.parentElement
    }

    const status = currentElement['name']
    // Replace one class without affect another one
    iconElement.className = 'dropdown-icon ' + statusMap[status].icon
})

// Select all button
delAllBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('fas')
    newTaskManager.tasks.forEach(task => {
        newTaskManager.selectTask(task.id)

        if (newTaskManager.selectedTasks.length > 0) {
            binBtn.classList.remove('toggle-delete-btn')
        } else {
            binBtn.classList.add('toggle-delete-btn')
        }
    })
    console.log(newTaskManager.selectedTasks)
})

// Assign title to task list
    let getItem = localStorage.getItem('items')
    let parseItem = JSON.parse(getItem)
    let parseBoardId = Number(boardId)
    title.textContent = parseItem[parseBoardId]['title']
