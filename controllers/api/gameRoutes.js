const router = require('express').Router();
const { User, GameRoom } = require("../../models");
const withAuth = require("../../utils/auth");

// get gameroom
  router.get("/:id", (req, res) => {
    GameRoom.findOne({
      where: {id: req.params.id}
    }).then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No lobby was found with this id" });
          return;
        }
        return res.json(dbPostData);
      }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post("/", (req, res) => {
    console.log(req.body);
    GameRoom.create({
      balls_drawn: req.body.balls_drawn,
      is_gameover: req.body.is_gameover,
      winner: req.body.winner,
      admin: req.body.admin
    }).then((response) => {
        console.log(response);
          return res.json(response);
        }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.put("/:id", (req, res) => {
    GameRoom.update(
      {
        balls_drawn: req.body.balls_drawn,
        is_gameover: req.body.is_gameover,
        winner: req.body.winner,
        admin: req.body.admin
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        return res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
  module.exports = router;
  