# Clean Sweep

**Clean Sweep** is a full-stack application designed to help users manage household chores collaboratively. Built by a team of students as a final project for a full-stack web development bootcamp, the app allows users to join a household, assign chores, track completion, and gamify household responsibilities.

## Features

* User registration and authentication (JWT)
* Join or create a household
* Assign chores to specific users
* Track completed chores
* React-based front-end with dynamic components
* GraphQL API with Apollo Server
* MongoDB database with Mongoose schemas
* Deployed on Render

## Tech Stack

* **Frontend:** React, TypeScript, Vite, Apollo Client
* **Backend:** Node.js, Express, TypeScript, Apollo Server, GraphQL
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Render (frontend and backend)
* **Version Control:** GitHub

## Getting Started

### Prerequisites

* Node.js and npm
* MongoDB URI (can use Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/4ccraymond/clean-sweep.git
cd clean-sweep

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
```

### Running Locally

In one terminal tab:

```bash
cd server
npm run dev
```

In another terminal tab:

```bash
cd client
npm run dev
```

The client runs on `http://localhost:3000` and the API on `http://localhost:3001/graphql`.

## Deployment

Both frontend and backend are deployed on [Render](https://render.com). Separate web services were created for each.

## Acknowledgements

* **Chase**: Led backend development including GraphQL schema, Mongoose modeling, and mutation/query logic
* **Grace**: Handled most of the front-end build, state management with Apollo, and all deployment processes
* **Adeleine**: Developed chore creation, update, and deletion functionality; implemented front-end interaction with chores
* **Stephanie**: Led user authentication (JWT) and user creation logic; assisted with household model and dashboard integration
* **Instructional Staff (Ed X)**: Provided technical support, code reviews, and project guidance throughout the bootcamp
* **ChatGPT**: Supported with planning architecture, writing and debugging code, and generating documentation
* **Xpert Learning Assistant Chat+**: Assisted with planning, logic flow validation, and full-stack implementation support

## License

This project is for educational purposes.