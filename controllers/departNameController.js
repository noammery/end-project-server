const DepartName = require("../models/DepartmentName");

class DepartNameController {
  async setName(req, res) {
    const { theName } = req.body;
    const newName = new DepartName({
      theName,
    });
    await newName.save();
    newName
      ? res.json({ message: "אגף חדש נוצר" })
      : res.json({ message: "שגיאה" });
  }

  async getNames(req, res) {
    try {
      const theNames = await DepartName.find();
      res.json(theNames);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteName(req, res) {
    const deletedDepartment = await DepartName.deleteOne({
      theName: req.body.theName,
    });
    deletedDepartment.deletedCount !== 0
      ? res.json({ message: "אגף נמחק בהצלחה" })
      : res.json({ message: "שגיאה" });
  }
}

module.exports = new DepartNameController();
