import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register=async (req, res) => {
  console.log(req.file)
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const image = req.file ? `http://localhost:5500/${req.file.path}` : null;
  try {
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      avatarUrl: image,
    });
    const user = await doc.save();
    const { ...userData } = user.toJSON();
    res.json({ ...userData });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось создать ползователья",
    });
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        messsage: "Неверный email или пароль",
      });
    }
    const validPassword = await bcrypt.compare(req.body.password, user._doc.password);
    if (!validPassword) {
      return res.status(404).json({
        messsage: "Неверный email или пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      { expiresIn: "30d" }
    );
    const { password, ...userData } = user._doc;
    res.json({ token, userData });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe=async (req, res) => {
    try {
        const user=await UserModel.findById(req.userId)
        if(!user) {
            return res.status(404).json({
                messsage: "Ползователь не найден"
            })
        }
        const {password,...userData}=user._doc
        res.json(userData)
    } catch (err) {
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}