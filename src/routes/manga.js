const express = require('express');
const router = express.Router();
const { scrapeManga } = require('../scrapper/mangascrapper');

router.get('/:chapterNumber', async (req, res) => {
    try {
        const { chapterNumber } = req.params;

        // Scrape manga image URL
        const imageUrl = await scrapeManga(chapterNumber);

        // If imageUrl is null, send a 404 response
        if (!imageUrl) {
            return res.status(404).send('Image not found');
        }

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
