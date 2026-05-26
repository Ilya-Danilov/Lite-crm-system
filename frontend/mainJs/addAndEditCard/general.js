const butAddOrEdit = document.getElementById('main__btn')
const addOrEditClient = document.getElementById('but-add-client')
const butAddContact = document.getElementById('but-add-contacts')
const header = document.getElementById('header-add-or-edit-contact')
const form = document.getElementById('background-form-add-clent')
const containerForContact = document.getElementById('add-contacts')
const exit = document.getElementById('exit-form-add-client')


export function hendlerTheAddOrEditBut(h, but) {
    butAddOrEdit.addEventListener('click', () => {
        header.textContent = h
        addOrEditClient.textContent = but
        form.style.display = 'block'
    })
}

export function addContact() {
    butAddContact.addEventListener('click', (e) => {
        e.preventDefault()
        const contacts = document.querySelectorAll('#choice-contacts')
        if (contacts.length < 10) {
           addCardContact(containerForContact) 
        }
    })
}

export function addCardContact(where, el = '', type = 'Phone') {
    const div = document.createElement('div')
            div.id = 'choice-contacts'
            const select = document.createElement('select')
            select.id = 'type-contact'
            const optionPhone = document.createElement('option')
            optionPhone.textContent = 'Телефон'
            optionPhone.value = 'Phone'
            const optionMail = document.createElement('option')
            optionMail.textContent = 'Email'
            optionMail.value = 'Email'
            const optionFacebook = document.createElement('option')
            optionFacebook.textContent = 'Facebook'
            optionFacebook.value = 'Facebook'
            const optionVk = document.createElement('option')
            optionVk.textContent = 'Vk'
            optionVk.value = 'Vk'
            const optionOther = document.createElement('option')
            optionOther.textContent = 'Другое'
            optionOther.value = 'Other'
            select.append(optionPhone, optionMail, optionFacebook, optionVk, optionOther)
            select.value = type
            const input = document.createElement('input')
            input.id = 'contacts'
            input.required = true
            input.value = el
            const but = document.createElement('button')
            but.id = 'but-del-contacts'
            but.textContent = 'X'
            div.append(select, input, but)
            where.prepend(div)
            but.addEventListener('click', () => {
                div.remove()
            })
}

export function clearContacts() {
    exit.addEventListener('click', () => {
        const contacns = document.querySelectorAll('#choice-contacts')
        contacns.forEach((el) => {
            el.remove()
        })
    })
}