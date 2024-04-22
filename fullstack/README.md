This folder contains a simple example of a node.js FE and python BE and follows the example [here](https://www.youtube.com/watch?app=desktop&v=njNXTM6L0wc&ab_channel=FrancescoCiulla).

## Backend

To start the database service we can use:
```bash
docker compose up -d db
```
The `-d` stands for detached.

Similarly to start the flask service we can use:
```bash
docker compose up -d flaskapp
```

To connect to the database we can use:
```bash
docker exec -it db psql -U postgres
```

After setting everything up there should be a single table in our database `\dt` called `users`. If we run `select * from users;` we can see that the table is empty. 
We can use postman to add a user to the table using a post request with a payload/body like the following:
```json
{
    "name":"flask",
    "email":"flask@mail"
}
```

## Frontend

We will start by running `npx create-next-app@latest --no-git` to create our Next.js frontend. For the name of the project choose `frontend` and for the application directory choose `app`.
Next `cd` into `frontend`. We will install 1 dependency `npm i axios` to handle HTTP requests.
We can run our application using `npm run dev` from the `frontend` directory.