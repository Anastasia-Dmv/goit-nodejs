const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");

class CrudServer {
  constructor() {
    this.app = null;
  }

  start() {
    this.initServer();
    //this.initDataBase();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandling();
    this.startListening();
  }
  initServer() {
    this.app = express();
  }
  initMiddlewares() {
    this.app.use(express.json());
  }
  initRouters() {}
  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }
  startListening() {
    this.app.listen(process.env.PORT),
      () => {
        console.log("server started on port ", process.env.PORT);
      };
  }
}
exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
