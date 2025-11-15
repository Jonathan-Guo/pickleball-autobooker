require("dotenv").config();

const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // go to whatever club you want to sign up for homepage and login there
  await page.goto("https://my.lifetime.life/clubs/va/centreville");
  await page.click('a.nav-link.dropdown-toggle[data-target="#utilAccount"]');
  await page.locator("a.js-login-link").click();

  // login
  await page.fill("#account-username", process.env.LIFETIME_USERNAME);
  await page.fill("#account-password", process.env.LIFETIME_PASSWORD);
  await page.click("#login-btn");
  await page.waitForURL("https://my.lifetime.life/clubs/va/centreville.html");

  // navigate to pickleball open play schedule next week
  await page.click('a.nav-link.dropdown-toggle[aria-label="Schedules "]');
  await page.click(
    'a.dropdown-item[href="/clubs/va/centreville/classes.html?teamMemberView=true&mode=week&interest=Pickleball+Open+Play"]'
  );
  await page.click("button.planner-date-btn-next");

  // create variable so user can change input and it still works
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const day = dayMap["Monday"];
  const startTime = "8:00";
  const ampm = "AM";
  const className = "Pickleball Open Play: All Levels";

  const dayColumn = page.locator(".day").nth(day);

  // find block and click into appropriate pickleball session
  const classBlock = dayColumn.locator(
    `div[data-testid="classCell"]:has(time.time-start:has-text("${startTime}")):has(time.time-end:has-text("${ampm}")):has(a[data-testid="classLink"]:has-text("${className}"))`
  );

  await classBlock.waitFor({ state: "visible", timeout: 0 });
  await classBlock
    .locator(`a[data-testid="classLink"]:has-text("${className}")`)
    .click();

  // click reserve button
  const reserveButton = page
    .locator('button[data-testid="reserveButton"]')
    .nth(1);
  await reserveButton.waitFor({ state: "visible", timeout: 0 });
  await reserveButton.click();

  // click finish button
  const finishButton = page.locator('button[data-testid="finishBtn"]');
  await finishButton.waitFor({ state: "visible", timeout: 0 });
  await finishButton.click();
})();
