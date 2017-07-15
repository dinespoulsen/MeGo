# MeGo

## Introduction

The Mego project has been a sandbox for testing out several new techniques/technologies that I wanted to try out. I find myself more motivated when I'm building something more tangible so I treated the project as a potential product. I further wanted to test out some of the services provided by AWS so I wanted to think of some real life use cases.

Mego is supposed to be a site where users can manage personal data such as memories and goals. The main feature is a timeline where the user can get an overview of what the user has added to the profile. I used waffle.io to manage my work flow keep to track of the work I wanted to implement.

I had previously only done an application with user authentication using ruby on rails and I wanted to do this with node. I found the Passport.js library which is handling the signup/login/logout in the backend. I further wanted to improve my skills when handling image files and how to manage the users being able to upload images to their profiles. I created an S3 bucket and I used the aws-sdk to upload and download images from my bucket.

I wanted to understand some of the technologies used for adding scalability to you application and I have therefore experimented with docker and the aws EC2 service throughout this project. Whenever the project is built a new docker image is created and stored in a docker repository. I have used this image to install an instance of the application on an EC2 instance.

Check a demonstration of the app at https://mymegoapp.herokuapp.com.

## User Stories

```
As a user
I want to create a user on Mego
so that I can keep track of my memories and goals

As a user
I want to edit my profile
So that I can perosnalize my profile

As a user
I want to upload images
so that I can save a memory

As a user
I want to add a goal
So that I can manage my personal aspirations

As a user
I want to be able to mark a goal as achieved
So that I can manage a goal

```

## Installation

Clone the git repository and run npm install.

## Usage

* When all dependencies are installed run npm start and open up a broswer and go to http://localhost:3000/.

## Tech Stack

* React
* Redux
* Node.js
* Passport.js
* AWS S3
* Docker
* AWS EC2
* Webpack & Babel
* Immutable.js
* Promises 
* MongoDB/Mongoose
