// const inputName = document.querySelector('#name')
const statusBtn = document.querySelector('.status-dropdown')
const assignBtn = document.querySelector('.assign-dropdown')
const date = document.querySelector('#due-date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const form = document.querySelector('#modal-form')
const submitBtn = document.querySelector('.sub-btn')
const cardsContainer = document.querySelector('.cards-container')

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
        testTaskManager.addTask(statusVal || 'TODO', assignVal, dateVal, titleVal, contentVal)
        // render the card from task's object
        displayCards(tasksList)

        // remove data
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