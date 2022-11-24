const DepartmentPost = require("../models/DepartmentPosts");
const { validationResult } = require("express-validator");
require("dotenv").config();
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");

class DepartmentPostsController {
  async createPost(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "שגיאה ביצירת הפוסט", error });
      }

      const { department, title, description, date, image, publish } = req.body;
      const newPost = new DepartmentPost({
        department,
        title,
        description,
        date,
        image,
      });
      await newPost.save();

      if (publish) {
        const query = await User.distinct('email',{department:department});
        console.log(query);
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        //   to: ["oleg.bragin.01@gmail.com", "baxi585@gmail.com"], // Change to your recipient
        //   from: "dimonaWorkersSite@gmail.com", // Change to your verified sender
        //   templateId: "d-9d56dbe7304040858371bb8495de7705",
        // };
        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     console.log('Email sent')
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //   })
      }
      return res.json({ message: "פוסט נוצר בהצלחה" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "שגיאה" });
    }
  }

  async getPost(req, res) {
    const departmentPost = await DepartmentPost.find();
    departmentPost ? res.send(departmentPost) : res.send("אין פוסטים");
  }

  async getSpecificPosts(req, res) {
    try {
      const specificDepartmentPost = await DepartmentPost.find({
        department: req.body.department,
      });
      res.send(specificDepartmentPost);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "שגיאה" });
    }
  }

  async deletepost(req, res) {
    try {
      DepartmentPost.findOneAndDelete({ title: req.params.title }).then(
        res.json({ message: "פוסט נמחק בהצלחה!" })
      );
    } catch {
      console.log(e);
      res.status(400).json({ message: "שגיאה" });
    }
  }
}

module.exports = new DepartmentPostsController();
