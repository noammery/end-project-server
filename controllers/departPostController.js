const DepartmentPost = require("../models/DepartmentPosts");
// const { validationResult } = require("express-validator");

class DepartmentPostsController {
  async createPost(req, res) {
    const { department, title, description, date, image } = req.body;
    try {
      // const errors = validationResult(req);

      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ message: "creating post error", errors });
      // }

      const newPost = new DepartmentPost({
        department,
        title,
        description,
        date,
        image
      });
      await newPost.save();

      return res.json({ message: "post updated successfully" });
    
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "posting error" });
    }
  }
}

module.exports = new DepartmentPostsController();
