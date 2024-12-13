import { NextResponse } from 'next/server';
import playwright from "playwright-core";
import chromium from "@sparticuz/chromium";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') as string;
    const width = parseInt(searchParams.get('width') as string) || 1280;
    const height = parseInt(searchParams.get('height') as string) || 768;

    if (!url) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
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

        return NextResponse.json({ screenshot }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to take screenshot" }, { status: 500 });
    }
}