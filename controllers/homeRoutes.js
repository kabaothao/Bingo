const router = require("express").Router();
const { User, GameRoom } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  console.log("We are at the homepage route");
  try {
    const userData = await User.findAll({});
    const users = userData.map((project) => project.get({ plain: true }));
    res.render("homePage", {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/game", withAuth, async (req, res) => {
  console.log("We are at the homepage route");
  try {
    const userData = await User.findAll({});
    const users = userData.map((project) => project.get({ plain: true }));
    res.render("bingo_cards", {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//renders login page
router.get("/login", (req, res) => {
  res.render("login");
});


module.exports = router;
