export async function patch(id, updatedUser) {
    const url = `http://localhost:3000/api/clients/${id}`
    try{
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
    }catch(error){
        console.error(error)
    }
}