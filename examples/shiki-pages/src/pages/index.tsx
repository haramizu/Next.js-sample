import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Clipboard } from "lucide-react";

export default function Home() {
  const [html, setHtml] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    const code = `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, my name is \${this.name} and I am \${this.age} years old.\`;
  }
}

const person = new Person("John Doe", 30);
console.log(person.greet());`;

    setCode(code);

    codeToHtml(code, {
      lang: "ts",
      theme: "github-dark",
      meta: { filePath: "src/index.ts" },
    }).then((result) => {
      setHtml(result);
    });
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setTooltipVisible(true);
      setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
    });
  };
  return (
    <div className="p-4">
      <div className="relative">
        <button
          onClick={handleCopyToClipboard}
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded z-10"
        >
          <Clipboard />
        </button>
        {tooltipVisible && (
          <div className="absolute top-4 z-20 right-14 bg-white p-1 rounded">
            Copied!
          </div>
        )}
        <div
          className="p-4 rounded-md"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
