const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const app= express();

app.use (express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware ({ app });

app.post("/register", (req, res) => {
    res.json("register");
});

app.post("/login", (req, res) => {
    res.json("login");
});

app.post("/profile", (req, res) => {
    res.json("profile");
});

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001")
    });
