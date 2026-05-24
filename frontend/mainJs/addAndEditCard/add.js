import * as main from './general.js'
import * as post from '../../CRUD/post.js'

const exit = document.getElementById('exit-form-add-client')
const form = document.getElementById('background-form-add-clent')
const add = document.getElementById('but-add-client')
const name = document.getElementById('add-name')
const surname = document.getElementById('add-surname')
const lastName = document.getElementById('add-lastname')


export function openFormAddClent() {
    main.hendlerTheAddOrEditBut('Добавить клиента', 'Добавить')
}

export function closeForm() {
    exit.addEventListener('click', () => {
        form.style.display = 'none'
    })
}

export function addClient() {
    add.addEventListener('click', (e) => {
        e.preventDefault()
        const contact = document.querySelectorAll('#choice-contacts')
        const client = { contacts: [] }
        client.name = name.value
        client.surname = surname.value
        client.lastName = lastName.value
        contact.forEach((element) => {
            const type = element.querySelector('select')
            const inputContact = element.querySelector('input')

            const dataContact = { type: type.value, value: inputContact.value }
            client.contacts.push(dataContact)
        })
        console.log(client)
        post.post(client)
    })
}
