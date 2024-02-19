// GLOBAL VARIABLES
    let arrayTodoList = []
    let editCurrentId;
    let taskLocalStorage;

    // GET ELEMENTS HTML

        // RECEBENDO OS FORMULÁRIOS TODO-FORM ADD TASK
            const formAddTask = document.querySelector('#form-add-task')

        // RECEBENDO OS ELEMENTOS HTML DO FORM DE ADICIONAR TAREFAS
            const titleTaskInput = document.querySelector('#todo-title-task')
            const descriptionTaskInput = document.querySelector('#todo-description-task')

        // RECEBENDO OS ELEMENTOS HTML DO FORM DE EDITAR TAREFAS
            const formEditTask = document.querySelector('#form-edit-task')
            const titleEditInput = document.querySelector('#todo-editing-title-task')
            const descriptionEditInput = document.querySelector('#todo-editing-description-task')
            const cancelEditBtn = document.querySelector('#todo-cancel-edit')
            const saveEditBtn = document.querySelector('#todo-save-edit')

        // RECEBENDO OS ELEMENTO HTML DO FORM DA TOOLBAR
            const toolbar = document.querySelector('#toolbar')

        // RECEBENDO OS ELEMENTOS HTML DOS CARDS DEA LISTA DE TAREFAS
            const todoTaskList = document.querySelector('#todo-task-list')
            const btnDone = document.querySelector('btn-done')
            const btnEdit = document.querySelector('btn-edit')
            const btnRemove = document.querySelector('btn-remove')
            const todo = document.querySelector('.todo')
            const itemInfo = document.querySelector('.item-info')




// EVENTOS DO DOCUMENTO

    // ESCUTANDO O CARREGAMENTO DO DOCUMENTO E OCULTANDO O ELEMENTO DE TASK SE AINDA ESTIVER VAZIO
        document.addEventListener("DOMContentLoaded", function () {
            todoTaskList.style.overflowY = 'hidden'
            todoTaskList.style.display = 'flex'
            validateLocalStorage()
        });


    // ESCUTANDO O CLICK DO BOTÃO ADD-TASK E EXECUTANDO SUAS FUNÇÕES
        document.addEventListener('click', (e)=>{
            e.preventDefault()
            switch (e.target.id){

                case 'add-button':
                    validadeInputsFormAddTask()
                    renderTask()
                    break

                case 'todo-cancel-edit':
                    toggleForms()
                    break

                case 'todo-save-edit':
                    arrayTodoList.forEach((e)=>{
                        if (e.id === editCurrentId){
                            e.title = titleEditInput.value
                            e.description = descriptionEditInput.value
                            console.log(arrayTodoList)
                        }                        
                    })                  
                    renderLocalStorage(JSON.stringify(arrayTodoList))
                    renderTask()
                    toggleForms()
                break
            }


        // CONTROLE DOS BOTÕES DA TASK
            const targetEl = e.target
            const parentEl = targetEl.parentNode.parentNode

            switch (targetEl.className) {
                case 'btn-done':
                    parentEl.classList.toggle('done')
                    if (parentEl.classList.contains('done')) {
                        parentEl.childNodes[0].childNodes[0].childNodes[1].innerText = 'done'
                        // console.log(parentEl.id)
                    }else{
                        parentEl.childNodes[0].childNodes[0].childNodes[1].innerText = 'to-do'
                        // console.log(parentEl)
                    }
                    break;

                case 'btn-edit':
                    const parent = parentEl.getAttribute('id')
                    // console.log('Você clicou no card:', parent)
                    // console.log('Você clicou no card:', parentEl)
                    // console.log(arrayTodoList)
                    arrayTodoList.forEach((e)=>{
                        // console.log(e.id)
                        if (e.id === parseInt(parent)){
                            titleEditInput.value = e.title
                            descriptionEditInput.value = e.description
                        }
                    })

                    console.log(taskLocalStorage)
                    editCurrentId = parseInt(parent)
                    toggleForms()
                    break;

                case 'btn-remove':
                    
                    let indexId
                    arrayTodoList.forEach((e)=>{
                        if (e.id === parseInt(parentEl.getAttribute('id')))  {
                            indexId = e.id
                        }
                    })
                    if (arrayTodoList.length > 1) {
                        arrayTodoList.splice(indexId,1)
                        renderLocalStorage(JSON.stringify(arrayTodoList))
                        renderTask()
                    }else {
                        arrayTodoList.pop()
                        arrayTodoList.push({
                            0:'Não existe nenhuma tarefa'
                        })
                        renderLocalStorage(JSON.stringify(arrayTodoList))
                        renderTask('')
                    }
                    break;
            
                default:
                    break;
            }
            
            
    })

    // cancelEditBtn.addEventListener('click', (e)=>{
    //     e.preventDefault()
    //     toggleForms()
    // })

// FUNÇÕES DA APLICAÇÃO


