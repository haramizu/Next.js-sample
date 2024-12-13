import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleTakeScreenshot = async () => {
    const urlInput = (document.getElementById("urlInput") as HTMLInputElement)
      .value;
    const response = await fetch(
      `/api/screenshot?url=${encodeURIComponent(
        urlInput
      )}&width=1280&height=768`
    );
    const data = await response.json();
    setScreenshot(data.screenshot);
  };

  return (
    <div>
      <div className="m-2 border-b border-gray-300 pb-2">
        <input
          type="text"
          id="urlInput"
          placeholder="Enter URL"
          defaultValue="https://doc.haramizu.com/"
          className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
        />
        <button
          onClick={handleTakeScreenshot}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Take Screenshot
        </button>
      </div>
      <div>
        {screenshot && (
          <Image
            src={`data:image/png;base64,${screenshot}`}
            alt="Screenshot"
            width={1280}
            height={768}
          />
        )}
      </div>
    </div>
  );
}
