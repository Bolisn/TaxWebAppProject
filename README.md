# TaxWebAppProject

I started this project by creating a new repository from GitHub, setting up the LICENCE
I used JavaScript and React + Vite for the frontend development 
Inside the TaxWebAppProject file, i followed the steps below to activate the enviroment
and install the required libraries (you should also in order to activate it)

npm create vite@latest frontend -- --template react
Select a framework >> React
Select a variant >> JavaScript

cd frontend
npm install 
npm install axios, react-router-dom, jwt-decode
npm run dev 

frontend explanations:

Axios is a JavaScript library that simplifies making HTTP requests (like GET, POST, PUT, DELETE) from the browser or Node.js to interact with APIs.

React Router Dom is a library that enables navigation and routing in React applications, allowing you to define and manage routes for different components and URLs in a single-page application.
 
jwt decode is a library that decodes JSON Web Tokens (JWT) to extract the payload (such as user data or claims) without verifying its signature or  validity.

in src/components: i created some "tools" that i used in my pages

    -AiAgent.jsx: Handles the POST request to the backend
    -Footer.jsx: displays a message to the end of each page
    -Form.jsx: A form for the user to insert username and password
    -LoadingIndicator.jsx: a loading icon tha pops while waiting for backend response
    -ProtectedRoute.jsx: it ensures the token authorization and is used as a wrapper for 
                    route protection (user is obliged to login first to access homepage)

in src/pages: i created the pages that our app consists of and user can navigate to

    -Home.jsx: the main app page, here user inserts his info about income, expenses etc 
                and gets his calculated taxes and some advice from our AI Agent
    -Login.jsx: the login page, where user has to add his credentials to continiue 
    -NotFound.jsx: A page that shows up when a page user searches doesn't exist
    -Register.jsx: a register page, where user creates a new account to our app


in scr/styles: i created the CSS files to style the corresponding jsx files (names are same)

in constants.js i define and export the tokens, used as keys, for the authentication proccess

in api.js i use Axios to create an instance with a base URL to automatically attach a token 
          to the authorization header in every request, if it exists

            !!! create an .env file and define there the url of the backend host (for security)

in App.jsx i define the main routing structure of the app, and clear the localstorage

The main.jsx file is responsible for "bootstrapping" the React application and injecting it into 
the HTML DOM, serving as the bridge between the React code and the browser

in public folder, a store my .svg file for the favicon i used  

the files i dont mention are autocreated files from the framework

