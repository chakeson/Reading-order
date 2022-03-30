const express = require("express")
const router = express.Router()
const book = require("../models/book")

// CRUD CREATE READ UPDATE DELETE


// Read user data
router.get('/', async (req, res)=> {
    try {
        
        res.send("Hello World")
    } catch (error) {
        
    }
})


router.get('/test/:id', (req, res)=> {
    res.send(req.params.id)
})

// Creating user
router.post("/:create", (req, res)=> {
    
})

// Updating user book
router.patch("/:id", (req, res)=> {

})

// Delete user info
router.delete("/:id", (req, res)=> {

})


module.exports = router