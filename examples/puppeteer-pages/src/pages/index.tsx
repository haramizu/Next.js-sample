import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleTakeScreenshot = async () => {
    const urlInput = (document.getElementById('urlInput') as HTMLInputElement).value;

    const response = await fetch(`/api/screenshot?url=${encodeURIComponent(urlInput)}`);
    const data = await response.json();
    setScreenshot(data.screenshot);
  };

  return (
    <div className="m-2 border-b border-gray-300 pb-2">
      <main>
        <div className="m-2 border-b border-gray-300 pb-2">
          <input
            type="text"
            id="urlInput"
            placeholder="Enter URL"
            className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
          />
          <button
            onClick={handleTakeScreenshot}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Screenshot
          </button>
        </div>
        <div>
          {screenshot ? (
            <Image src={`data:image/png;base64,${screenshot}`} alt="Screenshot" width={1280} height={768} />
          ) : (
            <p>Click button</p>
          )}
        </div>
      </main>
    </div>
  );
}
