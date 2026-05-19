export async function post (data) {
    const url = `http://localhost:3000/api/clients`
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }catch(error){
        console.error(error)
    }

}