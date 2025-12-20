const fs = require('fs');
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const logger = new console.Console(output, errorOutput);

// pickleballAutobooker.js
require("dotenv").config();
const { chromium } = require("playwright");

// map weekday names to column indices
const dayMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};


async function clear_screen() {
  // Close cookie preferences if visible
  if (await page.locator('#onetrust-close-btn-container > button').isVisible()) {
      await page.locator('#onetrust-close-btn-container > button').click();
  }

  // Close alert notification if visible
  const alertBtn = page.locator('#alert-notification-edb12dcf-fe52-4c04-9d29-fd99ccce5280 > div > button');
  if (await alertBtn.isVisible()) {
      await alertBtn.click();
  }
}

/**
 * Automates booking a Pickleball Open Play class.
 * @param {string} dayName - Day of the week, e.g. "Monday"
 * @param {string} startTime - Start time, e.g. "8:00"
 * @param {string} ampm - "AM" or "PM"
 * @param {string} className - Class name, e.g. "Pickleball Open Play: All Levels"
 */
async function runPickleballAutobooker(
  dayName,
  startTime,
  ampm,
  className,
  clubLocation
) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // go to club homepage and login
  await page.goto(`https://my.lifetime.life/clubs/va/${clubLocation}`);
  await page.click('a.nav-link.dropdown-toggle[data-target="#utilAccount"]');
  await page.locator("a.js-login-link").click();

  await page.fill("#account-username", process.env.LIFETIME_USERNAME);
  await page.fill("#account-password", process.env.LIFETIME_PASSWORD);
  await page.click("#login-btn");
  await page.waitForURL(
    `https://my.lifetime.life/clubs/va/${clubLocation}.html`
  );
  logger.log('Navigated to Lifetime website at', clubLocation);
  await clear_screen();
  
  // navigate to pickleball open play schedule next week
  await page.click('a.nav-link.dropdown-toggle[aria-label="Schedules "]');
  await page.click(
    `a.dropdown-item[href="/clubs/va/${clubLocation}/classes.html?teamMemberView=true&mode=week&interest=Pickleball+Open+Play"]`
  );
  await page.click("button.planner-date-btn-next");
  logger.log('Clicked Pickleball Open Play Schedule');

  const day = dayMap[dayName];
  const dayColumn = page.locator(".day").nth(day);

  // find block and click into appropriate pickleball session
  const classBlock = dayColumn.locator(
    `div[data-testid="classCell"]:has(time.time-start:has-text("${startTime}")):has(time.time-end:has-text("${ampm}")):has(a[data-testid="classLink"]:has-text("${className}"))`
  );

  await classBlock.waitFor({ state: "visible", timeout: 0 });
  await classBlock
    .locator(`a[data-testid="classLink"]:has-text("${className}")`)
    .click();

  logger.log('Found classBlock info with startTime', startTime, ampm, className);
  // click reserve button
  await clear_screen();
  const reserveButton = page
    .locator('button[data-testid="reserveButton"]')
    .nth(1);
  await reserveButton.waitFor({ state: "visible", timeout: 0 });
  await reserveButton.click({ force: true });
  logger.log('Clicked reserve button');

  // click finish button
  await clear_screen();
  const finishButton = page.locator('button[data-testid="finishBtn"]');
  await finishButton.waitFor({ state: "visible", timeout: 0 });
  await finishButton.click({ force: true });
  await page.getByText("Your reservation is complete.").isVisible();

  //navigate to View All Reservations to allow async booking
  // processes to finish so booking completes. 
  await page.getByRole('link', { name: 'View All Reservations', exact: true }).click();  
  logger.log('Closing browser. Success!');
  await browser.close();
}

module.exports = { runPickleballAutobooker };
