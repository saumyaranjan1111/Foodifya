const express = require('express');
const { model } = require('mongoose');
const router = express.Router()

router.post('/foodData', (req, res) =>{
    try {
        res.send([global.food_items, global.food_categories]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})

module.exports = router;