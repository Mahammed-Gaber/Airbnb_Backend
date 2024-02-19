const express = require('express');
const route = express.Router();



route.get('/guests', async (req , res) => {
    const data = await guestController.getAllGuests
})