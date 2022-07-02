const express = require("express");
const router = express.Router();
const BusinessSchema = require("../model/BusinessModel");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/users", async (req, res) => {
  try {
    const findUser = await BusinessSchema.find();

    res.status(200).json({
      message: "users found",
      totalUsers: findUser.length,
      data: findUser,
    });
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const findSingleUser = await BusinessSchema.findById(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "individual user found",
      data: findSingleUser,
    });
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

router.post("/sign", async (req, res) => {
  try {
    const findUser = await BusinessSchema.findOne({ email: req.body.email });

    if (findUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            isAdmin: findUser.isAdmin,
            fullName: findUser.fullName,
            email: findUser.email,
          },
          "THiSTheBEstsecreTKEYEver",
          { expiresIn: "1d" }
        );

        const { password, ...data } = findUser._doc;

        res
          .status(201)
          .json({ message: "user created", data: { ...data, token } });
      } else {
        res.status(400).json({ message: "password isn't correcct" });
      }
    } else {
      res.status(400).json({ message: "user does not exist" });
    }

    // res.status(201).json({ message: "user created", data: createUser });
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

const verified = async (req, res, next) => {
  try {
    const tokenKey = req.headers.token;
    if (tokenKey) {
      const token = tokenKey.split(" ")[1];

      jwt.verify(token, "THiSTheBEstsecreTKEYEver", (error, payload) => {
        if (error) {
          res
            .status(400)
            .json({ message: "Something is wrong with your token" });
        } else {
          req.user = payload;
          next();
        }
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "You don't have access right for this Operation" });
  }
};

// req.user.id === req.params.id ||

router.patch("/update/:id", verified, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const updateUser = await BusinessSchema.findByIdAndUpdate(
        req.params.id,
        {
          userName: req.body.userName,
        },
        { new: true }
      );

      res.status(200).json({
        message: "user profile updated",
        data: updateUser,
      });
    } else {
      res.status(400).json({ message: "Sorry, you can't do this operation" });
    }
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

router.delete("/remove/:id", verified, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await BusinessSchema.findByIdAndRemove(req.params.id, req.body);

      res.status(200).json({
        message: "user deleted",
      });
    } else {
      res.status(400).json({ message: "Sorry, you can't do this operation" });
    }
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const hSalt = await bcrypt.genSalt(10);
    const hPass = await bcrypt.hash(req.body.password, hSalt);

    const createUser = await BusinessSchema.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      order: req.body.order,
      password: hPass,
    });

    res.status(201).json({ message: "user created", data: createUser });
  } catch (err) {
    res.status(400).json({ message: "can't do this operation" });
  }
});

module.exports = router;
