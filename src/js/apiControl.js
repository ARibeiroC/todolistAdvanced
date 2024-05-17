const api = 'https://ae47b0b2-515a-46c8-9850-77386934ee4e-00-2qh30ydbra79o.worf.replit.dev/'

async function postTask(data){
    // FAZENDO A REQUISIÇÃO PARA API
    let POST = api+'task'

    const res = await fetch(POST, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        mode: "cors",
        cache: 'default',
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })

    return console.log('Salvo com sucesso')
}


async function getAllTasks(){
    let urlAllTask = api+'alltask'
    const response = await fetch(urlAllTask)
    .then(res=> res.json())
    .then(data=> data)

    return response
}

export { postTask, getAllTasks }