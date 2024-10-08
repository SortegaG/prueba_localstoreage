const form = document.getElementById('contact-form');         // Variables que almacenan el formulario, listado de contactos y boton delete
const contactList = document.getElementById('contact-list');
const deleteAllButton = document.getElementById('delete-all');

document.addEventListener('DOMContentLoaded', loadContacts);

form.addEventListener('submit', function(event) {       // validacion de envío de datos
    event.preventDefault();                             

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const imageUrl = document.getElementById('image-url').value;  

    const contact = {       // Objeto donde almacenar variable         
        name,
        email,
        message,
        imageUrl  
    };

    saveContact(contact);
    displayContact(contact);
    
    form.reset();  
});

function saveContact(contact) {         // Funcion que almacena los datos en el localstoreage
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];  // Transforma la cadena obtenida o un array vacio
    contacts.push(contact);    // Introduce los valores en el objeto
    localStorage.setItem('contacts', JSON.stringify(contacts));  // Transformamos en un string
}

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];  // Transforma la cadena obtenida o un array vacio
    contacts.forEach(contact => displayContact(contact));  // 
}

function displayContact(contact) {
    const contactDiv = document.createElement('div');  // Creamos un div, le damos una clase y le añadimos
    contactDiv.classList.add('contact');                // codigo html

    contactDiv.innerHTML = `
        <p>Nombre: ${contact.name}</p>
        <p>Email: ${contact.email}</p>
        <p>Mensaje: ${contact.message}</p>
        ${contact.imageUrl ? `<img src="${contact.imageUrl}" alt="Imagen de ${contact.name}">` : ''}
    `;
    contactList.appendChild(contactDiv);
}


deleteAllButton.addEventListener('click', function() {  // Boton que elimina todo y limpia la lista de contactos 
    localStorage.clear();
    contactList.innerHTML = '';
});