const express = require('express');
const router = express.Router();
const { searchManga } = require('../scrapper/mangascrapper');

router.get('/:keyword', async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword) {
            return res.status(400).send('Please provide a search keyword'); 
        }

        const searchResults = await searchManga(keyword);

        res.json(searchResults);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
