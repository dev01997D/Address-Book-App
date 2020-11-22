window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th>Fullname</th><th>Address</th><th>City</th>"
        + "<th>State</th><th>Zip Code</th><th>Phone Number</th>";
    let innerHtml = `${headerHtml}`;
    let addressBookList = createContactsJSON();
    for (const contact of addressBookList) {
        innerHtml = `${innerHtml}
      <tr>
      <td>${contact._name}</td>
      <td>${contact._address}</td>
      <td>${contact._city}</td>
      <td>${contact._state}</td>
      <td>${contact._zip}</td>
      <td>${contact._phone}</td>
      <td>
          <img id="1" onclick="remove(this)" alt="delete"
              src="../assets/icons/delete-black-18dp.svg">
          <img id="1" alt="edit" onclick="update(this)" 
              src="../assets/icons/create-black-18dp.svg">
      </td>
      </tr>
      `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const createContactsJSON = () => {
    let contactList = [
        {
            _name: "Devnandan Kumar",
            _address: "H.No-2033, Barkatha",
            _city: "Hyderabad",
            _state: "Telangana",
            _zip: "506016",
            _phone: "7870752948"
        },
        {
            _name: "Shikha Pandey",
            _address: "H.No-201, Hazaribagh",
            _city: "Bangalore",
            _state: "Karanataka",
            _zip: "506004",
            _phone: "9873987564"
        }
    ];
    return contactList;
}