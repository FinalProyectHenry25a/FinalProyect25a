const Router = require("express");
const { Publication } = require("../db.js");

const router = Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Publication.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("successfully removed");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
