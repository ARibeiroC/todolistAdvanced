const back4app = 'https://parseapi.back4app.com//parse/classes/'

async function postTask(data){
    // FAZENDO A REQUISIÇÃO PARA API

    let POST = `${back4app}task`
    console.log(POST)
    const res = await fetch(POST, {
        method: "POST",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
        body: JSON.stringify(data)
    })

    console.log(JSON.stringify(data))
    return console.log('Armazenado com sucesso')
}

async function putTask(task, objectId){
    // FAZENDO A REQUISIÇÃO PARA API

    let PUT = `${back4app}task/${objectId}`
    console.log(PUT)
    task = {
        code: task.code,
        title: task.title,
        description: task.description,
        status: task.status
    }
    
    fetch(PUT, {
        method: "PUT",
        headers: {'Content-type': 'application/json', 
        "X-Parse-REST-API-Key": "5LROSgkBJzLv0yQEiepGwvOgD5hjptsXJCK4HkqF", 
        "X-Parse-Application-Id": "idGULhV3R5fnsfKcgBlirH2KZPbAniZddCmZhJ2u"},
        body: JSON.stringify(task)
    })
    .then(response => console.log(response.status))
    .then(data => {
        console.log('Task: ', task)
        data = task
        console.log("data: ",data)
        return data
    })

    return console.log('Alterado com sucesso')
}





export { postTask, putTask }