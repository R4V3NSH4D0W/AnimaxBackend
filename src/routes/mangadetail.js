const express =require('express');
const { scrapeMangaDetails } = require('../scrapper/mangascrapper');
const router = express.Router();


router.get('/:mangaUrl', async (req, res) => {
    try {
        const { mangaUrl } = req.params;

        const mangaDetails = await scrapeMangaDetails(mangaUrl);

        res.send(mangaDetails);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;