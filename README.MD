# Introduction

Welcome to "Gymboree", a leading commercial provider of softplay equipment for children indoor play area with a range of functions. It is the perfect choice of thousands of parents who want to keep their children occupied. Here you will find everything you need to set up an indoor Gymboree for babies and toddlers. Softplay is an affordable and safe environment where the kids can play, explore, and make friends. Gymboree is built from high quality materials and component specifications so that it meets or exceeds all relevant safety standards. Careful details mean a better play experience and long lifetime. It is definitely a recommended way to let the kids release energy and have fun while you enjoy a break.

- my store was built using the following technologies: React, Typescript, Redux, SQLite3, Django, JWT, and Django Rest Framework.

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
Please clone the project, using one of the following commands:

git clone https://github.com/Iredel86/gymboree_final.git
git clone https://github.com/spike275/gymboree_final.git 
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
export const SERVER = "https://gymboree-final4.onrender.com/"

# LINK to MY WEBSITE
https://warm-hamster-a53749.netlify.app/

# FRONT
Once you have cloned the project, navigate to the following directory:

cd /gymboree_final/gymboree_front
use npm i in order to install all the packages needed to run the app; 

once the installation is completed use npm start



