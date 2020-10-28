const { UserModel } = require("./users.model");

exports.getCurrentUser = (req, res, next) => {
  return res.status(200).send({
    id: req.user._id,
    email: req.user.email,
    subscription: req.user.subscription,
  });
};
exports.updateCurrentUser = async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { subscription: req.body.subscription },
    { new: true }
  );

  if (!user) {
    return res.status(404).json("Not found");
  }
  return res.status(200).json(user);
};
