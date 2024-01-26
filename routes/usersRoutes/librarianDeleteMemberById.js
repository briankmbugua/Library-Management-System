const express = require('express');
const router = express.Router();
const UsersModel = require('../../models/usersModel');
const authmiddleware = require('../../middlewares/authmiddleware');


router.delete("/:id", async (req, res) => {
    try {
        let deletedMember = await UsersModel.deleteMember(req.params.id);
        if (deletedMember){
            res.status(200).json({message: "Member deleted successfully"});
        } else {
            res.status(500).json({error: "could not delete member"})
        }
    } catch (error) {
        
    }
})