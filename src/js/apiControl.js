import dataFrame from "./script.js"

const back4app = 'https://parseapi.back4app.com//parse/classes/'

async function postTask(data){
    // FAZENDO A REQUISIÇÃO PARA API

    let POST = `${back4app}task`
    const res = await fetch(POST, {
        method: "POST",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
        body: JSON.stringify(data)
    })

    return console.log('Armazenada com sucesso!!!')
}

async function getAlltask(){
    return await fetch(`${back4app}task`, {
        method: "GET",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
    }).then(response => response.json())
}


async function putTask(task, objectId){
    // FAZENDO A REQUISIÇÃO PARA API

    let PUT = `${back4app}task/${objectId}`
    task = {
        code: task.code,
        title: task.title,
        description: task.description,
        status: task.status
    }
    
    await fetch(PUT, {
        method: "PUT",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
        body: JSON.stringify(task)
    })

    return console.log('Alterado com sucesso!!!')
}

async function deleteTask(objectId){
    fetch(`${back4app}/task/${objectId}`, {
        method: "DELETE",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
    })

    return console.log('Deletada com sucesso!!!')
}





export { postTask, putTask, getAlltask, deleteTask }