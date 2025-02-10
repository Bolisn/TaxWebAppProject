# TaxWebAppProject

Taxculate is a web application that based on the users input, calculates his taxes and gives him 
personalised advice on ways to optimise his taxes or investments, all with the help of our 
specially created AI Agent. The styles and colors are inspired by Apple's Calculator App, retaining 
a minimal structure. 

Below i list the steps i followed to create this App. 
Fore more information on the frontend, goto line 99 and backend goto line 144

------------------------------------------------------------------------------------------------------

I used JavaScript and React + Vite for the frontend development 
Inside the TaxWebAppProject file, i followed the steps below to activate the enviroment
and install the required libraries (you should also in order to activate it)

open a new terminal
 - npm create vite@latest frontend -- --template react
Select a framework >> React
Select a variant >> JavaScript

 - cd frontend
 - npm install 
 - npm install axios, react-router-dom, jwt-decode
 - npm run dev 

---------------------------------------------------------------------------------------------------------

I used Python and Django for the Backend development
Inside the TaxWebAppProject file, I followed the steps below to activate the enviroment and 
start the server

open a new terminal
 - python -m venv env 
 - env/Scripts/Activate
 - pip -r install requirements.txt  (create a file requirements.txt first and add the libraries you need, in order to install them all)
 - django-admin startproject backend
 - cd backend
 - python manage.py startapp Taxapp
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py runserver

---------------------------------------------------------------------------------------------------------------

Frontend-Backend integration 

in order to run the frontend and backend at this stage of the project, i have to split the terminal
and manually start each server, and check the logs of each one seperatly in order to debug and fix the errors
 - Set correctly the api.js (axios instance) 
 - set the VITE_API_URL in a new .env in the frontend with the url of the Backend server 
 - make sure the path you post from your Frontend exists in the Backend 
first i start with the authorization, with the access tokens and refresh tokens
then i set the post methods from Frontend to Backend

-----------------------------------------------------------------------------------------------------------------

For the OpenAI API Key, and the integration of an AI Model in one API i followed these steps:

- First integrate the OpenAI API Key in the system (i created a new .env file and stored it there for safety) 
and using dotenv i define it in the system file
- Then i created Taxapp/AiAgent.py and in there i imported the key, created the prompt and define the AI Model
that i will use. 
- Then i import this in my views.py in order to "create" the API and route it for post and get requests 
- Finally, i created a AiAgent.jsx component in the frontend, to handle the post and get requests in the frontend (integration)


------------------------------------------------------------------------------------------------------------

To upload my project to Docker, i created 2 Dockerfiles (one for the backend and one for the frontend)

- In each one i defined the requirements to run the selected framework, the ports and the commands.
- Then i created a docker-compose.yaml file in the root of the TaxWebAppProject, to define, configure, and manage the containers as part of a single application.
- Since i decided to work with the sqlite3 database (integrated by default to django) there is no need to connect a new 
database , i just mount it to the docker-compose.yaml. Also, i mounted the code from frontend and backend in order to 
hot-reload any changes i need to make in development. 

NOTE: It is not optimal (and useful) to integrate and sent the database in this way. 

To run the application now, i used the commands:
- docker-compose build
- docker-compose up

or on Docker Desktop start it manually 

---------------------------------------------------------------------------------------------------------------------------

At last, i created a CI/CD Pipeline with Github Actions.

- I created a test case for the backend that i test in the pipeline, in Taxapp/tests.py . Except for testing, this pipeline checks the code from the repository and sets the python version and Virtual Enviroment (venv). 
In the deployment aspect, it logs into my Docker Hub (i added my credentials as a secret in my repository in GitHub from the add a secret section), 
builds and pushes the backend and frontend Docker Images and deployes the app with the file docker-compose.prod.yml 
(production file, i also left the development one (compose-docker.yaml) for future developments).

- Make sure to put the file( mine is ci-cd.yml) in the path .github\workflows\ or else the GitHub won't recognise the file 

-------------------------------------------------------------------------------------------------------------------------

frontend explanations:

Axios is a JavaScript library that simplifies making HTTP requests (like GET, POST, PUT, DELETE) from the browser or Node.js to interact with APIs.

React Router Dom is a library that enables navigation and routing in React applications, allowing you to define and manage routes for different components and URLs in a single-page application.
 
jwt decode is a library that decodes JSON Web Tokens (JWT) to extract the payload (such as user data or claims) without verifying its signature or  validity.

in src/components: I created some "tools" that i used in my pages

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


in scr/styles: I created the CSS files to style the corresponding jsx files (names are same)

in constants.js I define and export the tokens, used as keys, for the authentication proccess

in api.js i use Axios to create an instance with a base URL to automatically attach a token 
          to the authorization header in every request, if it exists

            !!! create an .env file and define there the url of the backend host (for security)

in App.jsx i define the main routing structure of the app, and clear the localstorage

The main.jsx file is responsible for "bootstrapping" the React application and injecting it into 
the HTML DOM, serving as the bridge between the React code and the browser

in public folder, a store my .svg file for the favicon i used  

the files i dont mention are autocreated files from the framework

-----------------------------------------------------------------------------------------------------------------

Backend explanations:

in the Backend, I created 2 folders (with the instructions above at the start), backend and Taxapp

in the backend folder(project), I only made changes to 

    -settings.py: I added specific settings for the project to run (made a comment beside each line i added)
    -urls.py: defines the URL path and routes HTTP requests to APIs or views

in the Taxapp folder, I created all of our APIs. The fisrt 2 files i created them manually

    -serializers.py: it converts models data to JSON format for API responses and validations
    -urls.py: defines the URL path and routes HTTP requests to APIs or views (only for the Taxapp, i integrate 
                it in the urls.py file above)
    -views.py: contains the logic for handling HTTP requests (API structure and functions)
    -tests.py: contains a test i created for the validation of the OpenAI API Key

    -AiAgent.py: handles the setup and the response from OpenAI ChatGPT 

The rest of the files that exists in the backend are created automatically and i did not change them at all.

in the requirements.txt: i add the libraries and frameworks that i will need in order to install them together
                         and also for organization reasons

- asgiref: Provides asynchronous server gateway interface (ASGI) utilities for Django to support asynchronous communication.
- Django: A high-level Python web framework for building web applications efficiently.
- django-cors-headers: Middleware to handle Cross-Origin Resource Sharing (CORS) in Django projects.
- djangorestframework: A toolkit for building robust and flexible REST APIs in Django.
- djangorestframework-simplejwt: Provides JSON Web Token (JWT) authentication support for Django REST Framework.
- PyJWT: A library to encode, decode, and verify JSON Web Tokens (JWT).
- pytz: Handles timezone definitions and conversions for Python projects.
- sqlparse: A library to parse, format, and manipulate SQL queries.
- python-dotenv: Reads and loads environment variables from .env files into the application.
- openai: A library to interact with OpenAI's APIs, enabling integration with AI models like GPT.
