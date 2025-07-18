#  Sales Contacts Manager Web Application

> A modern, single-page **Sales Contacts Manager** built using HTML, CSS, and JavaScript, connected to a `json-server` backend for data storage and retrieval. The app allows users to **add, view, edit, and delete sales contacts** seamlessly, all in one place, without reloading the page.


##  Features

-  **View Contacts**: All contacts can be loaded and viewed in a responsive 3-column card layout.
-  **Add Contact**: A user-friendly form to add new contacts.
-  **Edit Contact**: Modify an existing contact's information using an intuitive form interface.
-  **Delete Contact**: Remove a contact from the database.
-  **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing.
-  **Contact Images**: Each contact has a circular image (can be replaced with real local image paths).
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

