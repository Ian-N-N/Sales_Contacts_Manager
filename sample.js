const BASE_URL = "http://localhost:3000/contacts";
const contactsContainer = document.getElementById("contacts-container");
const form = document.getElementById("contact-form");

// Fetch & display all contacts on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchContacts();
});

// Fetch contacts from server
function fetchContacts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(renderContacts)
    .catch(err => console.error("Error fetching contacts:", err));
}

// Render each contact as a card
function renderContacts(contacts) {
  contactsContainer.innerHTML = ""; // Clear container
  contacts.forEach(contact => {
    const card = document.createElement("div");
    card.classList.add("contact-card");

    card.innerHTML = `
      <h3>${contact.name}</h3>
      <p>Email: ${contact.email}</p>
      <p>Phone: ${contact.phone}</p>
      <p>Company: ${contact.company}</p>
      <p>Website: <a href="${contact.website}" target="_blank">${contact.website}</a></p>
      <button class="edit-btn" data-id="${contact.id}">Edit</button>
      <button class="delete-btn" data-id="${contact.id}">Delete</button>
    `;
    // Edit handler
    card.querySelector(".edit-btn").addEventListener("click", () => {
  populateFormForEdit(contact);
});
let editingContactId = null;

function populateFormForEdit(contact) {
  // Fill form fields with contact data
  form.name.value = contact.name;
  form.email.value = contact.email;
  form.phone.value = contact.phone;
  form.company.value = contact.company;
  form.website.value = contact.website;

  editingContactId = contact.id;

  // Change button text to indicate edit mode
  form.querySelector("button").textContent = "Update Contact";
}
    // Delete handler
    card.quContact(contact.id);
    });erySelector(".delete-btn").addEventListener("click", () => {
      delete

    contactsContainer.appendChild(card);
  });
}

// Add new contact
form.addEventListener("submit", e => {
  e.preventDefault();

  const newContact = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    company: form.company.value.trim(),
    website: form.website.value.trim()
  };

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newContact)
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      fetchContacts(); // Refresh list
    })
    .catch(err => console.error("Error adding contact:", err));
});

// Delete contact
function deleteContact(id) {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
    .then(() => fetchContacts())
    .catch(err => console.error("Error deleting contact:", err));
}