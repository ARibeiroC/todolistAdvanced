import { renderTodo } from './renderTodo.js'
import { getLocalStorage } from './moduleStorage.js'
import { inputSearch, filterSelect } from './elementsHtml.js'


function filterTodos(filterValue){
    const dataStorage = JSON.parse(getLocalStorage('task'))

    switch (filterValue){
        case "all":
            dataStorage.forEach((task)=>{
                renderTodo(dataStorage)
            })
            break

        case "done":
            const filteredDone = dataStorage.filter((task) => task.status === 'done')
            renderTodo(filteredDone)
            break
            
        case "todo":
            const filteredTodo = dataStorage.filter((task) => task.status === 'to-do')
            renderTodo(filteredTodo)
            break
            
        default:
            break
    }
}

function searchTask(title, filterValue){
    const dataStorage = JSON.parse(getLocalStorage('task'))
    console.log(`title: ${title}`)
    console.log(`filterValue: ${filterValue}`)

    dataStorage.forEach((i)=>{
        if (title !== '' && filterValue == 'all'){
            const searchFilter = dataStorage.filter((task)=> task.title === title)
            renderTodo(searchFilter)
        } else if (title !== '' && filterValue == i.status){
            const searchFilter = dataStorage.filter((task)=> task.status === filterValue)
            renderTodo(searchFilter)
        } else if (title === '' && filterValue === i.status){
            const searchFilter = dataStorage.filter((task)=> task.status === filterValue)
            renderTodo(searchFilter)
        } else if (title === '' && filterValue === 'all'){
            renderTodo(dataStorage)
        }
    })
}

export {filterTodos, searchTask}