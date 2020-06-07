

# REST service 
## Fabián Naula V.

## TEST 

This program allows the users to by REST services make a GET/POST/PUT/DELETE request to developers app from a database placed on mongoDB ATLAS.

The information able to save is:
  -  nombre
  -  email
  -  password
  -  tecnologias_conocidas
  -  link_github

## APP CONFIGURATION

This app has been made using **node.js, mongoDB ATLAS and DOCKER**, and deployed by HEROKU. 

It´s been divided in:
- Main file (server.js) which manage the system,
- Config file to configure ports usage,
- Models file to create a schema for our database,
- Routes file to manage the REST requests.

In addition, the app was develop using the following NPM dependencies:

        "bcrypt": "^4.0.1",
        "body-parser": "^1.19.0",
        "express": "^4.17.1",
        "mongoose": "^5.9.18",
        "mongoose-unique-validator": "^2.0.3",
        "underscore": "^1.10.2"

**This app have errors management and validation for the information that we push to the database.**

### It is a single development which satisfies the need for the following packages:

 - **mongoose** => To establish a connection to our MongoDB ATLAS and producing mongoose model.
 - **bcryptjs** => To hash the passwords.
 - **underscore** => To allow the user to update specific fields only.

 **It also uses a dockerfile for the project**

 -------------

## Requirements to run locally

1. To run this app you must have installed docker desktop in your PC. You can use the following link:

- **LINK:** https://www.docker.com/get-started

## Requirements for testing

1. To test the app you must use an APIREST app such as POSTMAN, it allows you to send GET/POST/PUT/DELETE requests. 

Before you go forward check that docker desktop is running.

 -------------

# Usage

## Testing by deployment in HEROKU

### Test GET request

1. Open POSTMAN
2. configure a GET request using a URL: https://avalith-test-fabian-naula.herokuapp.com/developers
3. It will list the data of the existing developers with the next information
    -  nombre
    -  email
    -  tecnologias_conocidas
    -  link_github

The password is not shown because it is a personal register, and also it is encrypted.
4. If you want to list the data with a limit of persons to show (**X**) and with a starting point for the list (**Y**) use the following URL syntax:
 
 https://avalith-test-fabian-naula.herokuapp.com/developers?limite=X&from=Y

### Test POST request

1. Open POSTMAN
2. configure a POST request using a URL: https://avalith-test-fabian-naula.herokuapp.com/developers
3. You must send the following parameters from body (as x-www-form-urlencoded):

  -  nombre
  -  email
  -  password
  -  tecnologias_conocidas
  -  link_github

### Test PUT request

1. Open POSTMAN
2. configure a PUT request using a URL: https://avalith-test-fabian-naula.herokuapp.com/{id}
You can find an id valid from using the GET request, take it and remplace it in **{id}** URL.
3. You could send the following parameters from body (as x-www-form-urlencoded) to be updated:

  -  nombre
  -  email
  -  tecnologias_conocidas
  -  link_github

As a confirmation you will receive an "ok":true followed by the sent information.


### Test DELETE request

1. Open POSTMAN
2. configure a DELETE request using a URL: https://avalith-test-fabian-naula.herokuapp.com/{id}
You can find an id valid from using the GET request, take it and remplace it in **{id}** URL.
3. Send the request and the person with the id will be deleted.
4. To confirm it, use the GET request again and check for it person.

## Test by localhost

### Run docker image

Using a terminal you can run the app by executing the following command:

1. docker pull favaldi/avalith-test:latest

2. Remplace in the following command **PORT** with the port number that you want to use with the application.

 docker run -it -p PORT:3000 -it favaldi/avalith-test


### Test GET request

1. Open POSTMAN
2. configure a GET request using a URL: https://localhost:PORT/developers
3. It will list the data of the existing developers with the next information
    -  nombre
    -  email
    -  tecnologias_conocidas
    -  link_github

The password is not shown because it is a personal register, and also it is encrypted.
4. If you want to list the data with a limit of persons to show (**X**) and with a starting point for the list (**Y**) use the following URL syntax:
 
 https://localhost:PORT/developers?limite=X&from=Y

### Test POST request

1. Open POSTMAN
2. configure a POST request using a URL: https://avalith-test-fabian-naula.herokuapp.com/developers
3. You must send the following parameters from body (as x-www-form-urlencoded):

  -  nombre
  -  email
  -  password
  -  tecnologias_conocidas
  -  link_github

### Test PUT request

1. Open POSTMAN
2. configure a PUT request using a URL: https://localhost:PORT/{id}
You can find an id valid from using the GET request, take it and remplace it in **{id}** URL.
3. You could send the following parameters from body (as x-www-form-urlencoded) to be updated:

  -  nombre
  -  email
  -  tecnologias_conocidas
  -  link_github

As a confirmation you will receive an "ok":true followed by the sent information.


### Test DELETE request

1. Open POSTMAN
2. configure a DELETE request using a URL: https://localhost:PORT/{id}
You can find an id valid from using the GET request, take it and remplace it in **{id}** URL.
3. Send the request and the person with the id will be deleted.
4. To confirm it, use the GET request again and check for it person.



