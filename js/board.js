const titleInput = document.querySelector('#titleInput')
const submitBtn = document.querySelector('.sub-btn')
const cardsContainer = document.querySelector('#cards-container')
const binBtn = document.querySelector('.delete-list')
const card = document.querySelector('.card')
const inputs = document.querySelectorAll('input')
const delAllBtn = document.querySelector('.b-square .far.fa-square')

// set edit form is false and new form is true
let isEditForm = false
let editTaskId

// Task title validation
titleInput.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid', 'is-valid')
    let inputValue = e.target.value.trim()
    let inputLength = inputValue.length
    if (inputLength === 0 || inputLength > 20) {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.add('is-valid')
    }
})

// Submit form
function submitForm(e) {
    e.preventDefault()

    let titleVal = titleInput.value

    let allValid = true
    inputs.forEach(item => {
        if (item.classList.contains('is-invalid')) {
            allValid = false;
        }
    })

    // All the columns are valid, do follow steps
    if (allValid) {
        if (isEditForm) {
            newBoardManager.editTask(editTaskId, titleVal)
        } else {
            newBoardManager.addTask(titleVal)
        }

        newBoardManager.save()

        displayTitle(newBoardManager.items, newBoardManager.selectedItems)

        inputs.forEach(item => {
            item.classList.remove('is-valid')
        })

        // remove data from the form
        titleInput.value = ''

    } else {
        alert('Please complete the form')
        e.preventDefault()
        e.stopPropagation()
    }

}
submitBtn.addEventListener('click', submitForm)

// Remove all contents when clicking on the add button
document.querySelector('.add-new-title').addEventListener('click', () => {

    isEditForm = false

    titleInput.value = ''

    document.querySelectorAll('input').forEach(item => {
        item.classList.remove('is-valid', 'is-invalid')
    })
})

// Get task id
function findTaskId(element) {
    console.log(element)
    let cardElement = element

    while (cardElement.dataset.itemId === undefined) {
        cardElement = cardElement.parentElement
    }
    return Number(cardElement.dataset.itemId)
}

// Click on cards
function onCardClick(e) {
    let getId
    // select button for delete
    if (e.target.matches('.select-btn')) {
        getId = findTaskId(e.target)
        newBoardManager.selectTask(getId)
        // Open the modal by clicking card
    } else if (e.target.matches('.far.fa-edit')) {
        isEditForm = true

        getId = findTaskId(e.target)
        console.log(getId)
        editTaskId = getId

        const task = newBoardManager.findTask(getId)

        // Render back to the form
        titleInput.value = task.title
    }

    // Toggle to show or hidee bin button
    if (newBoardManager.selectedItems.length > 0) {
        binBtn.classList.remove('toggle-delete-btn')
    } else {
        binBtn.classList.add('toggle-delete-btn')
    }

}
cardsContainer.addEventListener('click', onCardClick)

// Click bin button
binBtn.addEventListener('click', (e) => {

    newBoardManager.selectedItems.forEach(taskId => {
        newBoardManager.deleteTask(taskId)
    })

    newBoardManager.clearSelected()
    binBtn.classList.add('toggle-delete-btn')
    delAllBtn.classList.remove('fas')

    displayTitle(newBoardManager.items, newBoardManager.selectedItems)
})

// Select all button
delAllBtn.addEventListener('click', (e) => {
    // e.target.classList.remove('far', 'fa-square')
    e.target.classList.toggle('fas')
    newBoardManager.items.forEach(item => {
        newBoardManager.selectTask(item.id)

        if (newBoardManager.selectedItems.length > 0) {
            binBtn.classList.remove('toggle-delete-btn')
        } else {
            binBtn.classList.add('toggle-delete-btn')
        }
    })
    // console.log(newBoardManager.selectedItems)
})