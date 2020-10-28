const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { contactsRouter } = require("./contacts/contacts.router");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/users.router");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
const PORT = process.env.PORT || 3000;

class CrudServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    await this.initDataBase();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandling();
    this.startListening();
  }
  initServer() {
    this.app = express();
    this.app.use(cors());
    this.app.use(morgan("combined"));
  }

  async initDataBase() {
    try {
      mongoose.set("useCreateIndex", true);
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useInifiedTopology: true,
        useFindAndModify: true,
      });
      console.log("Successfully connected to mongo database !");
    } catch (err) {
      console.log("Error connecting mongo database");
      process.exit(1);
    }
  }
  async initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  initRouters() {
    this.app.use("/auth", authRouter);
    this.app.use("/users", usersRouter);
    this.app.use("/api/contacts", contactsRouter);
  }
  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).json(err.message);
    });
  }
  startListening() {
    this.app.listen(PORT, () => {
      console.log("server started on port ", PORT);
    });
  }
}
exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
