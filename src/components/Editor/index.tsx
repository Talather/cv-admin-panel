import { uploadImage } from "@/lib/blog/firebase";
import toast from "react-hot-toast";
import RichTextEditor from "reactjs-tiptap-editor";
import {
  BaseKit,
  Clear,
  SearchAndReplace,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  Mention,
  Mermaid,
  MoreMark,
  OrderedList,
  SlashCommand,
  Strike,
  TaskList,
  TextAlign,
  TextDirection,
  Underline,
  Bold,
  BulletList,
  Blockquote,
} from "reactjs-tiptap-editor/extension-bundle";

import "reactjs-tiptap-editor/style.css";

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: async (file: File) => {
      try {
        const url = await uploadImage(file);
        toast.success("Image uploaded successfully!");
        return url;
      } catch (error) {
        toast.error("Unable to upload image!");
        return "";
      }
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  TextDirection,
  Mention,
  Mermaid.configure({
    upload: (file: File) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
];

const Editor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const onChangeContent = (value: string) => {
    onChange(value);
  };

  return (
    <RichTextEditor
      output="html"
      content={`${content}`}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
};

export default Editor;
