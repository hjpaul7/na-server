const router = require("express").Router();

const Meeting = require("../db").import("../models/meeting");
// Get meeting
router.get("/", (req, res) => {
  Meeting.findAll({
    where: {
      owner_id: req.user.id,
    },
  })
    .then((meetings) =>
      res.status(200).json({
        meetings: meetings,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// Post meeting
router.post("/", (req, res) => {
  const meetingFromRequest = {
    name: req.body.name,
    day: req.body.day,
    location: req.body.location,
    zipcode: req.body.zipcode,
    time: req.body.time,
    openclosed: req.body.openclosed,
    owner_id: req.user.id,
  };
  Meeting.create(meetingFromRequest)
    .then((meeting) =>
      res.status(200).json({
        meeting: meeting,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// Update Meeting by ID
router.put("/:id", (req, res) => {
  Meeting.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((meeting) =>
      res.status(200).json({
        meeting: meeting,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

// Delete meeting by ID
router.delete("/:id", (req, res) => {
  Meeting.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((meeting) =>
      res.status(200).json({
        meeting: meeting,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
