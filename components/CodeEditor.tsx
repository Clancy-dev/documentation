'use client'

import { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/themes/prism-tomorrow.css'

interface CodeEditorProps {
  code: string
  language: 'react' | 'css'
  onChange?: (value: string) => void
  readOnly?: boolean
}

export default function CodeEditor({ code: initialCode, language, onChange, readOnly = false }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const handleChange = (value: string) => {
    setCode(value)
    onChange?.(value)
  }

  const highlightCode = (code: string) => {
    if (language === 'react') {
      return Prism.highlight(code, Prism.languages.jsx, 'jsx')
    } else if (language === 'css') {
      return Prism.highlight(code, Prism.languages.css, 'css')
    }
    return code
  }

  return (
    <div className="border rounded-md overflow-hidden bg-black text-blue-400">

  
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={highlightCode}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          whiteSpace: "pre-wrap", // Preserve formatting
          wordBreak: "break-word", // Prevent overflow issues
          overflowWrap: "break-word", // Ensure long lines wrap
        }}
        textareaClassName={readOnly ? 'focus:outline-none cursor-default' : 'focus:outline-none'}
        readOnly={readOnly}
      />
    </div>
  )
}