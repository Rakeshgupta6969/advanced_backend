const express = require("express");
const authController = require("../controllers/auth.controllers");



const router = express.Router();


/*
post: /api/auth/register
*/
router.post("/register",authController.userRegister);


/*
post : /api/auth/login
*/
router.post("/login",authController.userLogin);


module.exports = router;