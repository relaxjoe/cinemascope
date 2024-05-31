## Cinema Scope

## Overview

Welcome to Cinema Scope, a new site for movie lovers to share and explore the film world. Here, you can make an account, write your own movie reviews, and chat with others by leaving comments. Cinema Scope is features tech like React for the interactive parts, GraphQL with Node.js and Express.js for the backend, and MongoDB with Mongoose to keep things organized. We also keep your info safe with JWT. Join us and start you career as a movie critic today.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
<!-- - [API Endpoints](#api-endpoints) -->
- [Contributors](#contributors)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Movie Reviews**: Users can post, edit, and delete their movie reviews.
- **Comments**: Users can comment on other users' reviews.
- **GraphQL API**: Data retrieval and manipulation using GraphQL queries and mutations.
- **Polished UI**: An interactive and user-friendly interface.
- **Real-time Updates**: Real-time interactions with responsive design.

## Technologies Used

- **Frontend**: React, Apollo Client
- **Backend**: Node.js, Express.js, GraphQL, Apollo Server
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render

## Installation

### Prerequisites

- Node.js and npm
- MongoDB

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/relaxjoe/cinemascope.git
    cd cinema-scope/backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Environment Variables:**
    Create a `.env` file in the `backend` directory with the following variables:
    ```plaintext
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the backend server:**
    ```sh
    npm start
    ```

## Usage

1. **Access the application:**
    Open your browser and navigate to `http://localhost:3001`.

2. **Register an account:**
    Create a new account to start posting and commenting on movie reviews.

3. **Explore movie reviews:**
    Browse through the reviews posted by other users and leave your comments.

<!-- ## API Endpoints -->

## Contributors

[Joe Diebel](https://github.com/relaxjoe)

[Donte Smith](https://github.com/DTSmith17)

[Owen Johnson](https://github.com/owenphineas)

[Richard Eknes](https://github.com/richardeknes)

[Nathan Davis](https://github.com/NatDavies06)

## License

See the [LICENSE](LICENSE) file for details.
