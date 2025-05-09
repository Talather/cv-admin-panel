"use client";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TOC({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const headingElements = Array.from(
      doc.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    const parsedHeadings = headingElements.map((heading, index) => {
      // Get all text content including nested elements
      const text = heading.textContent?.trim() || `Heading-${index + 1}`;
      const generatedId = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      return {
        id: heading.id || generatedId,
        text,
        level: Number.parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(parsedHeadings.filter((h) => h.text.length > 0));
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.5,
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const handleScroll = () => {
        const top = element.getBoundingClientRect().top;
        if (Math.abs(top - 100) < 10) {
          setActiveId(id);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        window.removeEventListener("scroll", handleScroll);
        setActiveId(id);
      }, 1000);
    }
  };

  useEffect(() => {
    const fn = () => {
      const style = document.createElement("style");
      style.textContent = `
        h1, h2, {
          scroll-margin-top: 100px;
        }
      `;
      document.head.appendChild(style);

      return () => document.head.removeChild(style);
    };
    fn();
  }, []);

  return (
    <div className="sticky top-4 h-fit max-h-[500px] w-full overflow-y-auto rounded-md bg-white p-4  shadow-md">
      <h3 className="mb-2  text-black">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              className={`cursor-pointer p-1 text-left text-[12px] transition-colors 
              ${activeId === heading.id ? "rounded-md bg-[#30d0ad]/10  text-[#30d0ad]" : "text-[#333333]/80"}
              `}
              onClick={() => handleClick(heading.id)}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
