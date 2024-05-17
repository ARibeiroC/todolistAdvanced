// IMPORT
import { todoEditIdTask, todoEditTitleTask, todoEditDescriptionTask } from "./elementsHtml.js"
import { getLocalStorage, setLocalStorage } from "./moduleStorage.js"
import { todoEditTask, todoAddTask, todoSearch, todoListTask } from "./elementsHtml.js"
import { api } from "./script.js"
import { renderTodo } from "./renderTodo.js"
import { postTask } from './apiControl.js'



// VARIÁVEIS GLOBAIS

// MÓDULOS
// CONTROLA OS ELEMENTOS DO DOM QUE DEVEM APARECE QUANDO ENTRA OU SAI DO MODO DE EDIÇÃO
    function toggleEditMode(){
        todoEditTask.classList.toggle('hide')
        todoAddTask.classList.toggle('hide')
        todoSearch.classList.toggle('hide')
        todoListTask.classList.toggle('hide')
    }


// GERENCIA OS DADOS DA TASK SELECIONADA, QUE DEVE SER EDITADA
    function openEditMode(identify){
        let dataStorage = JSON.parse(getLocalStorage('task'))
        let id = todoEditIdTask
        let title = todoEditTitleTask
        let description = todoEditDescriptionTask

        dataStorage.forEach((task)=>{
            if (task.id === identify){
                id.value = task.id
                title.value = task.title
                description.value = task.description
            }
        }) 
    }

// SALVA OS DADOS DAS ALTERAÇÃO E ARMAZENA NO DATAFRAME RESPONSÁVEL.
async function saveEditTask(){

    const response = await fetch(api+'alltask')
    .then(res=> res.json())
    let data = []
    let id = parseInt(todoEditIdTask.value)
    let title = todoEditTitleTask.value
    let description = todoEditDescriptionTask.value

    response.forEach((task)=>{
        if (task.id === id){
                task.title = title
                task.description = description
        }
        data.push(task)
    })
    renderTodo(data)
    setLocalStorage(JSON.stringify(data))    
    postTask(data)
    toggleEditMode()
}

export { saveEditTask, openEditMode, toggleEditMode }