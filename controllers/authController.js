const User = require("../models/User");
// const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DepartmentName = require("../models/DepartmentName");
const { validationResult } = require("express-validator");
require("dotenv").config();

const generateAccessToken = (id, role, fullname) => {
  const payload = {
    id,
    role,
    fullname,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "שגיאה בזיהוי", errors });
      }
      // console.log(req.body);
      const {
        email,
        password,
        role,
        fullname,
        phone,
        birthday,
        department,
        sex,
        image,
        contract,
        adress,
      } = req.body;
      const candidate = await User.findOne({ email });
      const departmentExist = await DepartmentName.findOne({ department });
      if (candidate || !departmentExist) {
        return res.status(400).json({ message: "משתמש קיים או אגף לא קיים" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        email,
        password: hashPassword,
        role,
        fullname,
        phone,
        birthday,
        department,
        sex,
        image,
        contract,
        adress,
      });
      await user.save();

      return res.json({ message: "משתמש נוצר בהצלחה" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "שגיאה ביצירת משתמש" });
    }
  }

  async deleteUser(req, res) {
    const trying = await User.findOneAndDelete({
      email: req.params.email,
    });
    trying
      ? res.json({ message: "משתמש נמחק בהצלחה" })
      : res.status(400).json({ message: "שגיאה!" });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `User ${email} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `סיסמא שגוייה` });
      }
      const token = generateAccessToken(user.email, user.role, user.fullname);

      return res.json({
        token,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "שגיאת התחברות!" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  async updateStatus(req, res) {
    try {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { status: req.body.status },
        {
          returnOriginal: false,
        }
      ).then(res.json("עודכן"));
    } catch (e) {
      console.log(e);
    }
  }
  async findTheUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      const sentUser = {
        role: user.role,
        fullname: user.fullname,
        phone: user.phone,
        birthday: user.birthday,
        department: user.department,
        sex: user.sex,
        image: user.image,
        contract: user.contract,
        adress: user.adress,
        status: user.status,
        email: user.email,
      };
      res.json(sentUser);
    } catch (e) {
      console.log(e);
    }
  }
  async findUserByDepartment(req, res) {
    let userList = [];
    try {
      const user = await User.find({ department: req.body.department });
      for (let i = 0; i < user.length; i++) {
        const updatedUser = { fullname: "", image: "" };
        updatedUser.fullname = user[i].fullname;
        updatedUser.image = user[i].image;
        updatedUser.email = user[i].email;
        userList.push(updatedUser);
      }
      res.json(userList);
    } catch (e) {
      console.log(e);
    }
  }

  async updateSpeech(req, res) {
    const theSpeech = req.body.speech;
    const speech = await User.findOneAndUpdate(
      {
        email: "superadmin@gmail.com",
      },
      { speech: theSpeech },
      {
        returnOriginal: false,
      }
    );
    speech.speech === theSpeech
      ? res.json({ message: "דבר ראש העיר עודכן בהצלחה!" })
      : res.json({ message: "שגיאה!" });
  }

  async makeAdmin(req, res) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new authController();
