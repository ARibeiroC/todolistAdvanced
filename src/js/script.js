// GLOBAL VARIABLES
let data = []

// SELEÇÃO DE ELEMENTOS DO DOM
const todoAddTask = document.querySelector("#form-add-task")
const todoTitleInputTask = document.querySelector("#todo-title-task")
const todoDescriptionInputTask = document.querySelector("#todo-description-task")
const todoEditTask = document.querySelector("#form-edit-task")
const todoEditTitleTask = document.querySelector('#todo-editing-title-task')
const todoEditDescriptionTask = document.querySelector('#todo-editing-description-task')
const todoSearch = document.querySelector("#toolbar")
const todoListTask = document.querySelector("#todo-task-list")
const btnCancelEditTask = document.querySelector('#todo-cancel-edit')
const btnSaveEditTask = document.querySelector('#todo-save-edit')

// FUNÇÕES

    // CRIA E RENDERIZA OS ELEMENTOS DO DOM
    function saveTodo(task, status = 'to-do') {

        // CRIANDO O CARD DA TASK
        const todo = document.createElement("div")
        todo.classList.add("todo")
        todo.classList.add(`${status}`)
        todo.setAttribute('id', task.id)
        todoListTask.appendChild(todo)

        // CRIANDO O CONTEÚDO DO HEADER DA TASK
        const headerContentTask = document.createElement("div")
        headerContentTask.classList.add('header-content-task')
        todo.appendChild(headerContentTask)
        
        // ESCREVENDO O TEXTO DO TÍTULO DA TASK
        const todoTitle = document.createElement('h3')
        todoTitle.innerText = task.title
        headerContentTask.appendChild(todoTitle)

        // CRIANOD O CONTEÚDO DO BODY DA TASK
        const bodyContentTask = document.createElement("div")
        bodyContentTask.classList.add('body-content-task')
        todo.appendChild(bodyContentTask)

        // CRIANDO A DIV COM O STATUS DA TASK E ESCREVENDO O STATUS DEFAULT
        const todoStatus = document.createElement('p')
        todoStatus.classList.add('task-info')
        todoStatus.innerText = task.status
        headerContentTask.appendChild(todoStatus)
        
        // ESCREVENDO O CONTEÚDO DO BODY DA TASK
        const todoDescription = document.createElement('p')
        todoDescription.classList.add('description-task')
        todoDescription.innerText = task.description
        bodyContentTask.appendChild(todoDescription)

        const buttonControllerArea = document.createElement('div')
        buttonControllerArea.classList.add('button-controller-area')
        bodyContentTask.appendChild(buttonControllerArea)


        // CRIANDO OS BOTÕES DE CONTROLE DA TASK

            // DONE BUTTON
            const doneBtn = document.createElement('button')
            doneBtn.classList.add('finish-todo')
            doneBtn.setAttribute('id', `doneBtn${task.id}`)
            doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
            buttonControllerArea.appendChild(doneBtn)

            // EDIT BUTTON
            const editBtn = document.createElement('button')
            editBtn.classList.add('edit-todo')
            editBtn.setAttribute('id', `editBtn${task.id}`)
            editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
            buttonControllerArea.appendChild(editBtn)

            // DELETE BUTTON
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('delete-todo')
            deleteBtn.setAttribute('id', `deleteBtn${task.id}`)
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
            buttonControllerArea.appendChild(deleteBtn)

        // LIMPAMOS OS INPUTS DE INSERIR TASK E SETANDO O CURSOR NO CAMPO TITLE
        todoTitleInputTask.value = ''
        todoDescriptionInputTask.value = ''
        todoTitleInputTask.focus()
    }

    // FUNÇÃO QUE SALVA OS DADOS DA TASK
    function saveDataTask(title, description, data) {

        // CRIAÇÃO DA VARIÁVEL QUE VAI RECEBER O OBJETO TASK
        let task;

        // OBJETO TASK
        task = {
            id: autoIncrementId(data),
            title: title,
            description: description,
            status: 'to-do'
        }

        // INSERINDO O OBJETO NA LISTA DE TASK
        data.push(task)

        // RENDERIZANDO OS DADOS NO DOM
        renderTodo(data)
    }

    // FUNÇÃO QUE AUTO INCREMENTA OS VALORES DO ID
    function autoIncrementId(data) {
        let id = data.length
        return id
    }

    // FUNÇÃO QUE RENDERIZA OS DADOS DAS TAREFAS ATUALIZADOS, EXIBINDO-OS NO DOM
    function renderTodo(data) {

        // RECARREGANDO A LISTA DE TASK (ZERANDO TODOS OS VALORES NO DOM E RECARREGANDO COM OS DADOS ATUALIZADOS)
        todoListTask.innerHTML = ''

        // PERCORREMOS CADA ITEM DA LISTA DA TASK E BUSCAMOS O VALOR QUE ESTA NO CAMPO STATUS, DE ACORDO COM O VALOR ELE RENDERIZA O ELEMENTO COM A CLASSE "DONE" OU NÃO.
        for (task of data){
            if (task.status === 'to-do'){
                saveTodo(task)
            } else {
                saveTodo(task, task.status)
            }
        }

        // LIMPAMOS OS INPUTS DE INSERIR TASK E COLOCAMOS O CURSOS NO CAMPO TITLE
        todoTitleInputTask.value = ''
        todoDescriptionInputTask.value = ''
        todoTitleInputTask.focus()
    }


    // FUNÇÃO ALTERNA ENTRE O MODO DE ADIÇÃO E EDIÇÃO DAS TASK.
    function toggleEditMode(){

        todoEditTask.classList.toggle('hide')
        todoAddTask.classList.toggle('hide')
        todoSearch.classList.toggle('hide')
        todoListTask.classList.toggle('hide')

    }

    // FUNÇÃO QUE BUSCA QUAL A TASK QUE ESTA SENDO E EDITADA
    function openEditMode(id){
        let title = todoEditTitleTask
        let description = todoEditDescriptionTask

        data.forEach((task)=>{
            if (task.id === id){
                title.value = task.title
                description.value = task.description
            }
        })
        
        btnCancelEditTask.addEventListener('click', toggleEditMode)

        
        btnSaveEditTask.addEventListener('click', ()=> {
            saveEditTask(id)
        })
    }

    // FUNÇÃO QUE SALVA OS DADOS ATUALIZADAS DA TASK EDITADA
    function saveEditTask(id){

        let title = todoEditTitleTask.value
        let description = todoEditDescriptionTask.value

        data.forEach((task)=>{
            if (task.id === id){
                task.title = title
                task.description = description
                console.log(task)
            }
        })

        data.forEach((element)=>{
            console.log(element)
        })

    }

