# Pantry

Pantry is a open source and free data storage service to help developers with their storage issues of small projects. This service uses restful API to post JSON objects where the data is stored securely for a period of time till inactivity.

Dependencies used:
`Express`
`Mongoose`
`Crypto`
`Lodash`

## Models:
There are 2 models in this Schema.
- `Pantry Model` 
- `Basket Model`

##Controllers:
There are 2 controller in this project as below.
- `Pantry Controller`
- `Basket Controller`

## Pantry routes

### POST : creates a pantryId for the user by taking the email and pantryName in the body.

`http://localhost:3000/create`

- Body
```
{
    "email": "abc@gmail.com", 
    "name" : "abc_storage"
}
```

### GET : This will return the list of baskets by taking the pantryId as params input.

`http://localhost:3000/pantry/:PANTRYID`


## Basket routes

### POST : This will create a new basket or replace an existing one inside the pantry. 

`http://localhost:3000/pantry/:PANTRYID/basket/:BASKETNAME`

- Body
```
{
    "data": {
        "key1" : "value1"
        "key2" : "value2"
    }
}
```

### PUT : This will update the existing data inside the basket and return the newly updated basket. This uses lodash lib and performs a deep merge on the data.

`http://localhost:3000/pantry/:PANTRYID/basket/:BASKETNAME`

- Body
```
{
  "key1": "value1",
  "key2" : "value2"

  "newKey": {
      "nestedKey" : "nestedValue"

  }
}
```

### GET : This will return the contents of baskets by taking the basket name as params input.

`http://localhost:3000/pantry/:PANTRYID/basket/:BASKETNAME`


### DELETE : This deletes the entire basket of the given basket name, please note this is hard delete, once performed data cannot be retrived. 

`http://localhost:3000//pantry/:PANTRYID/basket/:BASKETNAME`

