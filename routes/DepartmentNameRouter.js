const Router = require("express");
const router = new Router();
const DepartmentName = require("../models/DepartmentName");

router.post("/setname", async (req, res) => {
  const { theName } = req.body;

  try {
    const newName = new DepartmentName({
      theName,
    });
    await newName.save();
    res.json("New Department Added");
  } catch (err) {
    res.json(err);
  }
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
  try {
    const deletedDepartment = await DepartmentName.deleteOne({
      theName: req.body.theName,
    });
    res.json(deletedDepartment);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
