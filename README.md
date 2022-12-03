# Auth JWT API

## Description

An API to get the jutsus of the anime Naruto from MongoDB. Created GET requests with pagination and filters. Was developed with Mongoose to connect to MongoDB and create models.

## Technologies used

- NodeJs
- Typescript
- Express
- Mongoose
- MongoDB
- Tsyringe

## Endpoints

| Name                 | Method |          Endpoint |
| -------------------- | :----: | ----------------: |
| Get a jutsu by ID    |  GET   |     /jutsu/id/:id |
| Get a jutsu by name  |  GET   | /jutsu/name/:name |
| Get all jutsus       |  GET   |           /jutsus |
| Get jutsus by filter |  GET   |   /jutsus/filters |

## Getting started

### Clone this repository

`git clone https://github.com/gustavool/naruto-jutsus-api.git`

### Run

`npm run dev`
