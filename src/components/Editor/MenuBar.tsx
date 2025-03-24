import type {Editor,  } from "@tiptap/react";
import { useState } from "react";

const MenuBar = ({
  onImageUpload,
  editor
}: {
  editor:Editor | null;
  onImageUpload?: (file: File) => Promise<string>;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onImageUpload) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="control-group mb-4 flex flex-wrap gap-2 rounded border p-2">
      <div className="button-group flex flex-wrap gap-2">
        {/* Text formatting */}
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          Bold
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          Italic
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`rounded px-2 py-1 ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
        >
          Strike
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`rounded px-2 py-1 ${editor.isActive("code") ? "bg-gray-200" : ""}`}
        >
          Code
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="rounded px-2 py-1"
        >
          Clear marks
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="rounded px-2 py-1"
        >
          Clear nodes
        </button>

        {/* Headings */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`rounded px-2 py-1 ${editor.isActive("paragraph") ? "bg-gray-200" : ""}`}
        >
          Paragraph
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
        >
          H1
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
        >
          H2
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
        >
          H3
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 4 }) ? "bg-gray-200" : ""}`}
        >
          H4
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 5 }) ? "bg-gray-200" : ""}`}
        >
          H5
        </button>
        <button
        type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={`rounded px-2 py-1 ${editor.isActive("heading", { level: 6 }) ? "bg-gray-200" : ""}`}
        >
          H6
        </button>

        {/* Lists */}
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
        >
          Bullet list
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
        >
          Ordered list
        </button>

        {/* Block elements */}
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`rounded px-2 py-1 ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
        >
          Code block
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded px-2 py-1 ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
        >
          Blockquote
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="rounded px-2 py-1"
        >
          Horizontal rule
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="rounded px-2 py-1"
        >
          Hard break
        </button>

        {/* Undo/Redo */}
        <button
        type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="rounded px-2 py-1"
        >
          Undo
        </button>
        <button
        type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="rounded px-2 py-1"
        >
          Redo
        </button>

        {/* Colors */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={`rounded px-2 py-1 ${editor.isActive("textStyle", { color: "#958DF1" }) ? "bg-gray-200" : ""}`}
        >
          Purple
        </button>

        {/* Image upload - only if onImageUpload is provided */}
        {onImageUpload && (
          <label className="relative cursor-pointer rounded bg-gray-100 px-2 py-1 hover:bg-gray-200">
            {isUploading ? "Uploading..." : "Insert Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageInput}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};


export default MenuBar;