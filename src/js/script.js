// IMPORTS
import { searchTask } from './filterTask.js'
import { renderTodo } from './renderTodo.js'
import { saveDataTask } from "./saveTodo.js"
import { setLocalStorage, getLocalStorage } from  "./moduleStorage.js"
import { saveEditTask, openEditMode, toggleEditMode  } from './settingEditTodo.js'
import { postTask } from './apiControl.js'

// GLOBAL VARIABLES
let dataFrame = []
const api = 'https://ae47b0b2-515a-46c8-9850-77386934ee4e-00-2qh30ydbra79o.worf.replit.dev/'

// SELEÇÃO DE ELEMENTOS DO DOM
const todoAddTask = document.querySelector("#form-add-task")
const todoTitleInputTask = document.querySelector("#todo-title-task")
const todoDescriptionInputTask = document.querySelector("#todo-description-task")
const btnCancelEditTask = document.querySelector('#todo-cancel-edit')
const btnSaveEditTask = document.querySelector('#todo-save-edit')
const inputSearch = document.querySelector('#input-search')
const filterSelect = document.querySelector('#filter-select')


// EVENTOS
    // EVENTO QUE ESCUTA SE O CONTEÚDO DA PÁGINA FOI CARREGADO

    btnCancelEditTask.addEventListener('click', toggleEditMode)
    btnSaveEditTask.addEventListener('click', saveEditTask)

    document.addEventListener("DOMContentLoaded", ()=>{
        const endpoint = api+'alltask'
        fetch(endpoint)
        .then(res=>res.json())
        .then(data=>{
            dataFrame = data
            setLocalStorage(JSON.stringify(dataFrame))
            renderTodo(dataFrame)
        })
    })

    // EVENTO PARA ESCUTAR O INPUT DE PESQUISA
    document.addEventListener('change', (element)=>{
        element.preventDefault()
        const elementChanged = element.target
        if (elementChanged.getAttribute('id') === 'filter-select'){
            searchTask(inputSearch.value, elementChanged.value)
        }
    })
    

    // EVENTO DE ESCUTA O SUBMIT DO FORMULÁRIO PARA ADICIONAR TASK
    todoAddTask.addEventListener("submit", (element)=>{
        element.preventDefault()
        const titleAddTask = todoTitleInputTask.value
        const descriptionAddTask = todoDescriptionInputTask.value
        if (titleAddTask && descriptionAddTask){
            saveDataTask(titleAddTask, descriptionAddTask, data)

            // LIMPAMOS OS INPUTS DE INSERIR TASK E COLOCAMOS O CURSOS NO CAMPO TITLE
            todoTitleInputTask.value = ''
            todoDescriptionInputTask.value = ''
            todoTitleInputTask.focus()
        }

    })

    // EVENTO QUE ESCUTA O BOTÃO DE CONTROLE "FINISH-TODO"
    document.addEventListener('click', (element) => {
        // PEGANDO O ELEMENTO CLICADO
        const btnClicked = element.target
        
        // IDENTIFICANDO O ID DA ELEMENTO
        let id
        for (let character of btnClicked.id){
            id = parseInt(character)
        }

        if (btnClicked.getAttribute('id') === 'erase-search'){
            element.preventDefault()
            searchTask(inputSearch.value, filterSelect.value)
        }

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE FINALIZAR A TASK
        if (btnClicked.classList.contains('finish-todo')){

            let data = JSON.parse(getLocalStorage())
            // PERCORRE A LISTA DE TASKS E COMPARA QUAL O VALOR DE STATUS, AO IDENTIFICAR O VALOR ALTERA OU INSERE DE ACORDO COM A OPÇÃO.
            dataFrame = data
            dataFrame.forEach((task)=>{
                // VERIFICA SE O ID DA TASK É IGUAL AO ID DO BOTÃO DA TASK
                if (task.id === id){
                    // SE O VALOR DO CAMPO STATUS FOR IGUAL A "DONE", DEVE SER ALTERADO PARA "TO-DO"
                    if (task.status === 'done'){
                        task.status = 'todo'                        
                    }
                    // DO CONTRÁRIO DEVE INSERIR O VALOR "DONE" NO CAMPO STATUS
                    else {
                        task.status = 'done'
                    }
                    renderTodo(dataFrame)
                    setLocalStorage(JSON.stringify(dataFrame))
                }
                
            })
            postTask(dataFrame)
        }

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE EDITAR
        if (btnClicked.classList.contains('edit-todo')){
            toggleEditMode()
            openEditMode(id)
        }
        

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE DELETAR
        if (btnClicked.classList.contains('delete-todo')){
            console.log(dataFrame)
            if (dataFrame.length === 0){
                console.log('Vazio')
            } else {
                for (let i = 0; i < dataFrame.length; i++ ){
                    if ( dataFrame[i].id == id){
                        dataFrame.splice(i, 1)
                    }                         
                }                    
                setLocalStorage(JSON.stringify(dataFrame))
                renderTodo(dataFrame)
            }
            postTask(dataFrame)
        }

    })


export { dataFrame as default, api, dataFrame }