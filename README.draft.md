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

## Configuration file chema

**Enviroment** 

| KEY           | VALUE TYPE                           | DEFAULT   | DESCRIPTION                   |
|---------------|--------------------------------------|-----------|-------------------------------|
| `env.nodeEnv` | enum(dev, hml, prd)                  | dev       | *Define selected enviroment*  |
| `env.appRun`  | enum(localhost, docker-compose, k8s) | localhost | *Define wherer the app gonna* |

**API**

| KEY           | VALUE TYPE | DEFAULT   | DESCRIPTION     |
|---------------|------------|-----------|-----------------|
| `api.port`    | number     | 3000      | *API run port*  |
| `api.host`    | string     | localhost | *API base host* |

**Database**

| KEY                             | VALUE TYPE | DEFAULT   | DESCRIPTION                              |
|---------------------------------|------------|-----------|------------------------------------------|
| `database.connection.host`      | string     | localhost | *Database cluster base host*             |
| `database.connection.port`      | number     | 5432      | *Database cluster port*                  |
| `database.connection.username`  | string     | n/a       | *Database username connection*           |
| `database.connection.password`  | string     | n/a       | *Database password connection*           |
| `database.orm.autoSync`         | bool       | false     | *MikroORM auto sync entities in databse* |
| `database.orm.maxPoolSize`      | number     | 40        | *MikroORM pool size limit*               |
| `database.orm.idleTimeoutMillis`| number     | 10000     | *MikroORM timeout time in milliseconds*  |
| `database.user`                 | string     | n/a       | *User database name*                     |