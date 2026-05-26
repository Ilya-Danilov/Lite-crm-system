import * as render from './mainJs/render.js'
import * as add from './mainJs/addAndEditCard/add.js'
import * as addOrEditGeneral from './mainJs/addAndEditCard/general.js'
import * as get from './CRUD/get.js'
import * as search from './mainJs/search.js'

const searchInput = document.querySelector('.header__search')

async function fullData() {
    const data = await get.get()
    render.rendering(data)
}

fullData()

let timeoutId

searchInput.addEventListener('input', (e) => {
    const str = e.target.value

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        if (str.length === 0) { fullData() }
        else {
            search.search(str)
        }
    }, 300);
})





add.openFormAddClent()
add.closeForm()
add.addClient()

addOrEditGeneral.addContact()
addOrEditGeneral.clearContacts()