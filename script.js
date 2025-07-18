const BASE_URL = "http://localhost:3000/contacts";//used in fetch() calls to get, add, delete or update contact data
const contactsContainer = document.getElementById("contacts-container");//Grabs the DOM element where the contacts will be displayed
const form = document.getElementById("contact-form");//selects the html form which will be used to add or update contacts
const toggleThemeBtn = document.getElementById("toggle-theme");//gets the button that prompts the theme color to change from light to dark
const showContactsBtn = document.getElementById("show-contacts-btn");
const submitBtn = document.getElementById("submit-btn");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const toast = document.getElementById("toast");

let editingContactId = null;
let contactsData = [];

// On load, bind events
document.addEventListener("DOMContentLoaded", () => {
  toggleThemeBtn.addEventListener("click", toggleTheme);
  showContactsBtn.addEventListener("click", loadContacts);
  form.addEventListener("submit", handleSubmit);
  searchInput.addEventListener("input", renderContacts);
  sortSelect.addEventListener("change", renderContacts);
});

// Toggle light/dark theme 
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}
if (localStorage.getItem("theme")==="dark") document.body.classList.add("dark");

// Load contacts from db.json server
function loadContacts() {
  fetch(BASE_URL)
    .then(r=>r.json())
    .then(data => {
      contactsData = data;
      contactsContainer.classList.remove("hidden");
      renderContacts();
    });
}

// Render cards with filtering and sorting
function renderContacts() {
  const term = searchInput.value.toLowerCase();
  let list = contactsData.filter(c=>c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term));

  if (sortSelect.value==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  else list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));

  contactsContainer.innerHTML = "";
  list.forEach(c=>contactsContainer.appendChild(createCard(c)));
}

// Building a contact card element
function createCard(c){
  const card = document.createElement("div");
  card.className = "contact-card";

  const fav = document.createElement("button");
  fav.className = "favorite-btn";
  fav.textContent = c.favorite ? "★" : "☆";
  fav.addEventListener("click", ()=>toggleFavorite(c));

  const name = document.createElement("h3");
  name.textContent = c.name;

  const details = document.createElement("div");
  details.style.display = "none";
  details.innerHTML = `
  <p><strong>Email:</strong> <a href="mailto:${c.email}">${c.email}</a></p>
  <p><strong>Phone:</strong> <a href="tel:${c.phone}">${c.phone}</a></p>
  <p><strong>Company:</strong> ${c.company}</p>
  <p><strong>Website:</strong> <a href="${c.website}" target="_blank">${c.website}</a></p>
  <button class="edit-btn">Edit</button>
  <button class="delete-btn">Delete</button>
  `;

  name.addEventListener("click", ()=>details.style.display = details.style.display==="none"?"block":"none");
  details.querySelector(".edit-btn").addEventListener("click", ()=>populateForm(c));
  details.querySelector(".delete-btn").addEventListener("click", ()=>deleteContact(c.id));

  card.append(fav,name,details);
  return card;
}

// marking a card as favourite
function toggleFavorite(c){
  c.favorite = !c.favorite;
  fetch(`${BASE_URL}/${c.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({favorite:c.favorite})})
    .then(()=>showToast(c.favorite?"Marked favorite":"Removed favorite"));
  renderContacts();
}

// function to allow editing of the contact cards
function populateForm(c){
  form.name.value=c.name;
  form.email.value=c.email;
  form.phone.value=c.phone;
  form.company.value=c.company;
  form.website.value=c.website;
  editingContactId=c.id;
  submitBtn.textContent="Update Contact";
}

// Deleting contacts from the web application and also from the server
function deleteContact(id){
  fetch(`${BASE_URL}/${id}`,{method:"DELETE"})
    .then(()=>{ contactsData = contactsData.filter(c=>c.id!==id); renderContacts(); showToast("Deleted"); });
}

// Add or update contact
function handleSubmit(e){
  e.preventDefault();
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    company: form.company.value.trim(),
    website: form.website.value.trim(),
    favorite: false,
    createdAt: new Date().toISOString()//creating new javascript date object with current date and time in strring format(ISO 8601)
  };
  if(editingContactId){
    fetch(`${BASE_URL}/${editingContactId}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})//sending PATCH request to existing contact(partially update)
      .then(()=>showToast("Updated"))
      .then(()=>{editingContactId=null;form.reset();submitBtn.textContent="Add Contact";loadContacts();});
  } else {
    fetch(BASE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
      .then(()=>showToast("Added"))
      .then(loadContacts);
      form.reset();                      // Clears the input fields
      submitBtn.textContent = "Add Contact"; // Resets the button label
      editingContactId = null;          // Make sure you're no longer in edit mode
  }
}

// Toast notification
function showToast(msg){
  toast.textContent=msg;
  toast.classList.remove("hidden");
  setTimeout(()=>toast.classList.add("hidden"),2000);
}