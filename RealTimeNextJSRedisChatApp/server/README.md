
# 🏁 Getting Started with the server Backend of Chat Application API 

## 🤔 What is the DaveListBackEnd API? 
It is the API that allows you to fetch,update,delete and perform CRUD operations for the DaveList API using redis memory cache database that used in the project.This is a Restful API for the Redis Memory Cache Database so that it can be used with the frontEnd.It is basically used at the front end of DaveListApp.

## 🧪 Tools used for Testing
Testing is one of the major part of development and without an application can't be reliable. So we used the following tools for testing the application.
- [jest](https://www.npmjs.com/package/jest): Used for testing the API
- [supertest](https://www.npmjs.com/package/supertest): Used for testing the API
- [PostMan](https://www.postman.com/): Used for testing the API
- Manual Testing: Used for testing the API

## 🏃 Running the tests
To run the tests you can use the following command.
`npm test`. It will execute the jest tests.

## 🔧 Tools Used 
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Redis](https://redis.com/) for Memory Cache Database
- [jest](https://www.npmjs.com/package/jest): Used for testing the API
- [supertest](https://www.npmjs.com/package/supertest): Used for testing the API
- [PostMan](https://www.postman.com/): Used for testing the API

## 🧐 Operations that can be performed on the DaveListBackEnd API
It performs the following operations for both tables **student** and **book**:
- **GET** — an HTTP request to Read (Used to read an existing resource)
- **POST** — an HTTP request to Create (Used to create and add a resource)
- **PUT** —an HTTP request to Update(client sends data that updates the entire resource)(Used to update an entire resource)
- **PATCH** — HTTP request to Update (client sends partial data that is to be updated without modifying the entire data)(Used to partially update a resource)
- **DELETE** — HTTP request to Delete (Used to delete an entire resource)

## 🪀 API Routes
  ### 1. The API has the following routes for **user** to perform CRUD operations on the DaveListBackEnd API:
  - **GET [http://localhost:8000/user](http://localhost:8000/user)** — returns a list of all users that have registered in the DaveListBackEnd API
  - **GET [http://localhost:8000/user/id](http://localhost:8000/user/id)** — returns a single user by provided id
  - **POST [http://localhost:8000/user/](http://localhost:8000/user)** — to Post a JSON object to create a new user
  - **PUT [http://localhost:8000/user/id](http://localhost:8000/user/id)** — to Update a user by provided id 
  - **DELETE [http://localhost:8000/user/id](http://localhost:8000/user/id)** — to Delete a user by provided id

  ### 2. The API has the following routes for **listing** table crud:
  - **GET [http://localhost:8000/listing](http://localhost:8000/listing)** — returns a list of all listings that are saved in the DaveListBackEnd API
  - **GET [http://localhost:8000/listing/id](http://localhost:8000/listing/id)** — returns a single listing by provided id
  - **POST [http://localhost:8000/listing/](http://localhost:8000/listing)** — to Post a JSON object to create a new listing
  - **PUT [http://localhost:8000/listing/id](http://localhost:8000/listing/id)** — to Update a listing by provided id 
  - **DELETE [http://localhost:8000/listing/id](http://localhost:8000/listing/id)** — to Delete a listing by provided id

 ### 3. The API has the following routes for **comment** table crud:
  - **GET [http://localhost:8000/comment](http://localhost:8000/comment)** — returns a list of all comments that are saved in the DaveListBackEnd API
  - **GET [http://localhost:8000/comment/id](http://localhost:8000/comment/id)** — returns a single comment by provided id
  - **POST [http://localhost:8000/comment/](http://localhost:8000/comment)** — to Post a JSON object to create a new comment
  - **PUT [http://localhost:8000/comment/id](http://localhost:8000/comment/id)** — to Update a comment by provided id 
  - **DELETE [http://localhost:8000/comment/id](http://localhost:8000/comment/id)** — to Delete a comment by provided id

## 🖥️ How do I use the DaveListBackEnd API?
- **IMPORTANT**:Remember that you need to sign up for redis cloud to get your username,password and end point so that this will work. Although it will work on localhost but it will not work on the cloud with my end point and username.

## 📋 Repositories Created in the DaveListBackEnd API for the Redis Memory Cache Database
- **user** ——> The schema contains the name, password, timeRegistered and a boolean to track if user is signedIn or not = isSignedIn.As shown below:
  ```js
  export const userSchema = new Schema(User, {
    name: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
    timeRegistered: {
        type: 'string'
    },
    isSignedIn: {
        type: 'boolean'
    }
  }, {
    dataStructure: 'JSON'
  });
  ```
- **listing** ——> The schema contains the  category, title, description, isPublic, userWhoCreated and timeCreated.As shown below:
  ```js
  export const listingSchema = new Schema(Listing, {
    category: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    isPublic: {
        type: 'boolean'
    },
    userWhoCreated: {
        type: 'string'
    },
    timeCreated: {
        type: 'string'
    }
  }, {
    dataStructure: 'JSON'
  });
  ```
  - **comment** ——> The schema contains the  listingID, comment, userWhoCommented and timeCommented. As shown below:
  ```js
  export const commentSchema = new Schema(Comment, {
    listingID: {
        type: 'string'
    },
    comment: {
        type: 'string'
    },
    userWhoCommented: {
        type: 'string'
    },
    timeCommented: {
        type: 'string'
    }
  }, {
    dataStructure: 'JSON'
  });
  ```

## 🏃🏾 Starting the project
- Download the repository and run `npm install`. The node modules will be installed that are essential for running the project.
- In the root of the project run `npm start`. This will start the server.
- 😀 Congratulations. You definately did great if you followed till now.
- Now you can use the apis along with the front end of DaveListApp.

## Find Me 
- Follow me on [Linkedin](https://www.linkedin.com/in/muhammad-bilal-028843199/) for useful updates regarding development
- My [Github Profile](https://github.com/Muhammad-Bilal-7896) 

## Resources
Blogs are much faster than videos so I mostly consult blogs but you can consult video tutorials if you want to
- [https://www.linkedin.com/pulse/how-develop-todo-app-next-js-redis-database-from-scratch-bilal/?trackingId=9GEisJ%2BHSHCxL5SJGyQNHw%3D%3D](https://www.linkedin.com/pulse/how-develop-todo-app-next-js-redis-database-from-scratch-bilal/?trackingId=9GEisJ%2BHSHCxL5SJGyQNHw%3D%3D)
- [https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
