// const inputName = document.querySelector('#name')
const statusBtn = document.querySelector('.status-dropdown')
const assignBtn = document.querySelector('.assign-dropdown')
const date = document.querySelector('#due-date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const form = document.querySelector('#modal-form')
const submitBtn = document.querySelector('.sub-btn')
const cardsContainer = document.querySelector('#cards-container')
const binBtn = document.querySelector('.delete-list')
const card = document.querySelector('.card')

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

// AssignedTo 
let assignTo = ''
assignBtn.addEventListener('click', (e) => {
    assignTo = e.target.textContent
})

// Status 
let status = ''
statusBtn.addEventListener('click', (e) => {
    status = e.target.textContent
})



// Submit form
function submitForm(e) {
    e.preventDefault()
    // set invalid column is false as default
    let allValid = true
    document.querySelectorAll('input').forEach(item => {
        if (item.classList.contains('is-invalid')) {
            allValid = false;
        }
    })
    // if it's true as well as task content
    if (allValid) {
        let dateVal = date.value
        let statusVal = status
        let assignVal = assignTo
        let titleVal = taskTitle.value
        let contentVal = taskContent.value

        // store data and assign to function as object
        newTaskManager.addTask(statusVal || 'To do', assignVal, dateVal, titleVal, contentVal)
        // update the card
        // save the cards to local storage
        newTaskManager.save()
        // render the cards from task's object
        displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)

        // remove data from the form
        date.value = ''
        status = ''
        assignTo = ''
        taskTitle.value = ''
        taskContent.value = ''

        document.querySelectorAll('input').forEach(item => {
            item.classList.remove('is-valid')
        })
    } else {
        alert('Please complete the form')
        e.preventDefault()
        e.stopPropagation()
    }

}
submitBtn.addEventListener('click', submitForm)

function selectItem(e) {
    if (e.target.matches('.fa-circle')) {
        //  binBtn.classList.toggle('toggle-delete-btn')

        let getId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.taskId

        newTaskManager.selectTask(getId)

        if (newTaskManager.selectedTasks.length > 0) {
            binBtn.classList.remove('toggle-delete-btn')
        } else {
            binBtn.classList.add('toggle-delete-btn')
        }
    }
}
cardsContainer.addEventListener('click', selectItem)

binBtn.addEventListener('click', (e) => {
    console.log(`deleting selected tasks`)
    console.log(newTaskManager.selectedTasks)

    newTaskManager.selectedTasks.forEach(taskId => {
        newTaskManager.deleteTask(taskId)
    })

    displayCards(newTaskManager.tasks, newTaskManager.selectedTasks)
})

// Task description validation
// taskContent.addEventListener('input', (e) => {
//     e.target.classList.remove('is-invalid', 'is-valid')
//     let inputValue = e.target.value.trim()
//     let inputLength = inputValue.length
//     if (inputLength === 0 || inputLength > 50) {
//         e.target.classList.add('is-invalid')
//     } else {
//         e.target.classList.add('is-valid')
//     }
// })

// // Name validation
// inputName.addEventListener('input', (e) => {
//     e.target.classList.remove('is-invalid', 'is-valid')
//     let inputValue = e.target.value.trim()
//     let inputLength = inputValue.length
//     // let invalidFeedback = inputLength === 0 ? e.target.classList.add('invalid') :
//     //     (inputLength > 15 ? e.target.classList.add('is-invalid'))
//     if (inputLength === 0 || inputLength > 20) {
//         e.target.classList.add('is-invalid')
//     } else {
//         e.target.classList.add('is-valid')
//     }
// })