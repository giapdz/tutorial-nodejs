var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("../config.json");
import jwt from "jsonwebtoken";
const auth = require("../middleware/auth");
const User = [
    {
        id: 1,
        username: "test",
        password: "test",
        firstName: "Giap",
        lastName: "Hoang",
    },
];
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/login", async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.find(
            (u) => u.username === username && u.password === password
        );

        // const passwordValid = await bcrypt.compare(password, user.password);
        // console.log(passwordValid);
        if (user) {
            // Create token
            let u = {
                id: user.id,
                username: user.username,
                password: user.password,
            };
            const token = jwt.sign(u, config.secret, {
                expiresIn: "24h", // expires in 24 hours
            });

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user.token);
        }

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});
router.get("/welcome", auth, (req, res) => {});

// This should be the last route else any after it won't work

module.exports = router;
