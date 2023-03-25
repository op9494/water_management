# Former APP Backend setup and API setup

_Version: 1.0.0_

## Requirements

- Node.js
- Python
- MongoDB
- All related libraries

## PREConfiguration

Create a new database connection called 'dammanagement'

Then import the collections to the database 'dammanagement' from ``./db/export/`` folder

- ``appconfiguration.json`` -> This contains the configuration for the application wher the types of equipement settings are defined.
- ``equipments.json`` -> All the equipement are being defined and maintained.
- ``user.json`` -> All the user settings and associated attributes will be available to the application also the admin account.

## Admin credentials 

- ``Email ``   -> admin@admin.com
- ``Password`` -> admin@admin.com


## Command to run the Server with Express server

```sh
npm init

npm run start

```

# API Documentation

### API Endpoint

/add/equipment

### Description

This API endpoint allows a user to add new equipment to the system.

#### HTTP Method

POST

### Parameters

| Name      | Description                                       |
| --------- | ------------------------------------------------- |
| vehicleNo | The vehicle number associated with the equipment. |
| VendorId  | The vendor's ID associated with the equipment.    |
| catagory  | The category code of the equipment.               |
| subcode   | The sub-category code of the equipment.           |
| lat       | The lattitude of the equipment's location.        |
| lon       | The longitude of the equipment's location.        |

### Response

If the equipment is successfully added to the system, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "Equpement added Succcessfully",
  "data": {
    "vehicleNo": "12345",
    "VendorId": "5e2d078a72e8630017f3440e",
    "type": {
      "catogory_code": "ABC",
      "sub_catagory_code": "DEF"
    },
    "location": {
      "lattitude": 45.0,
      "longitude": -75.0
    }
  }
}
```

If there is an error adding the equipment to the system, the API will return a 400 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/register

### Description

This API endpoint allows a user to register a new account in the system.

### HTTP Method

POST

### Parameters

| Name     | Description                               |
| -------- | ----------------------------------------- |
| name     | The name of the user.                     |
| email    | The email address of the user.            |
| type     | The type of user (e.g. vendor, customer). |
| location | The location of the user.                 |
| password | The password for the user's account.      |

### Response

If the user is successfully registered in the system, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "User created Successfully",
  "data": {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "usertype": "vendor",
    "userlocation": "New York",
    "password": "hashed password"
  }
}
```

If there is an error registering the user in the system, the API will return a 400 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/getAll/:database

### Description

This API endpoint allows a user to retrieve a list of all records in a specified database.

### HTTP Method

GET

### Parameters

| Name     | Description                                        |
| -------- | -------------------------------------------------- |
| database | The name of the database to retrieve records from. |

### Response

If the records are successfully retrieved from the database, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
    "Status": "Success",
    "message": "Data fetched successfully",
    "data": [
        {
            "record 1": "data"
        },
        {
            "record 2": "data"
        },
        ...
    ]
}
```

If there is an error retrieving the records from the database, the API will return a 500 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/getuser/:id

### Description

This API endpoint allows a user to retrieve a specific user record by ID.

### HTTP Method

GET

### Parameters

| Name | Description                            |
| ---- | -------------------------------------- |
| id   | The ID of the user record to retrieve. |

### Response

If the user record is successfully retrieved from the database, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "Data fetched successfully",
  "data": {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "usertype": "vendor",
    "userlocation": "New York",
    "password": "hashed password"
  }
}
```

If the user record is not found in the database, the API will return a 404 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "message": "User not found"
}
```

If there is an error retrieving the user record from the database, the API will return a 500 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/updateuser/:id

### Description

This API endpoint allows a user to update a specific user record by ID.

### HTTP Method

PUT

### Parameters

| Name     | Description                          |
| -------- | ------------------------------------ |
| id       | The ID of the user record to update. |
| name     | The new name for the user.           |
| email    | The new email address for the user.  |
| type     | The new type for the user.           |
| location | The new location for the user.       |
| password | The new password for the user.       |

### Response

If the user record is successfully updated in the database, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "User updated successfully",
  "data": {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "usertype": "vendor",
    "userlocation": "New York",
    "password": "hashed password"
  }
}
```

If the user record is not found in the database, the API will return a 404 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "message": "User not found"
}
```

If there is an error updating the user record in the database, the API will return a 500 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/deleteuser/:id

### Description

This API endpoint allows a user to delete a specific user record by ID.

### HTTP Method

DELETE

### Parameters

| Name | Description                          |
| ---- | ------------------------------------ |
| id   | The ID of the user record to delete. |

### Response

If the user record is successfully deleted from the database, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "User deleted successfully"
}
```

If the user record is not found in the database, the API will return a 404 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "message": "User not found"
}
```

If there is an error deleting the user record from the database, the API will return a 500 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```

### API Endpoint

/login

### Description

This API endpoint allows a user to authenticate their account in the system.

### HTTP Method

POST

### Parameters

| Name     | Description                          |
| -------- | ------------------------------------ |
| email    | The email address of the user.       |
| password | The password for the user's account. |

### Response

If the user's account is successfully authenticated, the API will return a 200 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Success",
  "message": "Auth Successful",
  "data": {
    "token": "authentication token"
  }
}
```

If the user's email or password is incorrect, the API will return a 404 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "message": "Wrong username or password."
}
```

If there is an error authenticating the user's account, the API will return a 500 status code and **a JSON object with the following structure:**

```json
{
  "Status": "Failed",
  "errorType": "Error type",
  "message": "Error message"
}
```
