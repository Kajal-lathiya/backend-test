import express from "express";
import UserModel from "./model.js";
import createHttpError from "http-errors";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await UserModel(req.body);
    const { _id } = await newUser.save();
    res.send({ id: _id });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/:userId/address", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { addresses: req.body } },
      { new: true, runValidators: true }
    );
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});
userRouter.delete("/:userId/address/:addressId", async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(
        createHttpError(404, `User with id ${req.params.userId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
