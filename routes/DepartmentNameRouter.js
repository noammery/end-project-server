const Router = require("express");
const router = new Router();
const DepartmentName = require("../models/DepartmentName");

router.post("/setname", async (req, res) => {
  const { theName } = req.body;
  const newName = new DepartmentName({
    theName,
  });
  await newName.save();
  newName
    ? res.json({ message: "אגף חדש נוצר" })
    : res.json({ message: "שגיאה" });
});

router.post("/getnames", async (req, res) => {
  try {
    const theNames = await DepartmentName.find();
    res.json(theNames);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/deletename", async (req, res) => {
  const deletedDepartment = await DepartmentName.deleteOne({
    theName: req.body.theName,
  });
  deletedDepartment.deletedCount !== 0
    ? res.json({ message: "אגף נמחק בהצלחה" })
    : res.json({ message: "שגיאה" });
});

module.exports = router;
