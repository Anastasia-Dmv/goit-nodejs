async function errorHandlingWrapper(innerFn) {
  try {
    return await innerFn();
  } catch (err) {
    console.log("err", err.message);
    throw err;
  }
}
module.exports = { errorHandlingWrapper };
