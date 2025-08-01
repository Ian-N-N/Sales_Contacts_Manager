#  Sales Contacts Manager Web Application

> A modern, single-page **Sales Contacts Manager** built using HTML, CSS, and JavaScript, connected to a `json-server` backend for data storage and retrieval. The app enables users to **add, view, edit, and delete sales contacts** seamlessly, all in one place, without requiring page reloads. From the page, one is also able to change the background image displayed using the `theme` button and also view the contact details by clicking on the name you want to view details. 


##  Features

-  **Show Contacts**: All contacts can be loaded and viewed in a responsive 3-column card layout(click on show contacts).
-  **Show Contact Details**: viewing details of each contact in the database(click on the name you wish to see the contact details)
-  **Add Contact**: A user-friendly form to add new contacts.
-  **Edit Contact**: Modify an existing contact's information.
-  **Delete Contact**: Remove a contact from the database.
-  **Theme Mode**: Toggle between two images.
-  **Responsive Layout**: Fully responsive and visually appealing modern UI using CSS Grid.
-  **Asynchronous API**: Uses `fetch()` and `json-server` to interact with the backend without page reloads. 

##  Getting Started (Local Development)

### Prerequisites:
- [Node.js](https://nodejs.org/) installed<!--the node.js will be a link that redirects you to node website where you can downloade node.js if you dont have it-->
- `json-server` installed globally or locally

## Project Structure
```text
sales-contacts-manager/
 db.json
 index.html
 style.css
 script.js
 README.md
```
##  Project Setup instructions
### 1.  Clone the Repository
``` bash
git clone https://github.com/Ian-N-N/Sales_Contacts_Manager.git
cd Sales_Contacts_Manager 
``` 
### 2. Install JSON server(if not installed already)
```bash
npm install -g json-server
```

### 3. Run the server
```bash
json-server --watch db.json
```

### 4. Open the Web application
Ensure you are in the correct directory in your terminal then enter the code below:
```bash
explorer.exe index.html
```
## Live Demo
For the live demo, one can just click on the link provided below:<br>
[View the Live Site](https://ian-n-n.github.io/Sales_Contacts_Manager/)

## Auhtor
Ian Ngoru Njuguna
