import * as render from './mainJs/render.js'
import * as add from './mainJs/addAndEditCard/add.js'
import * as addOrEditGeneral from './mainJs/addAndEditCard/general.js'

render.rendering()

add.openFormAddClent()
add.closeForm()
add.addClient()

addOrEditGeneral.addContact()
addOrEditGeneral.clearContacts()