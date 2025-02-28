import React, { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

const doc = `
# Heading 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Heading 2

### Heading 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Heading 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Heading 3

List Items

- Item 1
- Item 2
- Item 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Numbered List

1. Item 1
2. Item 2
3. Item 3

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`;

export default function Step1() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const processContent = async () => {
      const result = await remark().use(html).process(doc);
      setContent(result.toString());
    };
    processContent();
  }, []);

  return (
    <>
      <div className="sample" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
