const userService = require("../services/userService")
const User = require("../models/userModel");
const { SUCCESS, FAILED } = require("../utils/constants");
const Joi = require('joi')

const getAllUsers = async (req, res, next) => {
    try{
        const users = await userService.getAllUsers(req.query)
        // Error message, if there are no published users
        console.log(users)
        if (users.length < 1) {
            return res.json({
                status: FAILED,
                message: "There are no published users"
            })
        }
        // Return published users
        res.status(200).json({
            status: SUCCESS,
            message: "All published users",
            data: users
        })

    } catch (error) {
        next(error)
    }
};

const getOneUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await userService.getOneUser(id)
        // console.log({id, user})
        if (!user) {
            return res.status(404).json({ status: "FAILED", message: "User not found" })
        }
        res.status(200).json({ status: SUCCESS, data: user, message: "Successfully fetch single user" });
    } catch (error) {
        next(error)
    }
};

const createNewUser = async (req, res) => {
    const { username, email, password, name } = req.body
    // console.log({title, content})
    const userSchema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        name: Joi.string().max(100).required(),
    });
    const { value, error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({status: "FAILED", error, message: "Invalid input"})
    }
    try {
        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(400).json({ status: FAILED , message: "User with similar email already exists" })
        }
        const newuser = await userService.createNewUser(req.body)
        res.status(201).json({ status: SUCCESS , data: newuser, message: "Successfully created new user" });

    } catch (error) {
        // console.log(error.message)
        next(error)
    }
};

const updateOneUser = async (req, res) => {
    const { id } = req.params
    try {
        const updateduser = await userService.editUser(id, req.body)

        return res.json({ status: SUCCESS, message: "User edited successfully", data: updateduser })

    } catch (error) {
        next(error)
    }
};

const deleteOneUser = async (req, res) => {
    // const id = req.query.id
    const { id } = req.params
    try {
        const deleteduser = await userService.deleteUser(id)
        if (!deleteduser) {
            return res.json({ status: FAILED, message: "User not found" })
        }
        res.json({ status: "SUCCESS", message: "User deleted" });

    } catch (error) {
        // res.status(500).json({ status: FAILED, message: "Internal Server Error" })
        next(error)
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};