// EVENTOS

    // EVENDO DE ESCUTA DO FORMULÁRIO DE ADICIONAR TASK
    todoAddTask.addEventListener("submit", (element)=>{
        element.preventDefault()
        const titleAddTask = todoTitleInputTask.value
        const descriptionAddTask = todoDescriptionInputTask.value
        if (titleAddTask && descriptionAddTask){
            saveDataTask(titleAddTask, descriptionAddTask, data)
        }
    })

    // EVENTO QUE ESCUTA O BOTÃO DE CONTROLE "FINISH-TODO"
    document.addEventListener('click', (element) => {

        // PEGANDO O ELEMENTO CLICADO
        const btnClicked = element.target
        
        // IDENTIFICANDO O ID DA ELEMENTO
        let id
        for (character of btnClicked.id){
            id = parseInt(character)
        }


        // VERIFICANDO SE O ELEMENTO CLICADO É O BOTÃO DE FINALIZAR A TASK
        if (btnClicked.classList.contains('finish-todo')){

            // PERCORRE A LISTA DE TASK E COMPARA QUAL O VALOR DE STATUS, AO IDENTIFICAR O VALOR ALTERA OU INSERE DE ACORDO COM A OPÇÃO.
            for (task of data){

                // SE O ID DA TASK FOR IGUAL AO ID DO BOTÃO ELE DEVE ALTERAR
                if (task.id === id){

                    // SE O VALOR DO CAMPO STATUS FOR IGUAL A "DONE", DEVE SER ALTERADO PARA "TO-DO"
                    if (task.status === 'done'){
                        task.status = 'to-do'
                        renderTodo(data)
                    }
                    // DO CONTRÁRIO DEVE INSERIR O VALOR "DONE" NO CAMPO STATUS
                    else {
                        task.status = 'done'
                        renderTodo(data)
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
            renderTodo(newData)
        }

    })