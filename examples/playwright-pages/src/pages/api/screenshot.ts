import type { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright-core";
import chromium from "@sparticuz/chromium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = req.query.url as string;
  const width = parseInt(req.query.width as string) || 1280;
  const height = parseInt(req.query.height as string) || 768;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  try {
    let browser;
    if (process.env.VERCEL_ENV) {
      browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      browser = await playwright.chromium.launch({
        channel: 'chrome',
        headless: true,
      });
    }
    const page = await browser.newPage();

    await page.setViewportSize({ width, height });
    await page.goto(url, { waitUntil: "networkidle" });

    await page.addStyleTag({
      content: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
        * {
          font-family: 'Noto Sans JP', sans-serif !important;
        }
      `,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const screenshotBuffer = await page.screenshot();
    const screenshot = screenshotBuffer.toString('base64');
    await page.close();
    await browser.close();

    res.status(200).json({ screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  }

}
