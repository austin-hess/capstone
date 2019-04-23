var $                = require('cheerio'),
    puppeteer        = require('puppeteer'),
    rp               = require('request-promise');

//module.exports = {

    var get_IMDB_poster_link = async function(url, title) {
        // if title includes 'the' at the end, we need to move it to the front
        if (title.slice(title.length -5) == ', The') {
            title = 'The ' + title.slice(0, title.length - 5);
        }

        // start the browser and open a new page
        var browser = await puppeteer.launch();
        var page = await browser.newPage();

        // navigate to the URL
        await page.goto(url);

        // loop over all <img> tags
        var imgs = await page.content()
        $('img', imgs).each(function(i, elmt) {
            if (this.attribs.title == title + ' Poster') {
                return this.attribs.src;
            }
        })            
        
        // if we make it through the for loop, then we failed to find the desired element - return null
        return null;
    }

//}
get_IMDB_poster_link('https://www.imdb.com/title/tt0112379', 'Antonia\'s Line (Antonia)')
.then(function(link) {
    console.log(link);
})
