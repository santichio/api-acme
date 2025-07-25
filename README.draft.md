## Creation of new database

1. Update config schemas
2. Update config interface
3. Update database module

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