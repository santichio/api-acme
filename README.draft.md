## Creation of new database

1. Update config schemas
2. Update config interface
3. Update database module

## Env file sample

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
DATABASE_USER_NAME=db_user
```