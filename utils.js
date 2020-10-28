const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function errorHandlingWrapper(innerFn) {
  try {
    const resultData = await fsPromises.readFile(contactsPath, "utf-8");
    const list = JSON.parse(resultData);
    return innerFn(list);
  } catch (err) {
    console.log("err", err.message);
    process.exit(1);
  }
}

module.exports = { errorHandlingWrapper };
