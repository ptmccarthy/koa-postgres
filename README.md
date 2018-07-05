# Koa + Postgres + TypeORM + Typescript Example

This is an example skeleton application that provides a simple implementation of:

- [Koa web framework](https://koajs.com/) with [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) database via [Docker](https://www.docker.com/), connected with [TypeORM](https://github.com/typeorm/typeorm)
- Local authentication with [Passport](https://github.com/rkusa/koa-passport)
- User registration/login with salted & hashed passwords via [bcryptjs](https://www.npmjs.com/package/bcryptjs/v/0.7.6)
- User sessions with cookies, provided by [koa-session](https://github.com/koajs/session)

## Prerequisites
- Node.js version 8+
- Docker with docker-compose

## Set up

### Create & Start Postgres Docker Container
In the repository root directory (where `docker-compose.yaml` exists), run: `docker-compose up -d`

This will create the database container from the official postgres Dockerhub image and configure a test database.

Once created, the environment can be controlled with `docker-compose start` and `docker-compose stop`. To entirely remove it, run `docker-compose down`.

### Run Web Server
First, run `npm i` to install dependencies.

Then, two run scripts are provided:
- `npm start` will transpile the Typescript files in `/src` one time into `/dist`, then serve it locally with nodemon.

- `npm run dev` will run the Typescript compiler in watch mode concurrently with nodemon in watch mode, recompiling changes on the fly and restarting the node service.

## Register a User
POST to `/register`:
```
{ username: 'foo', password: 'bar', firstName: 'Test', lastName: 'User' }
```

Creates a new user, logs in, and returns a session cookie

## Login existing User
POST to `/login`:
```
{ username: 'foo', password: 'bar' }
```

If successful, logs in and returns a session cookie


## Show all Users
To test that your session is working, GET the protected endpoint `/api/users`

```
[
  {
      "id": 1,
      "username": "foo",
      "firstName": "Test",
      "lastName": "User"
  }
]
```

## Notes
This is just a starting point example, and is not production-ready.
