export async function deleteRequest(id) {
    const url = `http://localhost:3000/api/clients/${id}`
    try{
        const response = await fetch(url, {
            method: 'DELETE'
        })
    }catch(error){
        console.error(error)
    }
}