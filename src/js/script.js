// IMPORTS
import  { createElementHtml, createElementCardParent, createElementsOfCardParent } from "./createCardItem.js"
import { btnTest } from "./elementsHtml.js"
import { filterTodos, searchTask } from './filterTask.js'
import { renderTodo } from './renderTodo.js'
import { saveDataTask } from "./saveTodo.js"
import { setLocalStorage, getLocalStorage } from  "./moduleStorage.js"

// GLOBAL VARIABLES
let data = []
let id = 0

// SELEÇÃO DE ELEMENTOS DO DOM
const todoAddTask = document.querySelector("#form-add-task")
const todoTitleInputTask = document.querySelector("#todo-title-task")
const todoDescriptionInputTask = document.querySelector("#todo-description-task")
const todoEditTask = document.querySelector("#form-edit-task")
const todoEditIdTask = document.querySelector("#todo-editing-id-task")
const todoEditTitleTask = document.querySelector('#todo-editing-title-task')
const todoEditDescriptionTask = document.querySelector('#todo-editing-description-task')
const todoSearch = document.querySelector("#toolbar")
const todoListTask = document.querySelector("#todo-task-list")
const btnCancelEditTask = document.querySelector('#todo-cancel-edit')
const btnSaveEditTask = document.querySelector('#todo-save-edit')
const inputSearch = document.querySelector('#input-search')
const filterSelect = document.querySelector('#filter-select')

// FUNÇÕES

    btnCancelEditTask.addEventListener('click', toggleEditMode)
    btnSaveEditTask.addEventListener('click', saveEditTask)
    



    // FUNÇÃO ALTERNA ENTRE O MODO DE ADIÇÃO E EDIÇÃO DAS TASK.
    function toggleEditMode(){

        todoEditTask.classList.toggle('hide')
        todoAddTask.classList.toggle('hide')
        todoSearch.classList.toggle('hide')
        todoListTask.classList.toggle('hide')

    }
    

    // FUNÇÃO QUE BUSCA QUAL A TASK QUE ESTA SENDO E EDITADA
    function openEditMode(identify){
        let id = todoEditIdTask
        let title = todoEditTitleTask
        let description = todoEditDescriptionTask

        data.forEach((task)=>{
            if (task.id === identify){
                console.log(task.id)
                id.value = task.id
                title.value = task.title
                description.value = task.description
            }
        }) 
    }

    // FUNÇÃO QUE SALVA OS DADOS ATUALIZADAS DA TASK EDITADA
    function saveEditTask(){

        let id = parseInt(todoEditIdTask.value)
        let title = todoEditTitleTask.value
        let description = todoEditDescriptionTask.value

        data.forEach((task)=>{
            if (task.id === id){
                task.title = title
                task.description = description
                renderTodo(data)
                setLocalStorage(JSON.stringify(data))
                toggleEditMode()
            }
        })
        console.log('--------------')
        data.forEach((element)=>{
            console.log(element)
        })

    }



// EVENTOS
    // EVENTO QUE ESCUTA SE O CONTEÚDO DA PÁGINA FOI CARREGADO
    document.addEventListener("DOMContentLoaded", ()=>{
        
        if (!sessionStorage.key(1)) {
           sessionStorage.setItem('FirstVisit', false)
           setLocalStorage(undefined)
        } else {
            let dataStorage = JSON.parse(getLocalStorage())
            if (dataStorage != undefined){
                dataStorage.forEach(e => {
                    data.push(e)
                    renderTodo(data)
                })
            }
        }
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
        let task
        for (let character of btnClicked.id){
            id = parseInt(character)
        }

        if (btnClicked.getAttribute('id') === 'erase-search'){
            element.preventDefault()
            searchTask(inputSearch.value, filterSelect.value)
            // console.log(inputSearch.value, filterSelect.value)
        }

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE FINALIZAR A TASK
        if (btnClicked.classList.contains('finish-todo')){

            // PERCORRE A LISTA DE TASK E COMPARA QUAL O VALOR DE STATUS, AO IDENTIFICAR O VALOR ALTERA OU INSERE DE ACORDO COM A OPÇÃO.
            for (task of data){
                // console.log(task)
                // console.log(id)
                // SE O ID DA TASK FOR IGUAL AO ID DO BOTÃO ELE DEVE ALTERAR
                if (task.id === id){
                    console.log('é igual')
                    // SE O VALOR DO CAMPO STATUS FOR IGUAL A "DONE", DEVE SER ALTERADO PARA "TO-DO"
                    if (task.status === 'done'){
                        task.status = 'todo'
                        renderTodo(data)
                        setLocalStorage(JSON.stringify(data))
                    }
                    // DO CONTRÁRIO DEVE INSERIR O VALOR "DONE" NO CAMPO STATUS
                    else {
                        task.status = 'done'
                        renderTodo(data)
                        setLocalStorage(JSON.stringify(data))
                    }
                }
            }
        }

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE EDITAR
        if (btnClicked.classList.contains('edit-todo')){
            openEditMode(id)
            toggleEditMode()
        }
        

        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE DELETAR
        if (btnClicked.classList.contains('delete-todo')){
            let newData = []
            for (task of data){
                if (task.id !== id){
                    newData.push(task)
                }
            }
            data = newData
            renderTodo(data)
            setLocalStorage(JSON.stringify(data))
        }

    })
