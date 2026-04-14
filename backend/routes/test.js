const express = require('express');
const router = express.Router();
const {verifyToken} =  require("../middlewares/verifyToken");

router.get("/protected" , verifyToken , (req , res) => {
    res.send({message: "You are authorized..." , user: req.user});
});

module.exports = router;