import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleTakeScreenshot = async () => {
    const urlInput = (document.getElementById('urlInput') as HTMLInputElement).value;
    const response = await fetch(`/api/screenshot?url=${encodeURIComponent(urlInput)}&width=1280&height=768`);
    const data = await response.json();
    setScreenshot(data.screenshot);
  }

  return (
    <div
    >
      <div>
        <input type="text" id="urlInput" placeholder="Enter URL" />
        <button onClick={handleTakeScreenshot}>Take Screenshot</button>
        {screenshot && <Image src={`data:image/png;base64,${screenshot}`} alt="Screenshot" width={1280} height={768} />}
      </div>

    </div>
  );
}
