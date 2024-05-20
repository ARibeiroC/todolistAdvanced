function setLocalStorage(tasklist){        
    localStorage.setItem('task', tasklist)
}

function getLocalStorage(){
    if (localStorage.getItem('task')){
        let lStorage = localStorage.getItem('task')
        return lStorage
    }
}

function jsonForObject(){
    if (getLocalStorage() != undefined){
        let object = JSON.parse(getLocalStorage('task'))
        return object
    } else {
        console.error('Items not found in localStorage')
    }
}

export {setLocalStorage, getLocalStorage, jsonForObject}