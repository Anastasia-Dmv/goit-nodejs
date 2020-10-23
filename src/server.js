// const MongoClient = require("mongodb").MongoClient;
// const url =
//   "mongodb://localhost:27017Anastasia:MvkBEDUQW8EJJey@cluster0.p5htp.mongodb.net/db-contacts?retryWrites=true&w=majority";
// async function main() {
//   await MongoClient.connect(url);
//   console.log("Database connection successful");
// }
// main();

// Используй исходный код домашней работы #2 и замени хранение контактов из json-файла на созданную тобой базу данных.

// Напиши код для создания подключения к MongoDB при помощи Mongoose.
// При успешном подключении выведи в консоль сообщение "Database connection successful".
// Обязательно обработай ошибку подключения. Выведи в консоль сообщение ошибки и заверши процесс используя process.exit(1).
// В функциях обработки запросов замени код CRUD-операций над контактами из файла, на Mongoose-методы для работы с коллекцией контактов в базе данных.
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
        // useInifiedTopology: true,
        useFindAndModify: true,
      });
      console.log("Successfully connected to MONGODB !");
    } catch (err) {
      console.log(err.message);
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
