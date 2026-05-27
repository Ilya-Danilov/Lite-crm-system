import * as get from '../CRUD/get.js'
import * as rendering from '../mainJs/render.js'

const id = document.getElementById('h-id')
const name = document.getElementById('h-name')
const addDate = document.getElementById('h-dateAdd')
const editDate = document.getElementById('h-dateEdit')

let condition = {
    id: false,
    name: false,
    addDate: false,
    editDate: false
}

id.addEventListener('click', async () => {
    const data = await get.get()
    if (condition.id === false) {
        data.sort((a, b) => a.id - b.id)
        rendering.rendering(data)
        condition.id = true
    }
    else{
        data.sort((a, b) => b.id - a.id)
        rendering.rendering(data)
        condition.id = false
    }
})

name.addEventListener('click', async () => {
    const data = await get.get()
    if(condition.name === false){
        data.sort((a, b) => a.name.localeCompare(b.name))
        rendering.rendering(data)
        condition.name = true
    }
    else{
        data.sort((a, b) => b.name.localeCompare(a.name))
        rendering.rendering(data)
        condition.name = false
    }
})

addDate.addEventListener('click', async () => {
    const data = await get.get()
    
    if(!condition.addDate){
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        rendering.rendering(data)
        condition.addDate = true
    }
    else{
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        rendering.rendering(data)
        condition.addDate = false
    }
})
editDate.addEventListener('click', async () => {
    const data = await get.get()
    if(condition.editDate === false){
        data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
        rendering.rendering(data)
        condition.editDate = true
    }
    else{
        data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        rendering.rendering(data)
        condition.editDate = false
    }
})