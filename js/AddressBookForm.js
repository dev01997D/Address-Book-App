let contactObj ={};
let isUpdate = false;
window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector(".text-error");
    let nameRegex = RegExp("^([A-Z]{1}[A-Za-z]{2,}[ ]?){1,}$");
    validateEntry(name, nameRegex, textError);

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector(".phone-error");
    let phoneRegex = RegExp("^[+]?([0-9]{2}[ ])?[6-9]{1}[0-9]{9}$");
    validateEntry(phone, phoneRegex, phoneError);

    const address = document.querySelector('#address');
    const addressError = document.querySelector(".address-error");
    let addressRegex = RegExp("^([A-Za-z0-9/,-.]{2,}[ ]?)+$");
    validateEntry(address, addressRegex, addressError);

    function validateEntry(entry, regex, errorField) {
        entry.addEventListener('input', function () {
            if (regex.test(entry.value) || entry.value.length == 0)
                errorField.textContent = "";
            else
                errorField.textContent = "Invalid entry in the column";
        });
    }

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        localStorage.clear();
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
    alert(contactObj.toString());
}

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList==null){
        contactList=[];
    }
    if (contactList) {
        let contactData = contactList.find(contact => contact._id == contactObj._id);
        if (!contactData) {
            contactList.push(createContact());
        } else {
            const index = contactList.map(contact => contact._id).indexOf(contactData._id);
            contactList.splice(index, 1, createContact(contactData._id));
        }
    } else {
        contactList = [createContact()];
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

//When contact available set same object
const createContact = (id) => {
    let contactData = new Contact();
    if (!id) contactData.id = createNewContactId();
    else contactData.id = id;
    setContactData(contactData);
    return contactData;
}

//Setting the same Contact for updation
const setContactData=(contactData) =>{
    contactData._name = document.querySelector('#name').value;
    contactData._phone = document.querySelector('#phone').value;
    contactData._address = document.querySelector('#address').value;
    contactData._city = document.querySelector('#city').value;
    contactData._state = document.querySelector('#state').value;
    contactData._zip = document.querySelector('#zip').value;
}

//Generating contact id for all objects
const createNewContactId = () => {
    let empID = localStorage.getItem("ContactID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("ContactID", empID);
    return empID;
}

const setContactObject = () => {
    try {
        // contactObj._id = createNewContactId();
        contactObj._name = document.querySelector('#name').value;
        contactObj._phone = document.querySelector('#phone').value;
        contactObj._address = document.querySelector('#address').value;
        contactObj._city = document.querySelector('#city').value;
        contactObj._state = document.querySelector('#state').value;
        contactObj._zip = document.querySelector('#zip').value;
    } catch (e) {
        alert("Please enter valid details!");
    }
}

const resetForm = () => {
    document.querySelector("#name").value = "";
    document.querySelector('#phone').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#city').value = "";
    document.querySelector('#state').value = "";
    document.querySelector('#zip').value = "";
}

const cancel = () => {
    window.location.replace(site_properties.home_page);
}

//If update is clicked, redirect to page
const checkForUpdate = () => {
    const contactJSON = localStorage.getItem('editContact');
    isUpdate = contactJSON ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(contactJSON);
    setForm();
}

//On clicking update, populate all the details alredy filled there
const setForm = () => {
    document.querySelector('#name').value = contactObj._name;
    document.querySelector('#phone').value = contactObj._phone;
    document.querySelector('#address').value = contactObj._address;
    document.querySelector('#city').value = contactObj._city;
    document.querySelector('#state').value = contactObj._state;
    document.querySelector('#zip').value = contactObj._zip;
}