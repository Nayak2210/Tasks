let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editingIndex = -1;

function updateContactCount() {
  document.getElementById("contact-count").textContent = `Total Contacts: ${contacts.length}`;
}

function renderContacts(filteredContacts = contacts) {
  const list = document.getElementById("contact-list");
  list.innerHTML = "";
  filteredContacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${contact.name}</strong><br />
        📞 ${contact.phone}<br />
        ✉️ ${contact.email}
      </div>
      <div class="actions">
        <button onclick="editContact(${index})">Edit</button>
        <button class="delete" onclick="deleteContact(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
  updateContactCount();
}

function searchContacts() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
  renderContacts(filteredContacts);
}

function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    alert("Please fill all fields!");
    return;
  }

  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit Indian phone number.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const newContact = { name, phone, email };

  if (editingIndex > -1) {
    contacts[editingIndex] = newContact;
    alert("Contact updated!");
    editingIndex = -1;
  } else {
    contacts.push(newContact);
    alert("Contact saved successfully!");
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  editingIndex = index;
  alert(`Editing contact: ${contact.name}`);
}

function deleteContact(index) {
  const confirmDelete = confirm("Are you sure you want to delete this contact?");
  if (confirmDelete) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
  }
}

renderContacts();
