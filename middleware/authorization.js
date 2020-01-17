module.exports = () => (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res
      .status(401)
      .json({ Invalid: "Your credentials are not valid for this route" });
  } else {
    next();
  }
};
