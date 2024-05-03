function setLocalStorage(data){        
    localStorage.setItem('task', data)
}

function getLocalStorage(){
    if (localStorage.getItem('task')){
        let lStorage = localStorage.getItem('task')
        return lStorage
    }
}

function jsonForObject(){
    if (getLocalStorage() != undefined){
        let object = JSON.parse(getLocalStorage())
        return object
    } else {
        console.log(getLocalStorage())
        console.error('Items not found in localStorage')
    }
}

export {setLocalStorage, getLocalStorage, jsonForObject}