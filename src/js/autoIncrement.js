import { getLocalStorage } from "./moduleStorage.js"

// FUNÇÃO QUE AUTO INCREMENTA OS VALORES DO ID
function autoIncrementId() {
    let data = JSON.parse(getLocalStorage())
    let idTask, id
    const itemsTask = []
    if (data.length > 0){
        data.forEach((task)=>{
            console.log(task)
            itemsTask.push(task.id)
        })
        itemsTask.sort()
        itemsTask.forEach((id)=>{
            idTask = id
        })
        return id = idTask + 1
    } else {
        id = id + 1  
        return id
    }
}

export {autoIncrementId}