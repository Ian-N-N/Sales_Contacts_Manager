const BASE_URL = "http://localhost:3000/contacts";
const contactsContainer = document.getElementById("contacts-container");
const form = document.getElementById("contact-form");
const toggleThemeBtn = document.getElementById("toggle-theme");

let editingContactId = null;

document.addEventListener("DOMContentLoaded", () => {
  fetchContacts();
});

// Toggle dark/light theme
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Fetch contacts
function fetchContacts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(renderContacts)
    .catch(err => console.error("Error:", err));
}

// Render contacts with expandable details
function renderContacts(contacts) {
  contactsContainer.innerHTML = "";
  contacts.forEach(contact => {
    const card = document.createElement("div");
    card.classList.add("contact-card");

    const name = document.createElement("h3");
    name.textContent = contact.name;

    const details = document.createElement("div");
    details.style.display = "none"; // Hidden by default

    details.innerHTML = `
      <p>Email: ${contact.email}</p>
      <p>Phone: ${contact.phone}</p>
      <p>Company: ${contact.company}</p>
      <p>Website: <a href="${contact.website}" target="_blank">${contact.website}</a></p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Expand/collapse on name click
    name.addEventListener("click", () => {
      details.style.display = details.style.display === "none" ? "block" : "none";
    });

    // Edit contact
    details.querySelector(".edit-btn").addEventListener("click", () => {
      form.name.value = contact.name;
      form.email.value = contact.email;
      form.phone.value = contact.phone;
      form.company.value = contact.company;
      form.website.value = contact.website;
      editingContactId = contact.id;
      form.querySelector("button").textContent = "Update Contact";
    });

    // Delete contact
    details.querySelector(".delete-btn").addEventListener("click", () => {
      fetch(`${BASE_URL}/${contact.id}`, { method: "DELETE" })
        .then(() => fetchContacts());
    });

    card.appendChild(name);
    card.appendChild(details);
    contactsContainer.appendChild(card);
  });
}

// Add or update contact
form.addEventListener("submit", e => {
  e.preventDefault();

  const contactData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    company: form.company.value.trim(),
    website: form.website.value.trim()
  };

  if (editingContactId) {
    fetch(`${BASE_URL}/${editingContactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    })
      .then(() => {
        editingContactId = null;
        form.reset();
        form.querySelector("button").textContent = "Add Contact";
        fetchContacts();
      });
  } else {
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    })
      .then(() => {
        form.reset();
        fetchContacts();
      });
  }
});