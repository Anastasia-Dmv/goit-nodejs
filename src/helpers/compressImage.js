const { promises: fsPromises } = require("fs");
const multer = require("multer");
const path = require("path");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const storage = multer.diskStorage({
  destination: path.join(__dirname, "tmp"),
  filename: (req, file, cb) => {
    const { originalname } = file;
    const { ext } = path.parse(originalname);
    return cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

function normalizeImageminPath(path) {
  return path.replace(/\\/g, "/");
}

async function compressImages(req, res, next) {
  const COMPRESSED_IMAGES_DIR = normalizeImageminPath(
    path.join(__dirname, "../../public/images")
  );

  const normilizedPath = normalizeImageminPath(req.file.path);
  await imagemin([normilizedPath], {
    destination: COMPRESSED_IMAGES_DIR,
    plugins: [imageminJpegtran(), imageminPngquant({ qaulity: [0.6, 0.8] })],
  });
  await fsPromises.unlink(req.file.path);

  req.file.destination = COMPRESSED_IMAGES_DIR;
  req.file.path = path.join(COMPRESSED_IMAGES_DIR, req.file.filename);
  next();
}
module.exports = { compressImages, upload };
