import { Extension } from '@tiptap/core'
import { calculate } from './calculator'
import { renderResults } from './results'

let calcTimeout: ReturnType<typeof setTimeout> | null = null

export const NumbrResultsExtension = Extension.create({
  name: 'numbrResults',

  onUpdate() {
    if (calcTimeout) clearTimeout(calcTimeout)
    calcTimeout = setTimeout(() => {
      const text = this.editor.getText({ blockSeparator: '\n' })
      const results = calculate(text)
      renderResults(results)
    }, 100)
  },
})
