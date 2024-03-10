import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User is successfully created." });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required."));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "email/password1 is not valid"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "email/password2 is not valid"));
    }
    const token = jwt.sign(
      { id: validUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    //Removing password from user data
    const filterUser = await User.findById(validUser._id).select("-password");

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ user: filterUser, message: "Signin Successful." });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY);
      const { password: hashedPassword, ...rest } = user._doc;
      const expirayDate = new Date(Date.now() + 3600000); // 1 hr
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true, expires: expirayDate })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-6) +
        Math.random().toString(36).slice(-10);
      const hashedPassword = bcryptjs.compareSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      console.log(newUser);
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET_KEY);
      const { password : hashedPassword2, ...rest } = newUser._doc;
      const expirayDate = new Date(Date.now() + 3600000); // 1 hr
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true, expires: expirayDate })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
