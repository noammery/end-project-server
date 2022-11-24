const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const controller = require("../controllers/departPostController");
const DepartmentPost = require("../models/DepartmentPosts");

router.post(
  "/departmentedit",
  [
    check("department", "cant be empty").notEmpty(),
    check("title", "cant be empty").notEmpty(),
    check("description", "cant be empty").notEmpty(),
    check("date", "cant be empty").notEmpty(),
    check("image", "only images files").notEmpty(),
  ],
  controller.createPost
);

router.post("/get", controller.getPost);

router.post("/data", controller.getSpecificPosts);

router.delete(
  "/delete/:title",
  [check("title", "cant be empty").notEmpty()],
  controller.deletepost
);

module.exports = router;
