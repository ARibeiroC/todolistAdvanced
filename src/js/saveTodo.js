import { todoListTask } from './elementsHtml.js'
import { createElementHtml, createElementCardParent, createElementsOfCardParent } from './createCardItem.js'
import { autoIncrementId } from './autoIncrement.js'
import { setLocalStorage } from './moduleStorage.js'
import { renderTodo } from './renderTodo.js'
import { postTask } from './apiControl.js'




function saveTodoTask(task, status = 'to-do') {

    // CRIANDO O CARD DA TASK
    const todo = createElementHtml('div')
    createElementCardParent(todo, todoListTask, 'todo', `${status}`, 'id', `${task.id}`)
    // const todo = createElementHtml('div')
    // console.log(todo)
    // addClass(todo, 'todo')
    // addClass(todo, `${status}`)
    // todo.setAttribute('id', task.id)
    // showElementInHtml(todoListTask, todo)

    // CRIANDO O CONTEÚDO DO HEADER DA TASK
    const headerContentTask = createElementHtml('div')
    createElementsOfCardParent(headerContentTask, todo, 'header-content-task')
    // addClass(headerContentTask, 'header-content-task')
    // showElementInHtml(todo, headerContentTask)
    
    // ESCREVENDO O TEXTO DO TÍTULO DA TASK
    const todoTitle = createElementHtml('h3')
    createElementsOfCardParent(todoTitle, headerContentTask, undefined, task.title)

    // todoTitle.innerText = task.title
    // headerContentTask.appendChild(todoTitle)

    // CRIANOD O CONTEÚDO DO BODY DA TASK
    const bodyContentTask = createElementHtml('div')
    createElementsOfCardParent(bodyContentTask, todo, 'body-content-task')
    // addClass(bodyContentTask, 'body-content-task')
    // todo.appendChild(bodyContentTask)

    // CRIANDO A DIV COM O STATUS DA TASK E ESCREVENDO O STATUS DEFAULT
    const todoStatus = createElementHtml('p')
    createElementsOfCardParent(todoStatus, headerContentTask, 'task-info', task.status)
    // addClass(todoStatus, 'task-info')
    // todoStatus.innerText = task.status
    // headerContentTask.appendChild(todoStatus)
    
    // ESCREVENDO O CONTEÚDO DO BODY DA TASK
    const todoDescription = createElementHtml('p')
    createElementsOfCardParent(todoDescription, bodyContentTask,'description-task', task.description)

    // todoDescription.classList.add()
    // todoDescription.innerText = task.description
    // bodyContentTask.appendChild(todoDescription)

    const buttonControllerArea = createElementHtml('p')
    createElementsOfCardParent(buttonControllerArea, bodyContentTask, 'button-controller-area')
    // buttonControllerArea.classList.add('button-controller-area')
    // bodyContentTask.appendChild(buttonControllerArea)


    // CRIANDO OS BOTÕES DE CONTROLE DA TASK

        // DONE BUTTON
        const doneBtn = createElementHtml('button')
        createElementsOfCardParent(doneBtn, buttonControllerArea, 'finish-todo', '<i class="fa-solid fa-check"></i>', 'id', `doneBtn${task.id}`)
        // doneBtn.classList.add('finish-todo')
        // doneBtn.setAttribute('id', `doneBtn${task.id}`)
        // doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        // buttonControllerArea.appendChild(doneBtn)

        // EDIT BUTTON
        const editBtn = document.createElement('button')
        createElementsOfCardParent(editBtn, buttonControllerArea, 'edit-todo', '<i class="fa-solid fa-pen-to-square"></i>', 'id', `editBtn${task.id}`)
        // editBtn.classList.add('edit-todo')
        // editBtn.setAttribute('id', `editBtn${task.id}`)
        // editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        // buttonControllerArea.appendChild(editBtn)

        // DELETE BUTTON
        const deleteBtn = document.createElement('button')
        createElementsOfCardParent(deleteBtn, buttonControllerArea, 'delete-todo', '<i class="fa-solid fa-trash"></i>', 'id', `deleteBtn${task.id}`)
        // deleteBtn.classList.add('delete-todo')
        // deleteBtn.setAttribute('id', `deleteBtn${task.id}`)
        // deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        // buttonControllerArea.appendChild(deleteBtn)

}

function saveDataTask(title, description, data) {

    // CRIAÇÃO DA VARIÁVEL QUE VAI RECEBER O OBJETO TASK
    let task
    let increment = autoIncrementId()

    // OBJETO TASK
    task = {
        id: increment,
        title: title,
        description: description,
        status: 'todo'
    }

    
    // INSERINDO O OBJETO NA LISTA DE TASK
    data.push(task)
    setLocalStorage(JSON.stringify(data))
    sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', false)
    
    postTask(data)    
    
    // RENDERIZANDO OS DADOS NO DOM
    renderTodo(data)
}




export {saveTodoTask, saveDataTask}