const express = require("express");

const Chips = require("../models/chips");

const router = express.Router();

router.get(
  "",
  (req, res, next) => {
    const chipQuery = Chips.find();
    let fetchedChips;
    chipQuery
      .then(documents => {
        fetchedChips = documents;
        return Chips.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Chips fetched successfully!",
          chips: fetchedChips,
          maxChips: count
        });
      });
  }
)

module.exports = router;
