// console.log('this page')
// const inputName = document.querySelector('#name')
// const status = document.querySelector('.status')
// const date = document.querySelector('#date')
// const taskTitle = document.querySelector('#task-title')
// const taskContent = document.querySelector('#task-content')

let testTaskManager = new TaskManager()

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
    if (inputLength === 0 || inputLength > 100) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

function submitForm(e) {
    e.preventDefault()
    document.querySelectorAll('input').forEach(item => item.classList.contains('is-valid'))
    if (taskContent.classList.contains('is-valid')) {
        let nameVal = inputName.value
        let dateVal = date.value
        let titleVal = taskTitle.value
        let contentVal = taskContent.value
        testTaskManager.addTask(nameVal, dateVal, titleVal, contentVal)
    } else {
        console.log('the form is invalid')
    }
}



submitBtn.addEventListener('click', submitForm)