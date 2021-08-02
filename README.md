
# Serverless

- REST API with NestJS, TypeORM e PostgreSQL;
- Docker Compose for setup DB;
- Serverless setup for AWS Lambda;
## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS@14.16.0](https://nodejs.org/) and NPM@6.14.11;
- [Docker](https://www.docker.com/);

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/Odilomar/serverless
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./serverless
npm install or yarn
```

Once the dependencies are installed, you can now configure the database with Docker.

```
docker-composer up -d
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server with TSNode
npm run start:dev or yarn start:dev
```

You can now head to `http://localhost:3000/` and see your API Swagger docs.

## 2. Endpoints

- POST /user/ : Endpoint to create a user:
  - Body: { nome: string, idade: number, cargo: string };
  - Response: { id: number, nome: string, idade: number, cargo: string, created_at: Date, update_at: Date };

- GET /user/ : Endpoint to retrieve all users:
  - Query: 
    - id: number;
    - name: string;
    - idade: number;
    - cargo: string;
    - take: number;
    - skip: number;
  - Response: { data: [User], total: number, take: number, skip: number };

- GET /user/:id : Endpoint to retrieve specific user by id
  - Param:
    - id: number;
  - Response: { id: number, nome: string, idade: number, cargo: string, created_at: Date, update_at: Date };

- PUT /user/:id : Endpoint to update user
  - Param:
    - id: number;
  - Body: { nome?: string, idade?: number, cargo?: string };
  - Response: { id: number, nome: string, idade: number, cargo: string, created_at: Date, update_at: Date };

- DELETE /user/:id : Endpoint to delete user
  - Param:
    - id: number;

## 3. Development

During de development of this project, i had some issues and decided to describe below:

* I´ve had some problems to deploy in AWS Lambda with user.module imports and couldn't finish it in time;
  * I try to look for this and fix it in time, but i don't understand where is the import problem;

* I began to study unit and e-2-e tests recently. That's why i didn´t perform as well in this "feature";
  * I´m still looking for this subjects;