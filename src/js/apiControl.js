const api = 'https://ae47b0b2-515a-46c8-9850-77386934ee4e-00-2qh30ydbra79o.worf.replit.dev/'
async function postTask(data){
    // FAZENDO A REQUISIÇÃO PARA API
    let POST = api+'task'
    const method = 'POST'
    const header = {
        'Content-type': 'application/json'
    }

    const post = await fetch(POST, {
        method: method,
        mode: "cors",
        cache: 'default',
        credentials: 'same-origin',
        headers: header,
        body: JSON.stringify(data)
    })

    return post
}


async function getAllTasks(){
    let urlAllTask = api+'alltask'
    const allTasks = await fetch(urlAllTask)

    return allTasks.json()
}


export {postTask, getAllTasks}