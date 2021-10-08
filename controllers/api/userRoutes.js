const router = require("express").Router();
const { User, GameRoom } = require("../../models");

router.post("/login", async (req, res) => {
  console.log("=====USERS ROUTE=====");
  try {
    console.log("??????????USER IS TRYIN TO SIGN UP???????????");
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find the matching user
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  // Remove the session variables
  req.session.destroy(() => {
    res.status(200).json({ message: "LOGGED OUT" });
  });
});

module.exports = router;
