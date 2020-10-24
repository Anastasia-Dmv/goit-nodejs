function errorHandlingWrapper(innerFn) {
  return async (req, res, next) => {
    try {
      await innerFn(req, res);
    } catch (err) {
      if (err.message && err.name === "CastError") {
        return res.status(404).send("Not found, please enter correct ID");
      }
      if (err.code === "ERR_INVALID_URL") {
        return res
          .status(404)
          .send("Not found  ERR_INVALID_URI, please try again ");
      }
      //   if (err.name === "Error") {
      //     return res.status(410).send("Not BROKEN , please try again ");
      //   }

      throw new Error("BROKEN");
      //   next(new Error("Not found ", err.message));
      //   return res.status(404).send("Not found, please try  ");
    }
  };
}
exports.errorHandlingWrapper = errorHandlingWrapper;

// function errorHandlingWrapper(innerFn) {
//   return async (req, res, next) => {
//     try {
//       await innerFn(req, res);
//     } catch (err) {
//       console.log("err!!!------->", err.message, err.name);
//       const isNotFound = ~err.message.indexOf("not found");
//       const isCastError = ~err.message.indexOf("Cast to ObjectId failed");
//       const isCannot = ~err.message.indexOf("Cannot");
//       if (
//         err.message &&
//         (isNotFound || isCastError || err.name === "CastError" || isCannot)
//       ) {
//         console.log("err----------->", err);
//         return res.status(410).send("Not , please try again ");
//       } else if (err.name === "CastError") {
//         return res.status(404).send("Not found, please try again ");
//       } else if (err.message === "Cannot GET") {
//         return res.status(410).send("Not , please try again ");
//       } else next(new Error("Not found ", err.message));
//       return res.status(404).send("Not found, please try  ");
//     }
//   };
// }
