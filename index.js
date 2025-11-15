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

  const tuesdayColumn = page.locator(".day").nth(2);
  const sessions = tuesdayColumn.locator(".planner-entry-title");
  const count = await sessions.count();
  console.log(count);

  //   await browser.close();
})();
