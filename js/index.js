const inputName = document.querySelector('#name')
const statusBtn = document.querySelector('.status-dropdown')
const assignBtn = document.querySelector('.assign-dropdown')
const date = document.querySelector('#date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const form = document.querySelector('#form')
const submitBtn = document.querySelector('.sub-btn')
const cardsContainer = document.querySelector('.cards-container')

// Name validation
inputName.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    let inputValue = e.target.value.trim()
    let inputLength = inputValue.length
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
taskContent.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    let inputValue = e.target.value.trim()
    let inputLength = inputValue.length
    if (inputLength === 0 || inputLength > 50) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Status / assignedTo validation
let assignTo = ''
assignBtn.addEventListener('click', (e) => {
    assignTo = e.target.textContent
})

// Submit form
function submitForm(e) {
    e.preventDefault()

    let hasInvalid = false
    document.querySelectorAll('input').forEach(item => {
        if (!item.classList.contains('is-valid')) {
            hasInvalid = true;
        }
    })

    if (!hasInvalid && taskContent.classList.contains('is-valid')) {
        let nameVal = inputName.value
        let dateVal = date.value
        let assignVal = assignTo
        let titleVal = taskTitle.value
        let contentVal = taskContent.value

        testTaskManager.addTask(nameVal, assignVal, dateVal, titleVal, contentVal)

        displayCards(testTaskManager.tasks)

        inputName.value = ''
        date.value = ''
        assignTo = ''
        taskTitle.value = ''
        taskContent.value = ''
    } else {
        alert('Please complete the form')
        e.preventDefault()
        e.stopPropagation()
    }
}
submitBtn.addEventListener('click', submitForm)