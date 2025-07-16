const BASE_URL = "http://localhost:3000/contacts";
const contactsList = document.getElementById("contacts-list");
const form = document.getElementById("contact-form");

// Fetch & display all contacts
document.addEventListener("DOMContentLoaded", () => {
  fetchContacts();
});

// GET contacts
function fetchContacts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(renderContacts)
    .catch(err => console.error("Error fetching contacts:", err));
}

// Render contacts with delete buttons
function renderContacts(contacts) {
  contactsList.innerHTML = "";
  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${contact.name}</strong><br>
      Email: ${contact.email}<br>
      Phone: ${contact.phone}<br>
      Company: ${contact.company}<br>
      Website: <a href="${contact.website}" target="_blank">${contact.website}</a><br>
      <button class="delete-btn" data-id="${contact.id}">Delete</button>
    `;
    contactsList.appendChild(li);

    // Add delete listener for each button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteContact(contact.id);
    });
  });
}

// POST new contact
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
    .then(data => {
      form.reset();
      fetchContacts(); // Refresh list
    })
    .catch(err => console.error("Error adding contact:", err));
});

// DELETE contact
function deleteContact(id) {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
    .then(() => fetchContacts())
    .catch(err => console.error("Error deleting contact:", err));
}