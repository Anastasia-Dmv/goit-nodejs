const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { contactsRouter } = require("./contacts/contacts.router");
const { authRouter } = require("./auth/auth.router");
const { usersRouter } = require("./users/users.router");
const cors = require("cors");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const { promises: fsPropmises } = require("fs");
const { multerRouter } = require("./multer");
const multer = require("multer");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: path.join(__dirname, "tmp"),
  filename: (req, file, cb) => {
    const { originalname } = file;
    const { ext } = path.parse(originalname);
    return cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });
// upload.array("gallery", 5);
// upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "gallery", maxCount: 5 },
// ]);

async function compressImages(req, res, next) {
  const COMPRESSED_IMAGES_DIR = normalizeImageminPath(
    path.join(__dirname, "public")
  );
  const normilizedPath = normalizeImageminPath(req.file.path);
  await imagemin([normilizedPath], {
    destination: COMPRESSED_IMAGES_DIR,
    plugins: [imageminJpegtran(), imageminPngquant({ qaulity: [0.6, 0.8] })],
  });
  await fsPropmises.unlink(req.file.path);

  req.file.destination = COMPRESSED_IMAGES_DIR;
  req.file.path = path.join(COMPRESSED_IMAGES_DIR, req.file.filename);
  next();
}
//==========
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
    this.app.use(express.static("public"));
  }
  initRouters() {
    this.app.use("/auth", authRouter);
    this.app.use("/users", usersRouter);
    this.app.use("/api/contacts", contactsRouter);
    this.app.post(
      "/images",
      upload.single("avatar"),
      //compressImages,
      (req, res, next) => {
        console.log("req.file", req.file);
        console.log("req.body", req.body);
        console.log(" req.files", req.files);
        res.status(200).send("hello");
      }
    );
    // this.app.use("/", multerRouter);
    //this.app.use(express.static("public"));
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
function normalizeImageminPath(path) {
  return path.replace(/\\/g, "/");
}

exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
