const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

const URLS = [
  "https://www.imdb.com/title/tt0468569/?ref_=nv_sr_1",
  "https://www.imdb.com/title/tt0796366/"
];

(async () => {
  let moviesData = [];
  for (let movie of URLS) {
    const response = await request({
      uri: movie,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Host: "www.imdb.com",
        Pragma: "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.64 Safari/537.36"
      },
      gzip: true
    });
    let $ = cheerio.load(response);

    let title = $('div[class="title_wrapper"] > h1')
      .text()
      .trim();
    let rating = $('span[itemprop="ratingValue"]').text();
    let poster = $('div[class="poster"] > a > img').attr("src");
    let totalRatings = $('div[class="imdbRating"] > a').text();
    let releaseDate = $('a[title="See more release dates"]')
      .text()
      .trim();
    let genres = [];
    $('div[class="subtext"] a[href^="/search/title?"]').each((i, elm) => {
      let genre = $(elm).text();
      genres.push(genre);
    });

    moviesData.push({
      title,
      rating,
      poster,
      totalRatings,
      releaseDate,
      genres
    });
  }

  const fields = ['title', 'rating', 'poster']

  const json2csvParser = new Json2csvParser({fields});
  const csv = json2csvParser.parse(moviesData);

  fs.writeFileSync('./data.csv', csv, 'utf-8');


  console.log(csv);


})();
