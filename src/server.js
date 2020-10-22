const express = require("express");
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

  start() {
    this.initServer();

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
  initMiddlewares() {
    this.app.use(express.json());
  }
  initRouters() {
    this.app.use("/api/contacts", usersRouter);
  }
  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
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
