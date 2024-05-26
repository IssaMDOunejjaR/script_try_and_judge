import puppeteer from 'puppeteer';
import open from 'open';

(async () => {
  let browser = await puppeteer.launch();

  while (true) {
    try {
      browser = await puppeteer.launch();

      const page = await browser.newPage();
      const LINK = "https://vente.tryandjudge.com/dofuskamas.php";

      await page.goto(LINK);

      const TIMEOUT = 5000;
      const MIN_PRICE = 4;
      const NTH_CHILD = 5;

      console.log("Waiting...");

      let price = await page.waitForSelector(`#contentprices > table > tbody > tr:nth-child(${NTH_CHILD}) > td:nth-child(2)`, {timeout: TIMEOUT});
      let msg = await page.waitForSelector(`#contentprices > table > tbody > tr:nth-child(${NTH_CHILD}) > td:last-child > center > a`, {timeout: TIMEOUT});

      console.log("Found");

      price = parseInt(await price?.evaluate(el => el.textContent));
      msg = await msg?.evaluate(el => el.textContent);

      // console.log({price: price, msg});

      if (price >= MIN_PRICE && msg === "Cliquez ici pour Vendre") {
        await open("https://vente.tryandjudge.com/dofuskamas.php");
        
        break;
      }

      await browser.close();
    } catch (err) {
      console.log("Timeout");

      await browser.close();
    }
  }

  await browser.close();

  process.exit(0);
})();
