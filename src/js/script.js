// GLOBAL VARIABLES

// GET ELEMENTS HTML

    // GET ELEMENTS TODO-FORM INPUTS
    const titleTaskInput = document.querySelector('#todo-title-task')
    const descriptionTaskInput = document.querySelector('#todo-description-task')


// const todoForm = document.querySelector('#todo-form')
// const titleEditInput = document.querySelector('#todo-editing-task')
// const descriptionEditInput = document.querySelector('#todo-editing-description-task')
// const cancalEditBtn = document.querySelector('#todo-cancel-edit')

    // GET ELEMENTS DA TASK
    const todoTaskList = document.querySelector('#todo-task-list')
    const btnDone = document.querySelector('btn-done')
    const btnEdit = document.querySelector('btn-edit')
    const btnRemove = document.querySelector('btn-RebtnRemove')
    const addTaskButton = document.querySelector('#add-button')
    const todo = document.querySelector('.todo')
    const itemInfo = document.querySelector('.item-info')



// EVENTOS DO DOCUMENTO

    // ESCUTANDO O CARREGAMENTO DO DOCUMENTO E OCULTANDO O ELEMENTO DE TASK SE AINDA ESTIVER VAZIO
    document.addEventListener("DOMContentLoaded", function (event) {
        todoTaskList.style.display = 'none'
    });


    // ESCUTANDO O CLICK DO BOTÃO ADD-TASK E EXECUTANDO SUAS FUNÇÕES
    document.addEventListener('click', (e)=>{
        e.preventDefault()

        switch (e.target.id){

            case 'add-button':
                validadeInputsFormAddTask()
                break
        }


        // CONTROLE DOS BOTÕES DA TASK
        const targetEl = e.target
        const parentEl = targetEl.parentNode.parentNode

        switch (targetEl.className) {
            case 'btn-done':
                parentEl.classList.toggle('done')
                if (parentEl.classList.contains('done'))
                    parentEl.childNodes[0].childNodes[0].childNodes[1].innerText = 'done'
                    // parentEl.childNodes[1].childNodes[1].childNodes[3].innerText = 'done'
                else
                    parentEl.childNodes[0].childNodes[0].childNodes[1].innerText = 'to-do'
                    // parentEl.childNodes[1].childNodes[1].childNodes[3].innerText = 'to-do'
                break;

            case 'btn-edit':
                break;

            case 'btn-remove':
                parentEl.remove()
                break;
        
            default:
                break;
        }

        

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


// CRIANDO A TASK E PASSANDO PARA O DOM
    
    // CRIANDO OS ELEMENTOS MANIPULANDO O DOM (ELEMENTO POR ELEMENTO)
    function createTask(){

        // CRIANDO O ELEMENTO TO-DO
        const todo  = document.createElement('div')
        todo.classList.add('todo')
        todoTaskList.appendChild(todo)

        // CRIANDO O ELEMENTO TO-DO TEXT ITENS
        const todoTextItens = document.createElement('div')
        todoTextItens.classList.add('todo-text-itens')
        todo.appendChild(todoTextItens)

        // CRIANDO O ELEMENTO TO-DO TEXT ITENS
        const headerContentTask = document.createElement('div')
        headerContentTask.classList.add('header-content-task')
        todoTextItens.appendChild(headerContentTask)

        // CRIANDO O ELEMENTO TO-DO TEXT ITENS
        const titleTask = document.createElement('h3')
        const itemInfo = document.createElement('div')
        itemInfo.classList.add('item-info')
        headerContentTask.appendChild(titleTask)
        headerContentTask.appendChild(itemInfo)
        titleTask.innerText = `${titleTaskInput.value}`

        // CRIANDO O ELEMENTO QUE RECEBE A INFORMAÇÃO DO STATUS DA TASK
        const pItemInfo = document.createElement('p')
        itemInfo.appendChild(pItemInfo)
        pItemInfo.innerText = 'to-do'

        // CRIANDO O ELEMENTO COM A DESCRIÇÃO DA TASK
        const descriptionTask = document.createElement('p')
        descriptionTask.classList.add('description-task')
        todoTextItens.appendChild(descriptionTask)
        descriptionTask.innerHTML = `${descriptionTaskInput.value}`

        // CRIANDO O ELEMENTO DIV QUE RECEBERÁ OS BOTÕES
        const buttonActionTodoList = document.createElement('div')
        buttonActionTodoList.classList.add('button-action-todo-list')
        todo.appendChild(buttonActionTodoList)

        // CRIANDO OS BOTÕES DA TASK
        const btnDone = document.createElement('button')
        btnDone.classList.add('btn-done')
        buttonActionTodoList.appendChild(btnDone)
        btnDone.setAttribute('name', 'done-task-button')

        const btnEdit = document.createElement('button')
        btnEdit.classList.add('btn-edit')
        buttonActionTodoList.appendChild(btnEdit)
        btnEdit.setAttribute('name', 'edit-task-button')

        const btnRemove = document.createElement('button')
        btnRemove.classList.add('btn-remove')
        buttonActionTodoList.appendChild(btnRemove)
        btnRemove.setAttribute('name', 'remove-task-button')

        // CRIANDO OS ICONES DOS BOTÕES
        const iconBtnDone = document.createElement('i')
        iconBtnDone.classList.add('fa-solid')
        iconBtnDone.classList.add('fa-check')
        btnDone.appendChild(iconBtnDone)

        const iconBtnEdit = document.createElement('i')
        iconBtnEdit.classList.add('fa-solid')
        iconBtnEdit.classList.add('fa-pen-to-square')
        btnEdit.appendChild(iconBtnEdit)

        const iconBtnRemove = document.createElement('i')
        iconBtnRemove.classList.add('fa-solid')
        iconBtnRemove.classList.add('fa-xmark')
        btnRemove.appendChild(iconBtnRemove)



        todoTaskList.style.display = 'flex'

        titleTaskInput.value = ''
        descriptionTaskInput.value = ''

        titleTaskInput.focus()
    }

    function validadeInputsFormAddTask(){
        if (titleTaskInput.value == '' || descriptionTaskInput.value == '') {
            alert('Não pode haver campos vazios')
            titleTaskInput.focus()
        } else {
            createTask()
        }
    }

    function removeTodo(){
        parentEl.parentNode.remove()
    }

    function toggleForms() {

    }

    function showObject(){
        
        console.log(Object(addTaskButton))
    }

showObject()

