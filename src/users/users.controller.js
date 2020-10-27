const { UserModel } = require("./users.model");

exports.getCurrentUser = (req, res, next) => {
  return res.status(200).send({
    id: req.user._id,
    email: req.user.email,
  });
};
exports.updateCurrentUser = async (req, res, next) => {
  console.log("req.params;", req.params);
  const { contactId } = req.params;
  const contact = await UserModel.findByIdAndUpdate(
    JSON.parse(contactId),
    req.body,
    {
      new: true,
    }
  );

  if (!contact) {
    return res.status(404).json("Not found");
  }
  return res.status(200).json("Contact was updated ");
  //   console.log("req.body", req.body);
  //   console.log(typeOf(req.body.id));
  //   const user = await UserModel.findByIdAndUpdate(
  //     req.body.id,
  //     req.body.subscription,
  //     {
  //       new: true,
  //     }
  //   );
  //   console.log("user", user);
  //   if (!user) {
  //     return res.status(404).json("Not found");
  //   }
  //   return res.status(200).send({
  //     id: req.user._id,
  //     email: req.user.email,
  //     subscription: req.body.subscription,
  //   });
};
