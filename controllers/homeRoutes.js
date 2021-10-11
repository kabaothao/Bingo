const router = require("express").Router();
const { User, GameRoom } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homePage", {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//JOIN game by ID
// GET one painting
// router.get('/game/:id', async (req, res) => {
//   try {
//     res.render('bingo_cards');
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//renders login page
router.get("/login", (req, res) => {
  res.render("login");
});

// GET one painting
router.get('/game', withAuth, async (req, res) => {
  try {
    res.render('bingo_cards', {
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
