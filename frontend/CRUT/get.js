export async function get() {
    const url = `http://localhost:3000/api/clients`
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error){
        console.error(error)
    }
}