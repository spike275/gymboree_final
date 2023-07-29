# Introduction

Welcome to "Gymboree", our equipments for sale becomes the perfect choice of thousands of parents who are looking to keep their childrens occupied. Here you will find everything you need to set up home Gymboree for babies and childrens.
It is definitely a recommended way to let the kids release energy and have fun while you enjoy a few good hours of quiet.

- my store is built with technology  including React, Typescript, Redux, SQLite3, Django, JWT, and Django Rest Framework.

# Features

Login + Register 
Active Cart + PayPal Live API.
Admin Panel using Django Administration.
User Profile + Updating Information.

# Browser Support
internet explorer, safari, google chrome, opera, edge and firefox browser's.

# Technologies Used
React, Typescript, Redux, SQLite3, Django, JWT, and Django Rest Framework, python.

# Installation
Deployments
The client-side portion of this project is hosted on Netlify and database management is handled by Render

For Docker deployment / testing on your device, the following instructions are provided. Please note some modifications in the code may be required.

# Pre-requisites
Please ensure you have the following installed on your local machine:

Python 3.x
Node.js and npm
pip
Django
Django Rest Framework
React
Redux

# backend
Please clone the project, using the following command:

git clone https://github.com/Iredel86/gymboree_final.git
Once you have cloned the project, navigate to the following directory:

cd /gymboree_final/gymboree_back
Now you need install virtual environment

pip install virtualenv
Now for create virtual environment in Windows

py -m virtualenv venv
In Mac

virtualenv env:

To use virtual environment in Windows:
.\myenv\Scripts\activate

In Mac:
source myenv/bin/activate

Install the Python requirements:
pip install -r requirements.txt
In the first Terminal window, run the following command to start the Django backend server:

Mac:
(myenv) python manage.py runserver

Windows:
(myenv) py manage.py runserver

Default admin user
# To access the admin panel of Django, please use the following credentials:
Username: IdoLiron
Password: 12345

Open the file titled 'globalVar.ts' and change the following line:
in render deploy
export const SERVER = "https://gymboree-mmic.onrender.com/"

# LINK to MY WEBSITE
https://warm-hamster-a53749.netlify.app/

# FRONT
Once you have cloned the project, navigate to the following directory:

cd /gymboree_final/gymboree_front
Now you need unstall al the packege for run app

npm i
After all the installation as finished

npm start



