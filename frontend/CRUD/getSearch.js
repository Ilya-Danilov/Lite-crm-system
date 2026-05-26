export async function getSearch(str){
    const url = `http://localhost:3000/api/clients?search=${str}`
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error){
        console.error(error)
    }
}