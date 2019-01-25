const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt0468569/?ref_=nv_sr_1';

(async () => {
  const response = await request({
    url: URL,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'www.imdb.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.64 Safari/537.36'
      }
  });
  console.log(response);
  let $ = cheerio.load(response);

  let title = $('div[class="title_wrapper"] > h1').text();
  let rating = $('span[itemprop="ratingValue"]').text();
  console.log(title);
  console.log(rating);

})();
