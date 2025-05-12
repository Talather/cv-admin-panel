import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import TOC from "./toc";
import ArticleCTABanner from "@/components/ArticleCTABanner";
import Image from "next/image";

const window = new JSDOM("").window;

const purify = DOMPurify(window);
const processContent = (content: string) => {
  const dom = new JSDOM(content);
  const headings = dom.window.document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6",
  );

  headings.forEach((heading, index) => {
    if (!heading.id) {
      const text = heading.textContent?.trim() || `Heading-${index + 1}`;
      heading.id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }
  });

  return purify.sanitize(dom.serialize());
};

const ParsedContent = ({ content }: { content: string }) => {
  const cleanContent = processContent(content);

  return (
    <div className="relative   mx-auto max-w-7xl grid-cols-9 gap-8 px-3  pb-16 pt-8 lg:grid">
      <div className="col-span-2 hidden lg:block ">
        <TOC content={cleanContent} />
      </div>

      <div className="col-span-5">
        <div
          className="prose blog-main"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: explanation
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        <ArticleCTABanner />
      </div>

      <div className="sticky top-4 col-span-2  hidden h-fit lg:block">
        <Image
          width={400}
          height={400}
          alt="animation"
          src="/images/article-animation.jpeg"
        />
      </div>
    </div>
  );
};

export default ParsedContent;
