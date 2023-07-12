import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { registerValidation, loginValidation } from "./validation.js";
import { handleValidation, checkAuth } from "./utils/index.js";
import { UserController } from "./controllers/index.js";
import path from "path";
import adminRouter from "./router/admin-routes.js";
import PostModel from "./models/Post.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.xr2qmnz.mongodb.net/redux?retryWrites=true&w=majority"
  )
  .then(() => console.log("VSE CHETKO BRAT"))
  .catch((err) => console.log("DB ERROR", err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatarUrl") {
      cb(null, "uploads/avatar/");
    } else if (file.fieldname === "image") {
      cb(null, "uploads/posts/");
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name =
      file.originalname.replace(ext, "").toLowerCase().split(" ").join("-") +
      "-" +
      Date.now();
    cb(null, name + ext);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.fieldname === "avatarUrl") {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only avatar with JOPEG,JPG or PNG format are allowed."));
  } else if (file.fieldname === "image") {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only avatar with JOPEG,JPG or PNG format are allowed."));
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({ storage, fileFilter });
app.use("/uploads", express.static("uploads"));

//? users route
app.post(
  "/api/v1/users/register",
  upload.single("avatarUrl"),
  registerValidation,
  handleValidation,
  UserController.register
);

app.post(
  "/api/v1/users/login",
  loginValidation,
  handleValidation,
  UserController.login
);
app.get("/api/v1/users/me", checkAuth, UserController.getMe);

//? admin ponel rout
app.use("/admin", adminRouter);

//? post ponel
app.post("/api/v1/post/add", upload.single("image"), async (req, res) => {
  console.log("req.body>>>",req.body)
  try {
    const post = new PostModel({
      owner: req.body.owner,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      image: req.file ? `http://localhost:5500/${req.file.path}` : null,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "Не удалось создать Пост",
    });
  }
});

//? get ponel

app.get("/api/v1/post", async (req, res) => {
  try {
    const {userId} = req.query
    const posts = await PostModel.find({owner: userId})
    res.status(200).json(posts)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    })
  }
})

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
