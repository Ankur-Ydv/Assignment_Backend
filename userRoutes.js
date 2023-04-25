const {
  getAllUsers,
  query1,
  query2,
  query3,
  query4,
  query5,
} = require("./userController");
const router = require("express").Router();

router.get("/getAllUsers/", getAllUsers);
router.get("/query1/", query1);
router.get("/query2/", query2);
router.get("/query3/", query3);
router.get("/query4/", query4);
router.get("/query5/", query5);

module.exports = router;
