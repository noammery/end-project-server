const DepartmentPost = require("../models/DepartmentPosts");
const { validationResult } = require("express-validator");
require('dotenv').config()
const sgMail = require('@sendgrid/mail')

class DepartmentPostsController {
  async createPost(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "creating post error", error });
      }

      const { department, title, description, date, image, publish } = req.body;
      const newPost = new DepartmentPost({
        department,
        title,
        description,
        date,
        image,
        publish
      });
      await newPost.save();


      if (publish) {
        // const query = await User.distinct('email');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: ['oleg.bragin.01@gmail.com', 'baxi585@gmail.com'], // Change to your recipient
          from: 'dimonaWorkersSite@gmail.com', // Change to your verified sender
          templateId: 'd-9d56dbe7304040858371bb8495de7705',
        }
        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     console.log('Email sent')
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //   })
      }
      return res.json({ message: "post updated successfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "posting error" });
    }
  }

  async getPost(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "error!", error });
      }

      const departmentPost = await DepartmentPost.find();
      res.send(departmentPost);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "error" });
    }
  }
  async getSpecificPosts(req, res) {
    try {
      const specificDepartmentPost = await DepartmentPost.find({
        department: req.body.department,
      });
      res.send(specificDepartmentPost);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "error" });
    }
  }

  async deletepost(req, res) {
    try {
      DepartmentPost.findOneAndDelete({ title: req.params.title }).then(
        (data) => res.json(data)
      );
    } catch {
      console.log(e);
      res.status(400).json({ message: "error" });
    }
  }
}

module.exports = new DepartmentPostsController();
