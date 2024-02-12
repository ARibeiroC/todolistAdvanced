// GLOBAL VARIABLES

// GET ELEMENTS HTML
const titleTaskInput = document.querySelector('#todo-title-task')
const descriptionTaskInput = document.querySelector('#todo-description-task')
const todoForm = document.querySelector('#todo-form')
const titleEditInput = document.querySelector('#todo-editing-task')
const descriptionEditInput = document.querySelector('#todo-editing-description-task')
const cancalEditBtn = document.querySelector('#todo-cancel-edit')
const todoTaskList = document.querySelector('#todo-task-list')
const addTaskButton = document.querySelector('#add-button')


document.addEventListener("DOMContentLoaded", function (event) {
    todoTaskList.style.display = 'none'
});

addTaskButton.addEventListener('click', (e)=>{
    e.preventDefault()
    saveTodo()
})

// SYSTEM FUNCTIONS
// function buttonClick(e) {
//     e.preventDefault()
//     if (e.target.id === 'add-button'){
//         console.log(titleTaskInput.value, descriptionTaskInput.value)
//     }else if (e.target.id === 'erase-search') {
//         console.log(e.target.id)
//     }
// }


function saveTodo(){
    todoTaskList.innerHTML += `
    <div class="todo">
        <div class="todo-text-itens">
            <div class="header-content-task">
                <h3 class="title-task">${titleTaskInput.value}</h3>
                <div class="item-info">
                    <p>À fazer</p>
                </div>
            </div>
            <p class="description-task">${descriptionTaskInput.value}</p>
        </div>
        <div class="button-action-todo-list">
            <button>
                <i class="fa-solid fa-check"></i>
            </button>
            <button>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
    `

    todoTaskList.style.display = 'flex'

    titleTaskInput.value = ''
    descriptionTaskInput.value = ''

    titleTaskInput.focus()
}

