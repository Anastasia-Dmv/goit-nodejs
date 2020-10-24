function errorHandlingWrapper(innerFn) {
  return async (req, res, next) => {
    try {
      await innerFn(req, res);
    } catch (err) {
      if (err.message && err.name === "CastError") {
        return res.status(404).json("Not found, please enter correct ID");
      }

      next(err.message);
    }
  };
}
exports.errorHandlingWrapper = errorHandlingWrapper;