// CRIANDO A TASK E PASSANDO PARA O DOM
    
    // FUNÇÃO QUE CRIA OS ELEMENTOS ATRAVÉS DO DOM (ELEMENTO POR ELEMENTO)
        function createTask(title, description){
        // ADICIONANDO A TAREFA NA LISTA DE TAREFAS
            if (arrayTodoList[0] === null || typeof(arrayTodoList[0]) === 'string'){
                arrayTodoList.pop()
                console.log('igual a 0')
                arrayTodoList.push({
                    id: arrayTodoList.length,
                    title: title,
                    description: description
                })
            } else {
                let indexId;
                arrayTodoList.forEach((e)=>{
                    indexId = e.id
                })

                if (typeof(arrayTodoList[0][0]) === 'string'){
                    arrayTodoList.pop()
                    arrayTodoList.push({
                        id: arrayTodoList.length,
                        title: title,
                        description: description
                    })
                } else {
                    console.log('Não é um texto')
                    arrayTodoList.push({
                        id: indexId+1,
                        title: title,
                        description: description
                    })
                }
            }
        // SETANDO OS DADOS NO LOCAL STORAGE
            renderLocalStorage(JSON.stringify(arrayTodoList))

        // LIMPANDO OS INPUTS 
            titleTaskInput.value = ''
            descriptionTaskInput.value = ''

        // SETANDO O INPUT TITULO COM FOCO
            titleTaskInput.focus()

        // RENDERIZAR NA PÁGINA
        }
    
    // RENDERIZANDO O TAREFA NO DOCUMENTO HMTL
        async function renderTask(msg){
            todoTaskList.innerHTML = ''
            // console.log(arrayTodoList.length)
            arrayTodoList.forEach((e)=>{
                if (msg === undefined){
                        // CRIANDO O ELEMENTO TO-DO 
                            const todo  = document.createElement('div')
                            todo.classList.add('todo')
                            todo.setAttribute('id', `${e.id}`)
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
                            titleTask.innerText = `${e.title}`
                            // console.log(todo)
                
                        // CRIANDO O ELEMENTO QUE RECEBE A INFORMAÇÃO DO STATUS DA TASK
                            const pItemInfo = document.createElement('p')
                            itemInfo.appendChild(pItemInfo)
                            pItemInfo.innerText = 'to-do'
                
                        // CRIANDO O ELEMENTO COM A DESCRIÇÃO DA TASK
                            const descriptionTask = document.createElement('p')
                            descriptionTask.classList.add('description-task')
                            todoTextItens.appendChild(descriptionTask)
                            descriptionTask.innerHTML = `${e.description}`
                
                        // CRIANDO O ELEMENTO DIV QUE RECEBERÁ OS BOTÕES
                            const buttonActionarrayTodo = document.createElement('div')
                            buttonActionarrayTodo.classList.add('button-action-todo-list')
                            todo.appendChild(buttonActionarrayTodo)
                
                        // CRIANDO OS BOTÕES DA TASK
                            const btnDone = document.createElement('button')
                            btnDone.classList.add('btn-done')
                            buttonActionarrayTodo.appendChild(btnDone)
                            btnDone.setAttribute('name', 'done-task-button')
                
                            const btnEdit = document.createElement('button')
                            btnEdit.classList.add('btn-edit')
                            buttonActionarrayTodo.appendChild(btnEdit)
                            btnEdit.setAttribute('name', 'edit-task-button')
                
                            const btnRemove = document.createElement('button')
                            btnRemove.classList.add('btn-remove')
                            buttonActionarrayTodo.appendChild(btnRemove)
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
                
                        // ORGANIZANDO OS ITENS DA LISTA DE TAREFAS
                            heightTodo = todoTaskList.getBoundingClientRect()
                            heightTodo = Math.round(heightTodo.height)
                            if (heightTodo > 116){
                                todoTaskList.style.overflowY = 'scroll'
                            }
                        } else {
                            const todo  = document.createElement('div')
                            todo.classList.add('hide')
                        }
                    })
                }


    // FUNÇÃO DE VALIDAÇÃO DOS CAMPOS PARA ADICIONAR AS TAREFAS.
        function validadeInputsFormAddTask(){
            if (titleTaskInput.value == '' || descriptionTaskInput.value == '') {
                alert('Não pode haver campos vazios')
                titleTaskInput.focus()
            } else {
                createTask(titleTaskInput.value, descriptionTaskInput.value)
            }
        }

    // FUNÇÃO QUE TROCA O MODO DE VISUALIZAÇÃO DOS FORMS (ADD-TASK E EDIT-TASK)
        function toggleForms() {
            formEditTask.classList.toggle('hide')
            formAddTask.classList.toggle('hide')
            toolbar.classList.toggle('hide')

            if (todoTaskList.style.display === 'flex'){
                todoTaskList.style.display = 'none'
            }else {
                todoTaskList.style.display = 'flex'
            }      
        }


    function cancelEditForm() {
        cancelEditBtn.addEventListener('click', (e)=>{
            e.preventDefault()
            toggleForms()
        })
    }


    function getlastId(){
        let id;
        if (arrayTodoList.length === 0){
            createTask({0:0})
        } else {
            arrayTodoList.forEach((e)=> {
                id = e.id
            })
        }
        
        return parseInt(id)+1
    }

    function renderLocalStorage(arr){
        localStorage.setItem('TaskList', arr)
    }

    function validateLocalStorage(){
        if (localStorage.getItem('TaskList') === null){
            console.log('É sua primeira vez navegando, registe uma tarefa')
            arrayTodoList.push(null)
            renderLocalStorage(arrayTodoList)
            console.log(arrayTodoList) 
            console.log(arrayTodoList.length) 
            console.log('IF')     
        } else if (localStorage.getItem('TaskList') === undefined || localStorage.getItem('TaskList') === ''){
            console.log(localStorage.getItem('TaskList'))
            arrayTodoList.push({0:null})
        } else {
            let data = JSON.parse(localStorage.getItem('TaskList'))
            data.forEach((e)=>{
                arrayTodoList.push(e)
            })
            if (typeof(arrayTodoList[0][0]) === 'string'){
                renderTask('')
            }else {
                // console.log(arrayTodoList[0][0])
                renderTask()
            }
        }
    }



