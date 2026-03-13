import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { NumbrResultsExtension } from './extension'
import { encodeContent, decodeHash } from './encoding'
import { calculate } from './calculator'
import { renderResults } from './results'

// Decode initial content from URL hash
const initialText = decodeHash(location.hash)

function textToContent(text: string): string {
  // Escape HTML entities and convert newlines to Tiptap paragraphs
  const lines = text.split('\n')
  return lines
    .map(line => {
      const escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      return `<p>${escaped || '<br>'}</p>`
    })
    .join('')
}

const editor = new Editor({
  element: document.querySelector('#editor')!,
  extensions: [
    StarterKit.configure({
      // Disable all formatting — numbr uses # as its own heading syntax
      bold: false,
      italic: false,
      strike: false,
      code: false,
      codeBlock: false,
      blockquote: false,
      horizontalRule: false,
      heading: false,
    }),
    Placeholder.configure({
      placeholder: 'Start typing… e.g.  rate = $150/hr',
    }),
    NumbrResultsExtension,
  ],
  content: initialText ? textToContent(initialText) : '',
})

// Sync URL hash on change (debounced 500ms, no new history entry)
let hashTimeout: ReturnType<typeof setTimeout> | null = null
editor.on('update', () => {
  if (hashTimeout) clearTimeout(hashTimeout)
  hashTimeout = setTimeout(() => {
    const text = editor.getText({ blockSeparator: '\n' })
    history.replaceState(null, '', '#' + encodeContent(text))
  }, 500)
})

// Render initial results if we loaded from a hash
if (initialText) {
  const results = calculate(initialText)
  renderResults(results)
}

// Sync results column scroll with the editor scroll
const editorWrap = document.getElementById('editor-wrap')!
const resultsEl = document.getElementById('results')!
editorWrap.addEventListener('scroll', () => {
  resultsEl.scrollTop = editorWrap.scrollTop
}, { passive: true })
