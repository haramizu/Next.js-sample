// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";
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
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      browser = await puppeteer.launch({
        channel: 'chrome',
        headless: true,
      });
    }

    const page = await browser.newPage();

    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle0" });

    await page.addStyleTag({
      content: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
        * {
          font-family: 'Noto Sans JP', sans-serif !important;
        }
      `,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const screenshot = await page.screenshot({ encoding: "base64" });
    await page.close();
    await browser.close();

    res.status(200).json({ screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  }

}
