// FUNÇÃO QUE AUTO INCREMENTA OS VALORES DO ID
import data from './script.js'

export function autoIncrementId() {
    let id
    if (data.length > 0){
        data.forEach((task)=>{
            id = task.id
        })
        return id = id + 1
    } else {
        id = 1
        return id
    }
}
