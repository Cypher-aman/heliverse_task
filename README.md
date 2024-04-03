# Team Management Application

This repository contains the Team Management Application, an internship project featuring a React frontend and a Node.js backend. Follow the instructions below to set up the project on your local machine.

### Prerequisites
Before starting, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB database (either local or remote)
## Setup Instructions
1. Clone the project to your local machine using Git:

```
https://github.com/Cypher-aman/heliverse_task.git
cd your-project-name
```
2. Server Setup
Navigate to the server directory:

```
cd server
```
Use code with caution.
Install project dependencies:

```
npm install
```
Use code with caution.
Set up environment variables:

3. Create a file named .env in the server directory.
Add the following content to the .env file, replacing your_mongodb_connection_string with your actual MongoDB connection string:
```
PORT=8000
DB_URL=your_mongodb_connection_string
```
Start the server:

```
npm run dev
```
Use code with caution.
The server will now be running on http://localhost:8000.

4. Client Setup
Navigate to the client directory:

```
cd client
```
Install project dependencies:

```
npm install
```
Use code with caution.
Configure environment variables:

Create a file named .env in the client directory.
Add the following content to the .env file:
```
VITE_BASE_API_URL=http://localhost:8000
```
Start the client development server:

```
npm run dev
```
Use code with caution.
Access the client application at http://localhost:5173.

Using the Application

With both the server and client running, open your browser and go to http://localhost:5173 to start using the application. Ensure the server is running at http://localhost:8000 to handle API requests from the client.
## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

