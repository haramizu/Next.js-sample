import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") || [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;
  const width = parseInt(req.query.width as string) || 1280;
  const height = parseInt(req.query.height as string) || 768;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  const urlObj = new URL(url);
  if (!allowedDomains.includes(urlObj.hostname)) {
    res.status(403).json({ error: "Domain not allowed" });
    return;
  }

  try {
    const browser = await puppeteer.launch({
      args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--single-process",
        "--no-sandbox",
      ],
      headless: true,
    });

    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"
    );
    await page.setViewport({ width, height });
    await page.goto(url);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const screenshot = await page.screenshot({ encoding: "base64" });

    await page.close();
    await browser.close();

    res.status(200).json({ screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  }
}
