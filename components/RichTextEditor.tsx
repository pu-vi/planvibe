"use client";
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      isStrike: ctx.editor.isActive('strike') ?? false,
      isCode: ctx.editor.isActive('code') ?? false,
      isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
      isBulletList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      isBlockquote: ctx.editor.isActive('blockquote') ?? false,
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
  });

  return (
    <div className="border-b p-3 bg-gray-100 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isBold 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isItalic 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isStrike 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isCode 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        Code
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isHeading1 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isHeading2 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isHeading3 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        H3
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isBulletList 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isOrderedList 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1 rounded text-sm font-medium border ${
          editorState.isBlockquote 
            ? 'bg-[#007BFF] text-white border-[#007BFF]' 
            : 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
        }`}
      >
        Quote
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className="px-3 py-1 rounded text-sm font-medium border bg-white text-[#212529] border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className="px-3 py-1 rounded text-sm font-medium border bg-white text-[#212529] border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Redo
      </button>
    </div>
  );
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [TextStyle, StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md border-gray-300">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none bg-white text-[#212529]"
      />
    </div>
  );
}