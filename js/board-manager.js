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
let displayTitle = (itemList, selectedItems) => {

    let htmlContents = ''
    itemList.forEach(item => {
        // check if selected array includes task.id
        const isSelected = selectedItems.includes(item.id)
        const selectedClass = isSelected ? 'selected' : ''
        const switchClass = isSelected ? 'fas fa-square' : 'far fa-square'

        htmlContents += `
        <div class="card shadow rounded ${selectedClass}" data-item-id="${item.id}">
            <div class="card-body text-center">
                <button class="btn pin" type="button" value="Input"><i class="fas fa-map-pin"></i></button>
                <h4 class="title modal-link"><a class="btn modal-link" href="index.html?boardId=${item.id}" role="button">${item.title}</a></h4>
                <button class="btn edit" type="button" value="Input" data-toggle="modal" data-target="#modal-task"><i class="far fa-edit"></i></button>
                <button class="btn select" type="button" value="Input"><i class="select-btn ${switchClass}"></i></button>
            </div>
        </div>
        `
    })
    cardsContainer.innerHTML = htmlContents
}


class BoardManager {
    // define a tasks and a selected array for delete
    constructor(newId) {
        this.items = [] //testTasks 
        this.selectedItems = []
        this.currentID = newId || 0
    }

    addTask(title) {
        const item = {
            id: this.currentID,
            title: title,
        }
        this.items.push(item)
        this.currentID++;
    }

    // Save tasks to local storage
    save() {
        let tasksJson = JSON.stringify(this.items)
        let idJson = JSON.stringify(this.currentID)
        localStorage.setItem('items', tasksJson)
        localStorage.setItem('id', idJson)
    }

    // Load data from local storage
    load() {
        let getTasks = localStorage.getItem('items')
        let tasksParse = JSON.parse(getTasks) || []
        this.items = tasksParse
        let getId = localStorage.getItem('id') || 0
        let idParse = JSON.parse(getId)
        this.currentID = idParse

        displayTitle(this.items, this.selectedItems)
    }

    // Select and toggle card for delete
    selectTask(taskId) {
        if (this.selectedItems.includes(taskId)) {
            // remove the item from the selected list if it's already in the list
            this.selectedItems = this.selectedItems.filter(id => id !== taskId)
        } else {
            this.selectedItems.push(taskId)
        }

        displayTitle(this.items, this.selectedItems)
    }

    // clear up seleted array
    clearSelected() {
        this.selectedItems = []
    }

    // Delete task
    deleteTask(taskId) {
        this.items = this.items.filter(item => item.id !== taskId)
        this.save()
    }

    // Get task object through targeted card's id
    findTask(taskId) {
        const item = this.items.find(item => item.id === taskId)
        return item
    }

    editTask(editId, title) {
        const taskData = this.findTask(editId)
        taskData.title = title
        // find index in the array
        const taskIndex = this.items.findIndex(task => task.id === editId)
        this.items[taskIndex] = taskData
    }

}

let newBoardManager = new BoardManager()
newBoardManager.load()
displayTitle(newBoardManager.items, newBoardManager.selectedItems)