// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";

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
    const browser = await puppeteer.launch({
      channel: 'chrome',
      headless: true,
    });

    const page = await browser.newPage();

    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle0" });

    const screenshot = await page.screenshot({ encoding: "base64" });
    await page.close();
    await browser.close();

    res.status(200).json({ screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  }

}