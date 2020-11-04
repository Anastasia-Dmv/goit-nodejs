const express = require("express");
const { authRouter } = require("./auth/auth.router");
const { contactsRouter } = require("./contacts/contacts.router");
const { usersRouter } = require("./users/users.router");
const app = express();
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

module.exports = app;
