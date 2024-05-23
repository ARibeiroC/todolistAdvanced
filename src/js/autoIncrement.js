// FUNÇÃO QUE AUTO INCREMENTA OS VALORES DO ID

import { getAlltask } from "./apiControl.js";
import dataFrame from "./script.js";


export function autoIncrementId(dataFrame) {
    let id

    if (dataFrame.length > 0){
        dataFrame.forEach((task)=>{
            id = task.code
        })
        id = id + 1
    } else {
        id = 0
    }
    return id
}
