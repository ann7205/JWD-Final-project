// console.log('this page')
const inputName = document.querySelector('#name')
const status = document.querySelector('.status')
const date = document.querySelector('#date')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')

//when user inputs the info of task: name, due date, task title, task content
//use a function to store and build up the structured data
//when click the submit button
//put the data into the local stroaage

// Name 
inputName.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid')
    inputLength = e.target.value.length
    // console.log(name.value)
    // let invalidFeedback = inputLength === 0 ? e.target.classList.add('invalid') :
    //     (inputLength > 15 ? e.target.classList.add('is-invalid'))
    if (inputLength === 0 || inputLength > 15) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

taskTitle.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid')
    inputLength = e.target.value.length
    if (inputLength === 0 || inputLength > 15) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Due-date 
date.addEventListener('change', (e) => {
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

// Description 
taskContent.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid')
    inputLength = e.target.value.length
    // console.log(name.value)
    if (inputLength === 0 || inputLength > 100) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})