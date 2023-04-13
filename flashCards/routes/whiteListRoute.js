const express = require("express");
const router = express.Router();
const data = require("../data/whiteList.json").data;
const list = data.list;

const whiteListAddress = [
  { wallet: "0xac8...", name: "CT" },
  { wallet: "0xf38...", name: "Aaron" },
  { wallet: "0xcd3...", name: "Shawn" },
  { wallet: "0xe79...", name: "Sharon" },
  { wallet: "0xb33...", name: "Randy" },
];

router.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = list[id][side];
  const { balance } = list[id];
  const templateData = { text, balance };
  const address = req.cookies.address;
  if (side !== undefined) {
    if (side === "wallet") {
      res.render("whitelist", {
        whiteListAddress,
        text,
        side,
        id,
        address,
        balance,
      });
    } else {
      res.render("whitelist", { whiteListAddress, text, side, id, address });
    }
  } else {
    res.redirect(`/whitelist/${id}?side=wallet`);
  }
});

router.get("/", (req, res) => {
  const whiteListNumber = list.length;
  const randomNumber = Math.floor(Math.random() * whiteListNumber);
  res.redirect(`/whitelist/${randomNumber}?side=wallet`);
});

module.exports = router;
