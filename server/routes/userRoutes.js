const { register } = require("../controlles/userscontroller");

const router = require("express").Router();
router.post("/register",register);

module.exports=router;