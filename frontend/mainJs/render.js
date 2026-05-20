import * as get from '../CRUD/get.js'

const tbody = document.querySelector('.main__tbody')
const loading = document.querySelector('.main__load')
const tooltip = document.getElementById('tooltip')

function createClient(client){
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

    const edit = document.createElement('td')
    const dateObjEdit = new Date(client.updatedAt)
    const dateEdit = dateObjEdit.toLocaleDateString('ru-RU')
    const timeEdit = dateObjEdit.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    })
    edit.textContent = `${dateEdit} ${timeEdit}`
    edit.classList.add('edit')

    const contacts = document.createElement('td')
    contacts.classList.add('contacts')

    let iconSrc = ''

    client.contacts.forEach(element => {
        const a = document.createElement('a')
        switch(element.type){
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
    const delBut = document.createElement('button')
    delBut.classList.add('del-but')
    delBut.textContent = 'Удалить'
    actions.append(editBut, delBut)
    tr.append(id, name, create, edit, contacts, actions,)
    tbody.append(tr)
}

export async function rendering() {
    const data = await get.get()
    loading.style.display = 'none'
    data.forEach((client) => {
        createClient(client)
    })
    
}