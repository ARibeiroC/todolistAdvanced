// IMPORT
import { todoEditIdTask, todoEditTitleTask, todoEditDescriptionTask } from "./elementsHtml.js"
import { setLocalStorage } from "./moduleStorage.js"
import { todoEditTask, todoAddTask, todoSearch, todoListTask } from "./elementsHtml.js"
import { back4app } from "./script.js"
import { renderTodo } from "./renderTodo.js"
import { postTask, putTask } from './apiControl.js'



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
    function openEditMode(dataFrame, identify){
        dataFrame.forEach(task => {
            if (task.code === identify){
                let code = todoEditIdTask
                let title = todoEditTitleTask
                let description = todoEditDescriptionTask
    
                code.value = task.code
                title.value = task.title
                description.value = task.description
            }
        })
    }

// SALVA OS DADOS DAS ALTERAÇÃO E ARMAZENA NO DATAFRAME RESPONSÁVEL.
function saveEditTask(dataFrame){
    
    let objectId

    dataFrame.forEach(task=>{
        let code = parseInt(todoEditIdTask.value)
        if (task.code === code){
            let title = todoEditTitleTask.value
            let description = todoEditDescriptionTask.value

            task.title = title
            task.description = description
            putTask(task, task.objectId)
        }
    })
    renderTodo(dataFrame)
    setLocalStorage(JSON.stringify(dataFrame))
    toggleEditMode()
}

export { saveEditTask, openEditMode, toggleEditMode }