import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const MenuBar = ({ editor }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center justify-center gap-3 bg-green-900 w-full min-h-16 py-2 sticky top-0 z-20">
			<button
				onClick={() =>
					editor.chain().focus().toggleBold().run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("bold")
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				bold
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleItalic().run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("italic")
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				italic
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleStrike().run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("strike")
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				strike
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleCode().run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("code")
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				code
			</button>
			<button
				onClick={() =>
					editor.chain().focus().unsetAllMarks().run()
				}
				className={[
					"text-white rounded-sm p-2",

					"bg-gray-400",
				].join(" ")}
			>
				clear marks
			</button>
			<button
				onClick={() =>
					editor.chain().focus().clearNodes().run()
				}
				className={[
					"text-white rounded-sm p-2",
					"bg-gray-400",
				].join(" ")}
			>
				clear nodes
			</button>
			<button
				onClick={() =>
					editor.chain().focus().setParagraph().run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("paragraph")
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				paragraph
			</button>
			<button
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 1 })
						.run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("heading", { level: 1 })
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				h1
			</button>
			<button
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 2 })
						.run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("heading", { level: 2 })
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				h2
			</button>
			<button
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 3 })
						.run()
				}
				className={[
					"text-white rounded-sm p-2",
					editor.isActive("heading", { level: 3 })
						? "bg-red-400"
						: "bg-gray-500",
				].join(" ")}
			>
				h3
			</button>

			<button
				onClick={() =>
					editor
						.chain()
						.focus()
						.setHorizontalRule()
						.run()
				}
				className={[
					"text-white rounded-sm p-2",
					"bg-gray-400",
				].join(" ")}
			>
				horizontal rule
			</button>
			<button
				onClick={() =>
					editor.chain().focus().setHardBreak().run()
				}
				className={[
					"text-white rounded-sm p-2",
					"bg-gray-400",
				].join(" ")}
			>
				hard break
			</button>
			<button
				onClick={() => editor.chain().focus().undo().run()}
				className={[
					"text-white rounded-sm p-2",
					"bg-gray-400",
				].join(" ")}
			>
				undo
			</button>
			<button
				onClick={() => editor.chain().focus().grayo().run()}
				className={[
					"text-white rounded-sm p-2",
					"bg-gray-400",
				].join(" ")}
			>
				grayo
			</button>
		</div>
	);
};

const Article = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
			},
		},
		content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
	});

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
export default Article;
