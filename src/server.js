const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { usersRouter } = require("./contacts/contacts.router");

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
      console.log("Error connecting mongo database", err.message);
      process.exit(1);
    }
  }
  initMiddlewares() {
    this.app.use(express.json());
  }
  initRouters() {
    this.app.use("/api/contacts", usersRouter);
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
