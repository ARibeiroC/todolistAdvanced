import { todoListTask } from './elementsHtml.js'
import { saveTodo } from './saveTodo.js'

function renderTodo(data) {

    // RECARREGANDO A LISTA DE TASK (ZERANDO TODOS OS VALORES NO DOM E RECARREGANDO COM OS DADOS ATUALIZADOS)
    todoListTask.innerHTML = ''

    // PERCORREMOS CADA ITEM DA LISTA DA TASK E BUSCAMOS O VALOR QUE ESTA NO CAMPO STATUS, DE ACORDO COM O VALOR ELE RENDERIZA O ELEMENTO COM A CLASSE "DONE" OU NÃO.
    for (let task of data){
        if (task.status === 'to-do'){
            saveTodo(task)
        } else {
            saveTodo(task, task.status)
        }
    }
}

export { renderTodo }