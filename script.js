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
    // If editing, send PATCH
    fetch(`${BASE_URL}/${editingContactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    })
      .then(res => res.json())
      .then(() => {
        editingContactId = null;
        form.reset();
        form.querySelector("button").textContent = "Add Contact";
        fetchContacts();
      })
      .catch(err => console.error("Error updating contact:", err));
  } else {
    // If adding new contact, POST
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        fetchContacts();
      })
      .catch(err => console.error("Error adding contact:", err));
  }
});