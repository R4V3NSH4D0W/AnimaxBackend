const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeMangaUpdates() {
    try {
        const response = await axios.get('https://asuratoon.com/');
        const $ = cheerio.load(response.data);

        const mangaUpdates = [];

        $('div.uta').each((index, element) => {
            
            const mangaTitle = $(element).find('div.luf h4').text();
            const chapterTitles = $(element).find('ul.Manhwa li a').map((i, el) => $(el).text()).get();
            const chapterLinks = $(element).find('ul.Manhwa li a').map((i, el) => $(el).attr('href')).get();
            const updateTimes = $(element).find('ul.Manhwa li span').map((i, el) => $(el).text()).get();
            const imageUrl = $(element).find('div.imgu a img').attr('src');
            const url = $('a.series').attr('href');
            const mangaID = url.match(/\/([^/]+)\/$/)[1];
            mangaUpdates.push({
                mangaID,
                mangaTitle,
                chapterTitles,
                chapterLinks,
                updateTimes,
                imageUrl
            });
        });

        return mangaUpdates;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function searchManga(keyword) {
    try {
        const response = await axios.get(`https://asuratoon.com/?s=${keyword}`);
        const $ = cheerio.load(response.data);

        const searchResults = [];

        $('.bs').each((index, element) => {
            const mangaTitle = $(element).find('.tt').text().trim();
            const mangaUrl = $(element).find('.bsx a').attr('href');
            const mangaId = mangaUrl.split('/').slice(-2, -1)[0];
            const imageUrl = $(element).find('.limit img').attr('src');
            searchResults.push({ mangaId,mangaTitle, imageUrl });
        });

        return searchResults;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


async function scrapeMangaDetails(mangaID) {
    try {
        const response = await axios.get(`https://asuratoon.com/manga/${mangaID}`);
        const $ = cheerio.load(response.data);

        const mangaDetails = {};

        mangaDetails.title = $('h1.entry-title').text().trim();
        mangaDetails.imageUrl = $('.thumbook img').attr('src');
        mangaDetails.bookmark = $('.bookmark').text().trim();
        mangaDetails.rating = $('.num[itemprop="ratingValue"]').text().trim();
        mangaDetails.status = $('.imptdt:contains("Status") i').text().trim();
        mangaDetails.type = $('.imptdt:contains("Type") a').text().trim();
        mangaDetails.description = $('.entry-content').text().trim();
        mangaDetails.author = $('.fmed:contains("Author") span').text().trim();
        mangaDetails.releaseDate = $('.fmed:contains("Released") span').text().trim();
        mangaDetails.updatedDate = $('.fmed:contains("Updated On") time').attr('datetime');
        mangaDetails.genres = $('.mgen a').map((i, el) => $(el).text()).get();

        mangaDetails.chapters = [];
        $('.chbox').each((index, element) => {
            const chapterTitle = $(element).find('.chapternum').text().trim();
            const chapterDate = $(element).find('.chapterdate').text().trim();
            const chapterUrl = $(element).find('a').attr('href');
            const chapterNumber = chapterUrl.match(/\/([^/]+)\/$/)[1];  
            mangaDetails.chapters.push({ chapterTitle, chapterDate, chapterNumber });
        });

        return mangaDetails;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function scrapeManga(chapterNumber) {
    try {
        const response = await axios.get(`https://asuratoon.com/${chapterNumber}/`);
        const $ = cheerio.load(response.data);

        const imageUrls = [];
        $('#readerarea img.ts-main-image').each((index, element) => {
            const imageUrl = $(element).attr('src');
            imageUrls.push(imageUrl);
        });

        return imageUrls;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

module.exports = {
    scrapeMangaUpdates,
    scrapeMangaDetails,
    searchManga,
    scrapeManga
};
