const express = require('express');
const router = express.Router();
const { scrapeMangaUpdates } = require('../scrapper/mangascrapper');

router.get('/', async (req, res) => {
    try {
        console.log("Home");

        const mangaUpdates = await scrapeMangaUpdates();

        res.send(mangaUpdates);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
