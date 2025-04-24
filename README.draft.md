## Creation of new database

1. Update config schemas
2. Update config interface
3. Update database module

## ENV config file template

```txt
# Environment options
NODE_ENV=dev

# API configuration options
API_PORT=5432
API_HOST=localhost

# Database configuration options
DATABASE_CONNECTION_HOST=localhost
DATABASE_CONNECTION_PORT=5432
DATABASE_CONNECTION_USER=acme
DATABASE_CONNECTION_PASSWORD=acme@123
DATABASE_ORM_MAX_POOL_SIZE=40
DATABASE_ORM_IDLE_TIMEOUT_MILLIS=10000
DATABASE_ORM_AUTO_SYNC=false
DATABASE_USER=db_user
```

## YAML config file template

```yaml
env:
  nodeEnv: dev
api:
  port: 3000
  host: localhost
database:
  connection:
    host: localhost
    port: 5432
    username: acme
    password: acme@123
  orm:
    maxPoolSize: 40
    idleTimeoutMillis: 10000
    autoSync: false
  user: db_user
```

## Configuration file schema

**Enviroment** 

| KEY           | VALUE TYPE                           | DEFAULT   | DESCRIPTION                   |
|---------------|--------------------------------------|-----------|-------------------------------|
| `NODE_ENV`    | enum(dev, hml, prd)                  | dev       | *Define selected enviroment*  |
| `DEPLOYMENT`  | enum(localhost, docker-compose, k8s) | localhost | *Define wherer the app gonna* |

**API**

| KEY           | VALUE TYPE | DEFAULT   | DESCRIPTION     |
|---------------|------------|-----------|-----------------|
| `API_PORT`    | number     | 3000      | *API run port*  |
| `API_HOST`    | string     | localhost | *API base host* |

**Database**

| KEY                                       | VALUE TYPE | DEFAULT   | DESCRIPTION                              |
|-------------------------------------------|------------|-----------|------------------------------------------|
| `DATABASE_CONNECTION_HOST`                | string     | localhost | *Database cluster base host*             |
| `DATABASE_CONNECTION_PORT`                | number     | 5432      | *Database cluster port*                  |
| `DATABASE_CONNECTION_USER`                | string     | n/a       | *Database username connection*           |
| `DATABASE_CONNECTION_PASSWORD`            | string     | n/a       | *Database password connection*           |
| `DATABASE_CONNECTION_MAX_POOL_SIZE`       | bool       | false     | *MikroORM auto sync entities in databse* |
| `DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS` | number     | 40        | *MikroORM pool size limit*               |
| `DATABASE_CONNECTION_AUTO_SYNC`           | number     | 10000     | *MikroORM timeout time in milliseconds*  |
| `DATABASE_USER`                           | string     | n/a       | *User database name*                     |