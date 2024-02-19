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
            console.log(arrayTodoList[0])
            switch (e.target.id){

                case 'add-button':
                    validadeInputsFormAddTask()
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
                    renderTask()
                    renderLocalStorage(arrayTodoList)
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
                    console.log('Você clicou no card:', parent)
                    console.log('Você clicou no card:', parentEl)
                    arrayTodoList.forEach((e)=>{
                        
                        // console.log(e.id)
                        if (e.id === parseInt(parent)){
                            titleEditInput.value = e.title
                            descriptionEditInput.value = e.description
                        }
                    })
                    editCurrentId = parseInt(parent)
                    renderLocalStorage(arrayTodoList)
                    toggleForms()
                    break;

                case 'btn-remove':
                    parentEl.remove()
                    arrayTodoList.splice(parentEl.id, 1)
                    renderLocalStorage(arrayTodoList)
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
        function createTask(){

        // ADICIONANDO A TAREFA NA LISTA DE TAREFAS
            if (arrayTodoList[0] === undefined){
                arrayTodoList.push({
                    id: arrayTodoList.length,
                    title: titleTaskInput.value,
                    description: descriptionTaskInput.value
                })
            } else {
                if (arrayTodoList.length > 1){
                    arrayTodoList.push({
                        id: getlastId(),
                        title: titleTaskInput.value,
                        description: descriptionTaskInput.value
                    }) 
                }
            }

        // LIMPANDO OS INPUTS 
            titleTaskInput.value = ''
            descriptionTaskInput.value = ''

        // SETANDO O INPUT TITULO COM FOCO
            titleTaskInput.focus()

        // SETANDO OS DADOS NO LOCAL STORAGE
        renderLocalStorage(arrayTodoList)

        }
    
    // RENDERIZANDO O TAREFA NO DOCUMENTO HMTL
        async function renderTask(){
            todoTaskList.innerHTML = ''
            taskLocalStorage = await JSON.parse(localStorage.getItem('TaskList'))
            arrayTodoList.forEach((task)=>{
                // CRIANDO O ELEMENTO TO-DO 
                    const todo  = document.createElement('div')
                    todo.classList.add('todo')
                    todo.setAttribute('id', `${task.id}`)
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
                    titleTask.innerText = `${task.title}`
                    // console.log(todo)
        
                // CRIANDO O ELEMENTO QUE RECEBE A INFORMAÇÃO DO STATUS DA TASK
                    const pItemInfo = document.createElement('p')
                    itemInfo.appendChild(pItemInfo)
                    pItemInfo.innerText = 'to-do'
        
                // CRIANDO O ELEMENTO COM A DESCRIÇÃO DA TASK
                    const descriptionTask = document.createElement('p')
                    descriptionTask.classList.add('description-task')
                    todoTextItens.appendChild(descriptionTask)
                    descriptionTask.innerHTML = `${task.description}`
        
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
            })
            
        }


    // FUNÇÃO DE VALIDAÇÃO DOS CAMPOS PARA ADICIONAR AS TAREFAS.
        function validadeInputsFormAddTask(){
            if (titleTaskInput.value == '' || descriptionTaskInput.value == '') {
                alert('Não pode haver campos vazios')
                titleTaskInput.focus()
            } else {
                createTask()
                renderTask()
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
            console.log('Não existe dados')
        } else {
            arrayTodoList.forEach((e)=> {
                id = e.id
            })
        }
        
        return id+1
    }

    function renderLocalStorage(array){
        if (localStorage.getItem('TaskLis') !== 0){
            localStorage.setItem('TaskList', JSON.stringify(array))
        }
    }

    function validateLocalStorage(){
        if (!localStorage.getItem('TaskList')){
            renderLocalStorage(arrayTodoList)
        } else {
            let data = JSON.parse(localStorage.getItem('TaskList'))
            console.log(data)
            arrayTodoList.push(data[0])
        }
    }


