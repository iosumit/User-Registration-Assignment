# Assignment Registration
This project is based on MVC archietecture.
This project uses RDBMS (MySQL).

-------------
### Project Structure
```
root
|
|--test
|--server
    |
    |--- Controller
    |--- Handler
    |--- Routes
    |--- Utils 
    |--- Model 
````
---

### Enviroment
create file `.env` on root level
```
ENVIROMENT_TYPE=<ENY Type `dev | prod | staging `>

DATABSE_TYPE=</* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */>
MYSQL_URI=<MySQL server url>
MYSQL_DATABASE_NAME=<MySQL Database name>
MYSQL_USERNAME=<Database username>
MYSQL_PASSWORD=<Database password>
MYSQL_PASSWORD=<Database port>

JWT_AUTH_TOKEN_SECRET=<jwt secret>
PORT=<Server running Port>
````

---

### User Registration Postman collection

`assignment.postman_collection.json`

import this file to postman and test it

---

### Install Required Dependencies
```
npm i
```
### Run
```
npm start
```
### Test
```
npm test
```