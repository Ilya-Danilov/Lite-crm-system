import * as get from '../CRUD/get.js'
import * as general from '../mainJs/addAndEditCard/general.js'
import * as patch from '../CRUD/patch.js'
import * as del from '../CRUD/delete.js'

const tbody = document.querySelector('.main__tbody')
const loading = document.querySelector('.main__load')
const tooltip = document.getElementById('tooltip')
const edit = document.getElementById('but-edit-client')
const visibleEdit = document.getElementById('background-form-edit-clent')
const exit = document.getElementById('exit-form-edit-client')
const editName = document.getElementById('edit-name')
const editSurname = document.getElementById('edit-surname')
const editLastname = document.getElementById('edit-lastname')
const containerForContact = document.getElementById('edit-contacts')

let currentClientId = null

exit.addEventListener('click', () => {
    visibleEdit.style.display = 'none'
})

function createClient(client) {
    const tr = document.createElement('tr')
    tr.classList.add('main__row')

    const id = document.createElement('td')
    id.classList.add('id')
    id.textContent = client.id

    const name = document.createElement('td')
    name.textContent = `${client.surname} ${client.name} ${client.lastName}`
    name.classList.add('name')

    const create = document.createElement('td')
    const dateObjCreate = new Date(client.createdAt)
    const dateCreate = dateObjCreate.toLocaleDateString('ru-RU')
    const timeCreate = dateObjCreate.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    })
    create.textContent = `${dateCreate} ${timeCreate}`
    create.classList.add('create')

    const editCell = document.createElement('td')
    const dateObjEdit = new Date(client.updatedAt)
    const dateEdit = dateObjEdit.toLocaleDateString('ru-RU')
    const timeEdit = dateObjEdit.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    })
    editCell.textContent = `${dateEdit} ${timeEdit}`
    editCell.classList.add('edit')

    const contacts = document.createElement('td')
    contacts.classList.add('contacts')

    let iconSrc = ''

    client.contacts.forEach(element => {
        const a = document.createElement('a')
        switch (element.type) {
            case 'Телефон':
            case 'Phone':
                iconSrc = 'frontend/img/social-media-logo/phone.png';
                a.href = 'javascript:void(0)'
                break;
            case 'Email':
                iconSrc = 'frontend/img/social-media-logo/mail.png';
                a.href = 'javascript:void(0)'
                break;
            case 'Vk':
                iconSrc = 'frontend/img/social-media-logo/VK.svg';
                a.href = `${element.value}`
                break;
            case 'Facebook':
                iconSrc = 'frontend/img/social-media-logo/fsbook.png';
                a.href = `${element.value}`
                break;
            default:
                iconSrc = 'frontend/img/social-media-logo/rest.png';
                a.href = `${element.value}`
                break;
        }
        const iconDiv = document.createElement('div')
        iconDiv.classList.add('icon-div')
        const iconImg = document.createElement('img')
        iconImg.classList.add('icon-img')
        iconImg.src = `${iconSrc}`
        a.append(iconDiv, iconImg)
        contacts.append(a)
        a.addEventListener('mouseenter', () => {
            tooltip.textContent = a.getAttribute('data-tooltip');
            tooltip.style.display = 'block';
        })
        a.addEventListener('mousemove', (e) => {
            tooltip.textContent = `${element.value}`
            tooltip.style.left = e.clientX + 10 + 'px';
            tooltip.style.top = e.clientY + 10 + 'px';
        });
        a.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
    const actions = document.createElement('td')
    actions.classList.add('actions')

    const editBut = document.createElement('button')
    editBut.classList.add('edit-but')
    editBut.textContent = 'Изменить'
    editBut.addEventListener('click', () => {

        const contacts = document.querySelectorAll('#choice-contacts')
        contacts.forEach(element => element.remove())
        visibleEdit.style.display = 'block'
        editName.value = client.name
        editSurname.value = client.surname
        editLastname.value = client.lastName
        client.contacts.forEach((contact) => {
            general.addCardContact(containerForContact, contact.value, contact.type)
        })
        currentClientId = client.id
    })

    const delBut = document.createElement('button')
    delBut.classList.add('del-but')
    delBut.textContent = 'Удалить'

    delBut.addEventListener('click', () => {
        del.deleteRequest(client.id)
    })

    actions.append(editBut, delBut)
    tr.append(id, name, create, editCell, contacts, actions,)
    tbody.append(tr)
}

edit.addEventListener('click', (e) => {
    e.preventDefault()
    if (!currentClientId) return
    const data = { contacts: [] }
    const contact = document.querySelectorAll('#choice-contacts')
    data.name = editName.value
    data.surname = editSurname.value
    data.lastName = editLastname.value
    contact.forEach((element) => {
        const type = element.querySelector('select')
        const inputContact = element.querySelector('input')

        const dataContact = { type: type.value, value: inputContact.value }
        data.contacts.push(dataContact)
    })
    patch.patch(currentClientId, data)
    visibleEdit.style.display = 'none'

    tbody.innerHTML = ''
    rendering()
})

export async function rendering(data) {
    loading.style.display = 'none'
    tbody.textContent = ''
    data.forEach((client) => {
        createClient(client)
    })

}