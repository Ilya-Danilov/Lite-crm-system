export async function get() {
    const url = `http://localhost:3000/api/clients`
    try{
        const response = await fetch(url)
        const data = await response.json()
    } catch(error){
        console.error(error)
    }
    return data
}