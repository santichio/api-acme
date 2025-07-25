## Creation of new database

1. Update config schemas
2. Update config interface
3. Update database module

# Configuration and enviroment variables

## Development ENV file 

```txt
# Environment options
ENV_NODE = "dev"
ENV_DEPLOY = "loc"

# API configuration options
API_PORT = 3000
API_HOST = "localhost"
API_TIMEOUT_MILLIS = 3000

# Database configuration options
DATABASE_HOST = "localhost"
DATABASE_PORT = 5432
DATABASE_USERNAME = "acme"
DATABASE_PASSWORD = "acme@123"
DATABASE_MAX_POOL_SIZE = 40
DATABASE_AUTO_SYNC = true
```

## ENV file variables list

**Enviroment** 

| KEY           | VALUE TYPE                           | DEFAULT   | DESCRIPTION                   |
|---------------|--------------------------------------|-----------|-------------------------------|
| `ENV_NODE`    | enum(dev, hml, prd)                  | dev       | *Define selected enviroment*  |
| `ENV_DEPLOY`  | enum(localhost, docker-compose, k8s) | localhost | *Define wherer the app gonna* |

**API**

| KEY                     | VALUE TYPE | DEFAULT   | DESCRIPTION        |
|-------------------------|------------|-----------|--------------------|
| `API_PORT`              | number     | 3000      | *API run port*     |
| `API_HOST`              | string     | localhost | *API base host*    |
| `API_TIMEOUT_MILLIS`    | number     | 3000      | *API timeout time* |

**Database**

| KEY                            | VALUE TYPE | DEFAULT   | DESCRIPTION                              |
|--------------------------------|------------|-----------|------------------------------------------|
| `DATABASE_HOST`                | string     | localhost | *Database cluster base host*             |
| `DATABASE_PORT`                | number     | 5432      | *Database cluster port*                  |
| `DATABASE_USERNAME`            | string     | n/a       | *Database username connection*           |
| `DATABASE_PASSWORD`            | string     | n/a       | *Database password connection*           |
| `DATABASE_MAX_POOL_SIZE`       | bool       | false     | *MikroORM auto sync entities in databse* |
| `DATABASE_IDLE_TIMEOUT_MILLIS` | number     | 40        | *MikroORM pool size limit*               |
| `DATABASE_AUTO_SYNC`           | number     | 10000     | *MikroORM timeout time in milliseconds*  |

# Define a new endpoint

- All endpoints are handle by the controlles;
- Every controller are inside a module
- The response schema is defined in `./src/common/interfaces/Response.interface.ts`

## Create a controller endpoint

The response of the controller method pass throw a Nest interceptor, that parse it to add in the response body JSON. There is 2 types that the return accepts, a string or a object.

If you pass a string in the return, it is used in the `message` field. If you pass a object, has to follow the interface `IPreResponse`, that provide 3 fields:
- `message`: a message to show to the user
- `data`: the response data
- `metaData`: extra informations

All other filds in the object are ignored, and if no message are provided, a default message is provided.

## Response format

All response contain this fields:
- `statusCode` the status code of response
- `timeStamp` time of the response
- `message` a string with some message for user or UI, ready to use!
