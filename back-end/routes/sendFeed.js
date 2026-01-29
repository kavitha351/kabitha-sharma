const { error } = require('console');
const express = require('express');
const router = express.Router();
const feedbacks = require('../models/Feedback');
const {body,validationResult} = require('express-validator');

// sending feedback to database using POST to /send_feed
router.post('/',[
    body('name','Name must be minimum 5 Characters.').isLength({min:5}),
    body('email','Enter a valid email.').isEmail(),
    body('feedback','Feedback must be minimum 10 Characters.').isLength({min:10})
], async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const user = await feedbacks.create({
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback
        })
        console.log(user);
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured.");
    }
})

module.exports = router;
