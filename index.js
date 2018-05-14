/**
 * Script which reads the wiki page with language codes
 * and returns the sql query to insert.
 */
const request = require('superagent');
const cheerio = require('cheerio');
const wikiUrl = 'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes';

let sql = 'INSERT INTO mi_locales(name, shortname) VALUES ';
request.get(wikiUrl)
  .then(res => {
    const $ = cheerio.load(res.text);
    const table = $('tr', 'table.wikitable');
    table.each((idx, element) => {
      const langTitle = $($(element).find('td')[2]).text();
      const langCode = $($(element).find('td')[4]).text();

      if (langCode.length) {
        sql += `('${langTitle}','${langCode}'),`;
      }
      
    });
    
    sql = sql.slice(0,-1) + ';';
    console.log(sql);
  });