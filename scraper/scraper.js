const puppeteer = require('puppeteer');
const Documentation = require('../models/Documentation'); // Import model to save data

// Function to scrape data from websites
async function scrapeData() {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const platforms = [
      { name: 'Segment', url: 'https://segment.com/docs/?ref=nav' },
      { name: 'mParticle', url: 'https://docs.mparticle.com/' },
      { name: 'Lytics', url: 'https://docs.lytics.com/' },
      { name: 'Zeotap', url: 'https://docs.zeotap.com/home/en-us/' },
    ];

    const scrapedData = [];

    for (let platform of platforms) {
      try {
        console.log(`Scraping data from: ${platform.name}`);

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(platform.url, { waitUntil: 'load', timeout: 90000 });

        await page.waitForSelector('body', { timeout: 90000 });

        // Scroll if necessary (optional)
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });

        // Scrape specific content
        const rawData = await page.evaluate(() => {
          const mainContent = document.querySelector('main') || document.querySelector('article');
          return mainContent ? mainContent.innerText : document.body.innerText;
        });

        console.log(`Raw data from ${platform.name}:`, rawData.substring(0, 100)); // First 100 characters for debugging
        console.log(`Total content length from ${platform.name}: ${rawData.length} characters`);

        const headers = await page.evaluate(() => {
          const headerTags = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
          return headerTags.map(header => header.innerText);
        });

        console.log(`Headers scraped from ${platform.name}:`, headers);

        scrapedData.push({
          platform: platform.name,
          rawData: rawData.trim(),
          lastUpdated: new Date(),
          headers: headers,
        });

        console.log(`Successfully scraped data from ${platform.name}`);
      } catch (err) {
        console.error(`Error scraping ${platform.name}:`, err);
      }
    }

    return scrapedData;

  } catch (err) {
    console.error('Error during scraping:', err);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function saveData(data) {
  try {
    if (data.length > 0) {
      console.log('Saving scraped data to the DB...');
      await Documentation.deleteMany({});
      await Documentation.insertMany(data);
      console.log('Data saved successfully!');
    } else {
      console.log('No data to save');
    }
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

async function scraper() {
  const data = await scrapeData();
  if (data.length > 0) {
    await saveData(data);
  } else {
    console.log('No data scraped.');
  }
}

module.exports = scraper;
