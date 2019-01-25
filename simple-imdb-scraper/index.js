const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt0468569/?ref_=nv_sr_1';

(async () => {
  const response = await request(URL);
  // console.log(response);

  let $ = cheerio.load(response);
  
  let title = $('div[class="title_wrapper"] > h1').text();
  let rating = $('span[itemprop="ratingValue"]').text();
  console.log(title);
  console.log(rating);

})();
